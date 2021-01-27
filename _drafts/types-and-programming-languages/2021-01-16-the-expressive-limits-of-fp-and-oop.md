---
layout: post
icon: file-text
title:  "The Expressive Limits of FP and OOP"
date:   2021-01-16 00:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/the-expressive-limits-of-fp-and-oop
commentThreadId: 42
---

* TOC
{:toc}

## Introduction

At the time of this writing Object-Oriented Programming (OOP) remains the [most popular](https://www.tiobe.com/tiobe-index/){:target="_blank"} paradigm.
Following closely behind are number of functional programming languages. This state of affairs should not be surprising as both approaches have delivered
us from a [quagmire](https://en.wikipedia.org/wiki/Software_crisis){:target="_blank"} of
[spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code){:target="_blank"} and near insurmountable engineering problems of the time. As our
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

* [Objects Have Not Failed](https://www.dreamsongs.com/ObjectsHaveNotFailedNarr.html){:target="_blank"}
* [Objects Have Failed](https://www.dreamsongs.com/ObjectsHaveFailedNarrative.html){:target="_blank"}
* [Why Functional Programming Matters](https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf){:target="_blank"}

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