---
layout: post
icon: file-text
title:  "Feature-Oriented Progamming in JavaScript"
date:   2022-02-13 00:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/feature-oriented-programming-in-javascript
commentThreadId: -1
---

* TOC
{:toc}

## Introduction

The <abbr title="The spirit of the times">zeitgeist</abbr> of programming languages remain a
dance/struggle between the Functional and Object-Oriented paradigms. We can see this via numerous
popularity indices such as the [TIOBE index](https://www.tiobe.com/tiobe-index/). Both of these paradigms
have existed for at least 50 years. Is it not surprising that we have yet to adopt a successor that takes
the best of both? A true synthesis yielding something greater than the sum of its parts? The current
state of popular languages are ones referred to as "General Purpose" which in practice translates to
an awkward mixture of of multiple paradigms. To avoid cognitive dissonance successful practitioners often
focus on a subset of their language and banish the rest to dark corners and exceptional use cases. One
dominant paradigm drives the application and one-off features of the others might be leveraged in edge-cases.

<!--
In this article I will show you: the essence of these two paradigms, why they aren't directly compatible,
design patterns each uses to exceed its limitations, and a proper synthesis of both which introduces a new
programming paradigm.
-->

<!--
## Functional Programming

In Functional Programming (FP) the most important idea is mapping inputs to outputs: a function. Programs
consist of functional abstractions, compositions, and applications. They are first-class entities that can be passed as arguments and returned as results. While this sounds simple there is not a single language
representing this paradigm. It is a nation with many tribes. Some emphasize
[Lazy-Evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation) and others
[Eager-Evaluation](https://en.wikipedia.org/wiki/Evaluation_strategy#Eager_evaluation). There are also
debates over allowing side-effects such as assignment or not, nuances of syntax, and many more differences. Representative languages of this paradigm include: Haskell, Racket, and F#.

Here is an example functional program in JavaScript for calculating fibonacci numbers:

```js
const fib = (n) => {
    if(n < 2)
        return n
    else
        return fib(n - 1) + fib(n - 2)
}

fib(12) // 144
```

## Object-Oriented Programming

Object-Oriented Programming (OOP) could be said to be all about "objects" but sadly this paradigm suffers
from significant Balkanization where the warring tribes of languages differ in many aspects in more
significant ways than Functional Programming does. Even the term OOP itself is debated.

The best definition I have found is from the textbook
[Types and Programming Languages](https://www.cis.upenn.edu/~bcpierce/tapl/) by Benjamin Pierce:

An Object-Oriented Programming language often (but not always) has the following features:

1. Multiple representations: The object dictates what code is executed, often at runtime using dynamic dispatch
2. Encapsulation: Hiding of internal representation and providing a limited interface for access.
3. Subtyping: Interface sharing
4. Inheritance: Implementation sharing of shared interfaces. Generally done through classes or delegation
5. Open recursion: The ability of a method to refer to other methods of itself before/after they are defined.
(keyword `this` in JavaScript, `self` in Python, `my` in Perl, etc.)

Representative languages of this paradigm vary wildly. Some of the pillars of this paradigm include:
Smalltalk, Self, Eiffel, BETA, Modula-3

Here is an example object-oriented program in JavaScript for calculating fibonacci numbers:

```js
class Int {
    constructor(n) { this.n = n }

    fib() {
        if(this.n < 2)
            return this.n
        else
            return new Int(this.n - 1).fib() + new Int(this.n - 2).fib()
    }
}

new Int(12).fib() // 144
```

## The Expression Problem

To state it another way:

In Functional Programming I have an operation (a function) and when provided a context (data as an argument)
I can derive a result.

In Object-Oriented Programming I have a context (an object) and when an operation (a method) is chosen I can
derive a result.

These approaches are [dual](https://en.wikipedia.org/wiki/Duality_(mathematics)) to one another and can express
the same algorithms in their own way, though not necessarily as efficiently depending on the details.

So why not just pick one of the two paradigms and be done with the whole affair?

### Hutton's Razor

## Final Tagless

## Object Algebras

## Synthesis: Feature Oriented Programming


## Conclusion

## References

- https://oleksandrmanzyuk.wordpress.com/2014/06/18/from-object-algebras-to-finally-tagless-interpreters-2/
- https://www.haskellforall.com/2021/01/the-visitor-pattern-is-essentially-same.html
- http://w3future.com/weblog/stories/2008/06/16/adtinjs.xml

## Further Reading

- [Objects Have Failed](https://web.archive.org/web/20060115002041/https://www.dreamsongs.com/ObjectsHaveFailedNarrative.html)
- [Objects have not failed](https://web.archive.org/web/20181220100301/https://www.dreamsongs.com/ObjectsHaveNotFailedNarr.html)
- [Why Functional Programming Matters](https://www.cse.chalmers.se/~rjmh/Papers/whyfp.pdf)
- [Why calculating is better than scheming](https://www.cs.kent.ac.uk/people/staff/dat/miranda/wadler87.pdf)
- [Hutton's Razor(s)](https://jfdm.github.io/post/2019-12-04-Razor.html)
- [Constructors Considered Harmful](https://gbracha.blogspot.com/2007/06/constructors-considered-harmful.html)
- [Object Initialization and Construction Revisited](https://gbracha.blogspot.com/2007/08/object-initialization-and-construction.html)

-->
<!--
```ts
type Exp = Lit | Add
type Lit = { tag: 'Lit', value: number }
type Add = { tag: 'Add', left: Exp, right: Exp }

const evaluate = (exp: Exp): number => 
    exp.tag == 'Lit' ? exp.value :
    evaluate(exp.left) + evaluate(exp.right)

// 7 = 4 + (2 + 1)
const expSeven: Exp = { tag: 'Add', 
    left: { tag: 'Lit', value: 4 },
    right: { tag: 'Add', 
        left: { tag: 'Lit', value: 2 },
        right: { tag: 'Lit', value: 1 }
    }
}

// 7
const seven = evaluate(expSeven)
```


## Introduction

At the time of this writing Object-Oriented Programming (OOP) remains the [most popular](https://www.tiobe.com/tiobe-index/) paradigm.
Following closely behind are number of functional programming languages. This state of affairs should not be surprising as both approaches have delivered
us from a [quagmire](https://en.wikipedia.org/wiki/Software_crisis) of
[spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code) and near insurmountable engineering problems of the time. As our
ambitions have grown and our projects more sophisticated the limits of these two paradigms become increasingly apparent. Surprisingly these limitations
continue to be uncommon knowledge among these languages' practitioners.

## Hutton's Razor

{TODO}

## The Limits of Object Oriented Programming

```typescript
// Data types
interface IExpType { }
interface ILitType extends IExpType { value: number }
interface IAddType extends IExpType { left: IExpType, right: IExpType }

// Data "Constructors" (aka Introduction rules)
class Lit implements ILitType { 
    constructor(public value: number) { }
}
class Add implements IAddType {
    constructor(public left: IExpType, public right: IExpType) { }
}

// Expression instance. 4 + (2 + 1)
let expSeven: IExpType = new Add(new Lit(4), new Add(new Lit(2), new Lit(1)))
```

{TODO}

## The Limits of Functional Programming

```typescript
// Data types
type ExpType = LitType | AddType
type LitType = { _brand: 'Lit', value: number }
type AddType = { _brand: 'Add', left: ExpType, right: ExpType }

// Data "Constructors" (aka Introduction rules)
function Lit(value: number): LitType { 
    return { _brand: 'Lit', value }
}
function Add(left: ExpType, right: ExpType): AddType {
    return { _brand: 'Add', left, right }
}

// Expression instance. 4 + (2 + 1)
let expSeven: ExpType = Add(Lit(4), Add(Lit(2), Lit(1)))
```

{TODO}

## A Dual Constraint

{TODO}

## What Lies Beyond

{TODO}

## Further Reading

* [Objects Have Not Failed](https://www.dreamsongs.com/ObjectsHaveNotFailedNarr.html)
* [Objects Have Failed](https://www.dreamsongs.com/ObjectsHaveFailedNarrative.html)
* [Why Functional Programming Matters](https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf)

## Notes

* https://www.ibm.com/developerworks/java/library/j-clojure-protocols/index.html?ca=drs-
* https://www.slideshare.net/rlaemmel/the-expression-problem-as-part-of-the-the-ptt-lecture
* https://duckduckgo.com/?q=%22The+Expression+Problem%22+in+prolog&t=brave&ia=web
* https://duckduckgo.com/?q=%22The+Expression+Problem%22+in+SQL&t=brave&ia=web
* https://jfdm.github.io/post/2019-12-04-Razor.html
* https://medium.com/javascript-scene/abstract-data-types-and-the-software-crisis-671ea7fc72e7
* https://en.wikipedia.org/wiki/Software_crisis
* https://en.wikipedia.org/wiki/Object-oriented_programming
* Show the trade-off table
  * How does that change if visitor pattern is used?
    * Design Patterns are bug reports against your language
* "closures are a poor man's objects" --Christian Queinnec
* "objects are a poor man's closures" --Norman Adams
* Objects and closures are equivalent
* "Objects are state data with attached behavior; Closures are behaviors with attached state data" -- Peter Norvig
* "A closure is an object that supports exactly one method: ‘apply’" --Guy Steele
* "A closure is an object with a single method, an object is a closure with multiple methods. -- Erik Meijer "
* Closure:
  * A lexical environment
  * Free variables in that environment

https://secure.wikimedia.org/wikipedia/en/wiki/Closure_%28computer_science%29 

====================================================================================

## The Limits of Expressiveness

TODO: ...

The expression problem for a language has five requirements:

1. Define and extend both data variants and operations
2. Strong Static typing
3. No modification or duplication of existing code
4. Separate compilation and type checking
5. The ability to compose independent extensions

The classic example to work with this is referred to as "Hutton's Razor"
which is simply a language consisting only of integers and addition.

=========================

...

A little more verbose than needed in both examples but you can see how they
align in intent.

Using these two representations as a starting point we can start to extend it.

First by adding a new operation "evaluate". For the Functional approach this is
trivial:

```typescript
// Operation type
type EvalType = (exp: ExpType) => number

// Data "Destructor" (aka Elimination rule)
let evaluate: EvalType = (exp: ExpType) => 
    exp._brand == 'Lit' ? exp.value :
    exp._brand == 'Add' ? evaluate(exp.left) + evaluate(exp.right) :
    NaN

// evaluate(4 + (2 + 1)) => 7
let seven: number = evaluate(expSeven)
```

So far so good. Now let's try the same in the OO style:

-->