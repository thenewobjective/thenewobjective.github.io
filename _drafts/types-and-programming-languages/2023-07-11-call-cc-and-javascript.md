---
layout: post
icon: file-text
title:  "call/cc and JavaScript"
date:   2023-07-11 12:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/call-cc-and-javascript
---

* TOC
{:toc}

## Introduction

JavaScript has lovingly been called [Lisp in C's clothing](http://lambda-the-ultimate.org/classic/message8778.html).
This is because the languages have many features in common, such as
first-class functions, dynamic typing, closures, and a flexible syntax. Modern JavaScript
though has introduced many features that hide the functional nature of the language.
Features such as classes, generators, and async/await have made JavaScript look more
like Java or C# than a Lisp variant.

There is a feature in Lisp that is not present in JavaScript, and that is the
`call/cc` function. This function is used to implement a variety of control flow
mechanisms such as exceptions, generators, and green threads. In this article I
will describe the `call/cc` function and how it can be used to implement a
variety of control flow mechanisms in JavaScript.

## Continuations and CPS

Before we can understand the `call/cc` function, we must first understand
continuations and [continuation-passing style](https://en.wikipedia.org/wiki/Continuation-passing_style).
As a JavaScript developer, you are probably familiar with Continuation-Passing Style (CPS),
but you likely don't know what a continuation is if you are not passing it around.

A continuation is an abstraction that captures a context in a program where
execution can be resumed. This context includes the current
[stack](https://en.wikipedia.org/wiki/Call_stack), scope,
[environment](https://en.wikipedia.org/wiki/Scope_(computer_science)),
and [program counter](https://en.wikipedia.org/wiki/Program_counter).

In other words, a continuation is "what's left to do" in a program. For example:

```js
x = 5; y = x + 1; z = y * 2;
```

The continuation of `x = 5;` is `y = x + 1; z = y * 2;`.
The continuation of `y = x + 1` is `z = y * 2;`.

Continuations are usually implicit. Unless you set a breakpoint in a debugger,
it is not something you generally think about. However, continuations can be
explicitly captured, named, and passed around in a program
([reification](https://en.wikipedia.org/wiki/Reification_(computer_science))).
This is accomplished via a function:

```js
function f(x) {
  const y = x + 1,
        z = y * 2;
  return z;
}

x = 5; result = f(x);
```

Now the continuation of `x = 5;` is `result = f(x)`.

By naming the continuation, we have gained power over it and can manipulate it
in various ways. The most common use case familiar to JavaScript developers is
to use it to avoid returning a value from a function and instead send it somewhere
else.

```js
function f(x, k) {
  const y = x + 1,
        z = y * 2;
  k(z);
}

x = 5; f(x, result => console.log(result));
```

Here, instead of returning a value from `f`, we pass it to the continuation `k`
which is provided as a function argument. This is called continuation-passing style (CPS).
Notice that the `return` statement is no longer needed. Control flow is now
explicitly managed by the programmer. This pattern can be chained together to
create complex control flow. Traditionally in JavaScript CPS is used manage
asynchronous control flow for event-driven programs.

```js
setTimeout(() => {
  console.log("Hello");
  setTimeout(() => {
    console.log("World");
  }, 1000);
}, 1000);
```

What you'll notice above is that a continuations does not have to be
immediately invoked. It can be stored and invoked later. We call this a
[thunk](https://en.wikipedia.org/wiki/Thunk).

A criticism of CPS is that it is contagious. Once a caller uses CPS, all
dependent callers must also use it. This is because the continuation is
passed as an argument to the function by the caller and must continue to be
threaded through the program. This is referred to as [callback hell](http://callbackhell.com/).
To borrow an example from
[MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#callbacks):

```js
function doStep1(init, callback) {
  const result = init + 1;
  callback(result);
}

function doStep2(init, callback) {
  const result = init + 2;
  callback(result);
}

function doStep3(init, callback) {
  const result = init + 3;
  callback(result);
}

function doOperation() {
  doStep1(0, (result1) => {
    doStep2(result1, (result2) => {
      doStep3(result2, (result3) => {
        console.log(`result: ${result3}`);
      });
    });
  });
}

doOperation();
```

Notice how the `doOperation` function forms a ["pyramid of doom"](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming))
as each continuation is passed to the next function. Syntactic sugar has been
added to JavaScript to make this pattern more manageable, such as
[async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function),
which is essentially a CPS transformation in a direct style.

```js
async function doOperation() {
  const result1 = await doStep1(0),
        result2 = await doStep2(result1),
        result3 = await doStep3(result2);
  console.log(`result: ${result3}`);
}

doOperation();
```

To quote Alan Perlis, *"Syntactic sugar causes cancer of the semicolon."*. By
using syntactic sugar to avoid CPS, we also lost the ability to manipulate the
continuation as directly as we could before and are back to requiring three
special keywords (`async`, `await`, and `return`) to manage control flow.

This is where `call/cc` comes in.

## Call with Current Continuation

We'll start with a challenge:

```js
console.log(
  foo(cont => {
    console.log("Print me");
    cont("Return me");
    console.log("Don't print me");
  })
)
```

How do we implement `foo` so that it prints the following?

```text
Print me
Return me
```

In other words, how do we emulate the behavior of the `return` statement?
For an even more ambitious challenge, how do we `return` an outer function
from an inner function?

```js
console.log(
  foo(return1 => 5 + 10 * foo(return2 => 100 * return2(3)))
)
// 35

console.log(
  foo(return1 => 5 + 10 * foo(return2 => 100 * return1(3)))
)
// 3
```

In a programming language such as Scheme or Standard ML, this is possible
using a special function called `call/cc` (call with current continuation).
It was decided that `call/cc` was too powerful and a
[potential footgun](https://esdiscuss.org/topic/generators-vs-foreach#content-14) for
JavaScript, so it was not included in the language. However, it is possible
to implement `call/cc` in JavaScript using another feature of the language:
exceptions.

```js
class ContError extends Error { returnValue = undefined; }

function callcc(fnCont) {
    const contErr = new ContError("Unable to continue current continuation.");
    const fnEscape = (returnValue) => {
      contErr.returnValue = returnValue;
      throw contErr;
    }
    try {
        return fnCont(fnEscape);
    } catch (e) {
        if (e === contErr)
            return contErr.returnValue;
        else
            throw e;
    }
}
```

Exceptions are a form of non-local control flow. They bubble up the call stack
until they are caught by a `try/catch` block. This differs from the local
control flow of `return` which only returns from the current function. We can
use this behavior to implement `call/cc`. The continuation `fnCont` is invoked
with the escape function `fnEscape` as an argument. If `fnEscape` is called,
it throws a special `ContError` exception with the return value as a property.
The `try/catch` block catches the exception and returns the return value if
it is a `ContError` exception. Otherwise, it rethrows the exception if it is
not a `ContError` exception.

This seems deceptively simple, but it does the trick. We can now implement
our challenges from before:

```js
console.log(
  callcc(return_ => {
    console.log("Print me");
    return_("Return me");
    console.log("Don't print me");
  })
)

// Print me
// Return me
```

```js
console.log(
  callcc(return1 => 5 + 10 * callcc(return2 => 100 * return2(3)))
)
// 35

console.log(
  callcc(return1 => 5 + 10 * callcc(return2 => 100 * return1(3)))
)
// 3
```

I know what you're thinking. This is a lot of work to implement a feature
that is already built into the language. But this is just the beginning.

## Early Exit

Here's an example of `call/cc` being used to compute the product of a list
and exiting early when a zero is encountered:

```js
// Singly Linked List
const NIL = Object.freeze({});
const Cons = (head, tail) => Object.freeze({ head, tail });

const product = (xs) => callcc((exit) => {
  const recur = (x) =>
    x === NIL ? 1 :
      (x.head === 0) ? exit(0) : // early exit
        x.head * recur(x.tail);

  return recur(xs);
});

const xs = Cons(1, Cons(2, Cons(3, NIL))),
  ys = Cons(0, xs)

console.log(product(xs)) // 6
console.log(product(ys)) // 0
```

## try/catch

This is a bit circuitous since we're using exceptions to implement `call/cc`,
but we can use `call/cc` to implement our own `try/catch` for the sake of demonstration:

```js
function tryCatchFinally(tryBlock, catchBlock, finallyBlock) {
  let exceptionOccurred = false,
    result;

  callcc(function (exit) {
    // Execute the try block and capture the result
    result = tryBlock(function (exitResult) {
      exceptionOccurred = true;
      result = exitResult;
      exit(exitResult);
    });

    // If the try block completes without an exception, return the result
    return result;
  });

  // Check if an exception occurred
  if (exceptionOccurred)
    // Execute the catch block and return its result
    result = catchBlock(result);

  // Execute the finally block
  finallyBlock();

  // Return the result
  return result;
}
```

Which enables us to write code like this:

```js
tryCatchFinally(
  (exitEarly) => {
    // Try block
    // Your code here
    // You can call `exitEarly(result)` to exit early and return a result
  },
  (error) => {
    // Catch block
    // Handle the error or perform any necessary cleanup
    // Return a result if desired
  },
  () => {
    // Finally block
    // Perform any necessary cleanup or resource release
  }
);
```

And a simple example with division by zero:

```js
function divide(a, b) {
  return tryCatchFinally(
    (exitEarly) => {
      if (b === 0)
        exitEarly('Division by zero');
      return a / b;
    },
    (error) => {
      console.log('Caught an error:', error);
      return 'Error occurred';
    },
    () => {
      console.log('Finally block executed');
    }
  );
}

console.log(divide(6, 2));
// [LOG]: "Finally block executed"
// [LOG]: 3

console.log(divide(4, 0));
// [LOG]: "Caught an error:",  "Division by zero"
// [LOG]: "Finally block executed"
// [LOG]: "Error occurred"
```

## Generators and Coroutines

Next, we can use `call/cc` to implement form of
[generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator):

```js
function generator(body) {
  let isDone = false;

  const iterator = {
    next: (value) => {
      return callcc((exit) => {
        if (isDone)
          return { value: undefined, done: true };
        const result = body(value, exit);
        return { value: result.value, done: false };
      });
    },
    throw: (error) => {
      return callcc((exit) => {
        isDone = true;
        return { value: error, done: true, isError: true };
      });
    }
  };

  return iterator;
}
```

With a contrived example:

```js
function myGenerator() {
  let counter = 0;
  return function(value, yields) {
    if (counter <= 5) {
      const result = counter;
      counter += value || 1;
      yields({ value: result, done: false });
    } else {
      yields({ value: counter, done: true });
    }
  };
}

const iterator = generator(myGenerator());
console.log(iterator.next());  // { value: 0, done: false }
console.log(iterator.next(2)); // { value: 1, done: false }
console.log(iterator.next());  // { value: 3, done: false }
console.log(iterator.next(3)); // { value: 4, done: false }
console.log(iterator.next());  // { value: 7, done: true  }
console.log(iterator.throw('I Am Error')) // { value: "I am Error", done: true, isError: true }
```

The error case could be handled more elegantly, but you get the idea.

With some minor tweaks this can basically fill the role of a coroutine as well since
you can pass a value to `next` which enables bidirectional communication between the
generator and the code that controls its execution.  This bidirectional communication
is a characteristic of coroutines, where they can suspend their execution and yield
a value, and also receive input values to continue their execution from the previous
yield point.

## Amb

<!-- fibonacci call stack -->

## Conclusion

In this article we've explored the `call/cc` function and how it can be used to
implement a variety of control flow constructs. This is far from an exhaustive
list, and given the native support of most of these constructs in modern JavaScript
it's unlikely that you'll ever want to use `call/cc` in most application.

The utility of `amb` though may be a bit more compelling <!-- -->

 <!-- npm library -->

## References and Further Reading

* <https://ds26gte.github.io/tyscheme/index-Z-H-15.html>
* <https://stackoverflow.com/questions/612761/what-is-call-cc>
* <http://www.madore.org/~david/computers/callcc.html>
* <https://norvig.com/lispy2.html>
* <https://stackoverflow.com/questions/66962102/understanding-implementation-of-call-with-continuation>
* <https://matt.might.net/articles/programming-with-continuations--exceptions-backtracking-search-threads-generators-coroutines/>
* <http://okmij.org/ftp/continuations/against-callcc.html>
* <https://en.wikipedia.org/wiki/Call-with-current-continuation>
* <https://esdiscuss.org/topic/generators-vs-foreach>
* <https://wiki.haskell.org/Continuation>
* Generators and CoRoutines <https://2ality.com/2015/03/es6-generators.html>
* <https://wingolog.org/archives/2013/02/25/on-generators>
