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

In other words, a continuation is "what's left to do" in a program. For example,

```js
x = 5; y = x + 1; z = y * 2;
```

In the above program, the continuation of `x = 5;` is `y = x + 1; z = y * 2;`.
The continuation of `y = x + 1` is `z = y * 2;`. In a slightly more complex example:

```js
function f(x) {
  const y = x + 1,
        z = y * 2;
  return z;
}

const x = 5,
  result = f(x);
```

Continuations are usually implicit. Unless you set a breakpoint in a debugger,
it is not something you generally think about. However, continuations can be
explicitly captured, named, and passed around in a program. This is accomplished
via a function. To adjust the above example:

```js
function f() {
  y = x + 1; z = y * 2;
}

x = 5; f();
```

In the above program, the continuation of `x = 5;` is the function call `f()`.
This function abstracts the continuation of `x = 5;` and gives it a name. This

<!-- -->

## Call with Current Continuation

### Scheme

### Standard ML

### TypeScript

<!-- The relationship with exceptions and why it's an escape hatch -->

/*
The main difference between the Python and TypeScript code is the way
 that errors are handled. In Python, the RuntimeWarning exception is used
 to signal that the continuation has been escaped. In TypeScript, a new Error
  object is created to represent the continuation. This is because TypeScript
   does not have a built-in RuntimeWarning exception.

The rest of the code is essentially the same in both languages. The callcc()
 function takes a function proc as input and returns the result of calling proc()
  with a special function throw() that can be used to escape the continuation.
 */

```ts
/**
 * Thrown to escape the current continuation.
 */
class ContError<T> extends Error {
  /**
   * The value to return from the continuation.
   */
  returnValue: any
}

/**
 * Calls the given function with a special function that can be used to escape
 * the current continuation.
 * @param proc The function to call with the escape function.
 * @returns The return value of proc.
 */
function callcc<T>(proc: (escape: any) => void) {
  const cErr = new ContError<T>("Unable to continue current continuation.");
  function escape(returnValue: T) {
    cErr.returnValue = returnValue;
    throw cErr;
  }
  try {
    return proc(escape);
  } catch (e) {
    if (e === cErr)
      return cErr.returnValue;
    else
      throw e;
  }
}

console.log(
  callcc(fail => 5 + 10 * callcc(escape => 100 * escape(3))) // 35
)

console.log(
  callcc(fail => 5 + 10 * callcc(escape => 100 * fail(3))) // 3
)
```

## Amb

## Generators

## Green Threads

## Fibers

## Conclusion

 <!-- npm library -->

## References and Further Reading

* <https://stackoverflow.com/questions/612761/what-is-call-cc>
* <http://www.madore.org/~david/computers/callcc.html>
* <https://norvig.com/lispy2.html>
* <https://stackoverflow.com/questions/66962102/understanding-implementation-of-call-with-continuation>
* <https://matt.might.net/articles/programming-with-continuations--exceptions-backtracking-search-threads-generators-coroutines/>
* <http://okmij.org/ftp/continuations/against-callcc.html>
* <https://en.wikipedia.org/wiki/Call-with-current-continuation>
* <https://esdiscuss.org/topic/generators-vs-foreach>
* Generators and CoRoutines <https://2ality.com/2015/03/es6-generators.html>
* <https://wiki.haskell.org/Continuation>
