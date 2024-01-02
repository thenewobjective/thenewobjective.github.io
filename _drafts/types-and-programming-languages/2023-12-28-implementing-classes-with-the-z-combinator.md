---
layout: post
icon: file-text
title:  "Implementing Classes with the Z-Combinator"
date:   2023-12-28 15:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/implementing-classes-with-the-z-combinator
---

* TOC
{:toc}

## Introduction

In a [previous post](/types-and-programming-languages/deriving-the-z-combinator) I
showed how to derive the Z-Combinator from a recursive function:

```js
let fix = f => n =>
    f(fix(f))(n)
```

What was not shown was a practical use for this combinator. In this post I will show
how to use it to implement classes. Like the previous post, this
post will be written in JavaScript due to its popularity and trivial barrier to entry.
Modern JavaScript as of ES6 has a class keyword, but this will be ignored for the
sake of demonstration.

## Objects

An _object_ is a _behavior_ which supports dynamic dispatch. A _behavior_ is
a collection of named operations which can share information. _Dynamic dispatch_
means that when an operation is invoked, the implementation is determined by the
object and not the caller. In other words, if two objects have the same operations,
they may have different implementations. For example, a `Stack` and a `Queue` both have
`push` and `pop` operations, but different implementations.

Objects can be represented in a programming language in numerous ways. The most
common way is to use a _record_, but it's also possible is to use _lambdas_, _modules_,
and many other constructs. An Object-Oriented Programming language emphasizes the
use of objects and provides a syntax for defining them and invoking their operations in
a first-class manner. In JavaScript an Object can be defined trivially with the `{...}` syntax.
**For demonstration purposes, we will treat object literals as records only**. The `this` keyword
and prototype chains will be ignored.

An example of a simple object sharing information between operations is a counter:

```js
const Counter = () => {
    let count = 0,
        min = 0,
        max = 10
    return {
        inc: () => {
            if (count < max)
                count++
        },
        dec: () => {
            if (count > min)
                count--
        },
        get: () => count
    }
}
```

The `Counter` function is a factory which creates a new object each time it is invoked.
It has hidden variables `count`, `min`, and `max` which are shared between the operations via a closure.
The operations are defined as lambdas which close over the variables in scope. Usage is straightforward:

```js
const counter1 = Counter(),
      counter2 = Counter()

counter1.inc()
counter1.inc()

counter2.inc()
counter2.inc()
counter2.inc()

console.log(counter1.get()) // 2
console.log(counter2.get()) // 3
```

Since shared state can consist of multiple variables, it is useful to organize them
into a single record so that they can be referenced as a single unit:

```js
const Counter = () => {
    const state = { count: 0, min: 0, max: 10 }
    return {
        inc: () => {
            if (state.count < state.max)
                state.count++
        },
        dec: () => {
            if (state.count > state.min)
                state.count--
        },
        get: () => state.count
    }
}
```

### Substitutability

Another principle of Object-Oriented Programming is _substitutability_. This means that
an object can be used in place of another object if it supports the same operations.

For example, if we introduce a new type of counter which includes a `reset` operation:

```js
const ResetCounter = () => {
    const state = { count: 0, min: 0, max: 10 }
    return {
        inc: () => {
            if (state.count < state.max)
                state.count++
        },
        dec: () => {
            if (state.count > state.min)
                state.count--
        },
        get: () => state.count,
        reset: () => { state.count = 0 }
    }
}
```

Then we should be able to use it in place of an original Counter instance:

```js
const counter = Counter(),
      resetCounter = ResetCounter()

const incTwice = counter => {
    counter.inc()
    counter.inc()
}

incTwice(counter)
incTwice(resetCounter)
```

The `incTwice` function takes a counter and increments it twice. It will work
regardless of whether the `counter` argument is a `Counter`, `ResetCounter`,
or any other object which supports the `inc` operation.

## Classes

A _class_ can be thought of as a _factory_ which creates instances of an object
based on a _template_. Our `Counter` and `ResetCounter` factories can be thought
of as barely qualified classes.

An obvious problem with the factories defined above is that they are nearly identical.
The only difference is that `ResetCounter` includes a `reset` operation. This is a
violation of the _Don't Repeat Yourself_ principle. We should abstract the common
operations and then extend them.

### Base Class

Abstracting the operations with respect to the state will allow us to define a
base template or _class_ which can be used as a factory for creating objects:

```js
const CounterClass = state => ({
    inc: () => {
        if (state.count < state.max)
            state.count++
    },
    dec: () => {
        if (state.count > state.min)
            state.count--
    },
    get: () => state.count
})

const ResetCounterClass = state => {
    const parent = BaseCounter(state)
    return {
        ...parent,
        reset: () => { state.count = 0 }
    }
}

const CounterConstructor = () => CounterClass({ count: 0, min: 0, max: 10 }),
      ResetCounterConstructor = () => ResetCounterClass({ count: 0, min: 0, max: 10 })
```

The `CounterClass` and `ResetCounterClass` create
objects based on a given state which is defined by the `*Constructor` functions.
This effectively separates the operations from the specific state.

............

Implementing an override is as simple as defining a new operation with the same
name as an existing operation. For example, if we wanted to override the `inc`
operation in `ResetCounter` to reset the counter when it reaches the maximum:

```js
const ResetCounterClass = state => {
    const parent = BaseCounter(state)
    return {
        ...parent,
        // override
        inc: () => {
            parent.inc()
            if (state.count === state.max)
                state.count = 0
        },
        reset: () => { state.count = 0 }
    }
}
```

Not particularly useful, but it demonstrates the principle and how to perform a
`parent` (super) call.

### Self-Reference

What if we wanted one operation to call another? For example, what if we
want a `set` operation which sets the counter to a given value
and have the `inc` & `dec` operations utilize it? Simply assigning the operations
to a `self` variable before returning the object solves this trivially:

```js
const SetCounterClass = state => {
    const self = {
        get: () => state.count,
        set: value => { state.count = value },
        inc: () => {
            if (state.count < state.max)
                self.set(state.count + 1)
        },
        dec: () => {
            if (state.count > state.min)
                self.set(state.count - 1)
        }
    }

    return self
}

const SetCounterConstructor = () => SetCounterClass({ count: 0, min: 0, max: 10 })
```

## Open Recursion

A key remaining feature of classes is _open recursion_. Open Recursion is the ability
of an operation to call another which may be overridden by a subclass or otherwise
not defined until runtime. To support this, our above implementation of `SetCounterClass`
can't define `self` directly. Instead, it must be provided as an argument:

```js
const SetCounterClass = state => self = ({
    get: () => state.count,
    set: value => { state.count = value },
    inc: () => {
        if (state.count < state.max)
            self.set(state.count + 1)
    },
    dec: () => {
        if (state.count > state.min)
            self.set(state.count - 1)
    }
})
```

Turning to the constructor, we now have a problem. We need to pass `self` to `SetCounterClass`,
but we don't have a reference to `self` until after we've created the object. This is a
chicken-and-egg problem and where we need the fixpoint combinator as mentioned in the
beginning of this post to tie the recursive knot:

```js
const SetCounterConstructor = () => {
    return fix(
        SetCounterClass({ count: 0, min: 0, max: 10 })
    )
}
```

## References and Further Reading

* [Types and Programming Languages](https://www.cis.upenn.edu/~bcpierce/tapl/). Benjamin C. Pierce. Chapter 18
* [A Proposal for Simplified, Modern Definitions of "Object" and "Object Oriented"](https://wcook.blogspot.com/2012/07/proposal-for-simplified-modern.html). William Cook
