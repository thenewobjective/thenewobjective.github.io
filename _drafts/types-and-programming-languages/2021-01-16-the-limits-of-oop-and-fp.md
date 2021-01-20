---
layout: post
icon: file-text
title:  "The Limits of OOP and FP"
date:   2021-01-16 00:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/the-limits-of-oop-and-fp
commentThreadId: 42
---

* TOC
{:toc}

## Introduction

At the time of this writing Object-Oriented Programming (OOP) Remains the [most popular](https://www.tiobe.com/tiobe-index/){:target="_blank"} paradigm. Following closely behind are number of functional programming languages. This state of affairs should not be surprising as both approaches have delivered us from a quagmire of spaghetti code and near insurmountable engineering challenges. As our Ambitions grow though it becomes increasingly clear that neither object-oriented nor functional languages are the way forward. Both paradigms have a respective limitation of expressiveness that limit our ability to reach the next level of {scalability?}.

## The software crisis

{A limited history on how we got here} 

## The Promise of Object-Oriented Programming

{TODO}

## The Limits of Object Oriented Programming

{TODO}

## The Promise of Functional Programming

{TODO}

## The Limits of Functional Programming

{TODO}

## A Dual Constraint

{TODO}

## What Lies Beyond

{TODO}

=====================================
======================================

## The Limits of Expressiveness

TODO: ...

The expression problem for a language has five requirements:

1. Define and extend both data variants and operations
2. Strong Static typing
3. No modification or duplication of existing code
4. Separate compilation and Type Checking
5. The ability to compose independent extensions

The classic example to work with this is referred to as "Hutton's Razor"
which is simply a language consisting only of integers and addition.

An Object-Oriented representation:

```typescript
// Data types
interface IExpType { }
interface ILitType extends IExpType { value: number }
interface IAddType extends IExpType { left: IExpType, right: IExpType }

// Data "Constructors" (aka Introduction rules)
class Lit implements ILitType { constructor(public value: number) { } }
class Add implements IAddType {
    constructor(public left: IExpType, public right: IExpType){}
}

// Expression instance. 4 + (2 + 1)
let expSeven: IExpType = new Add(new Lit(4), new Add(new Lit(2), new Lit(1)))
```

A Functional representation:

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

## Further Reading

* [Objects Have Not Failed](https://www.dreamsongs.com/ObjectsHaveNotFailedNarr.html){:target="_blank"}
* [Objects Have Failed](https://www.dreamsongs.com/ObjectsHaveFailedNarrative.html){:target="_blank"}
* [Why Functional Programming Matters](https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf){:target="_blank"}





=========================



On Tuesday, November 12, 2019 at 9:09:06 AM UTC-6, Julio Di Egidio wrote:
> On Monday, 11 November 2019 19:54:48 UTC+1, Michael Haufe (TNO)  wrote:
> > On Monday, November 11, 2019 at 10:51:41 AM UTC-6, Julio Di Egidio wrote:
> > > 
> > > "Political" issues aside, from a strictly technical point of view I would
> > > maintain that object oriented programming (meaning the whole idea) in its
> > > essence is *misplaced meta-programming*!
> > > 
> > > Thoughts?
> > 
> > I would say that BOTH the Functional and Object-Oriented language paradigms
> > are obsolete
> 
> I would say that they both keep evolving: but I'll check your links, thanks...

To save you and other readers some time I can demonstrate this limitation as
well as the discovered solutions. The papers can be a bit daunting if one 
doesn't have a background or education in PLT. One paper is in a flavor
of O'Caml and the other in Java. To split the difference and try to keep
in the spirit of the group I'll use TypeScript. These examples are
impressionistic.

1. The Expression Problem 

The expression problem for a language has five requirements:

- Define and extend both data variants and operations
- Strong Static typing
- No modification or duplication of existing code
- Separate compilation and Type Checking
- The ability to compose independent extensions

The classic example to work with this is referred to as "Hutton's Razor"
which is simply a language consisting only of integers and addition.

A functional representation of this might be:

```typescript
// Data types
type ExpType = LitType | AddType
type LitType = { _brand: 'Lit', value: number }
type AddType = { _brand: 'Add', left: ExpType, right: ExpType }

// Data "Constructors" (aka Introduction rules)
let Lit = (value: number): LitType => ({ _brand: 'Lit', value })
let Add = (left: ExpType, right: ExpType): AddType => ({
    _brand: 'Add',
    left, right
})

// Expression instance. 4 + (2 + 1)
let expSeven: ExpType = Add(Lit(4), Add(Lit(2), Lit(1)))
```

An Object-Oriented representation of this might be:

```typescript
// Data types
interface IExpType { }
interface ILitType extends IExpType { value: number }
interface IAddType extends IExpType { left: IExpType, right: IExpType }

// Data "Constructors" (aka Introduction rules)
class Lit implements ILitType { constructor(public value: number) { } }
class Add implements IAddType {
    constructor(public left: IExpType, public right: IExpType){}
}

// Expression instance. 4 + (2 + 1)
let expSeven: IExpType = new Add(new Lit(4), new Add(new Lit(2), new Lit(1)))
```

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

```typescript

```

> > In regards to OOAD as a whole, I wouldn't want to make the same claims and I
> > think it should be discussed separately.
> 
> But that is totally integral to what I am talking about: it's your perspective
> strictly on the details of a formal language that is not even in question...
> 
> BTW, "meta-programming" as in... meta-programming: do you mean you don't know
> what that is, or you just annoyed that I write down two liners instead of just
> posting links?  ;)
