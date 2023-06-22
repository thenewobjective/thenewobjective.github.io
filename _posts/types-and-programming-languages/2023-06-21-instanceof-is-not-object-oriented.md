---
layout: post
icon: file-text
title:  "instanceof Is Not Object Oriented"
date:   2023-06-21 12:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/instanceof-is-not-object-oriented
---

* TOC
{:toc}

## Introduction

One of the most common operators encountered in JavaScript, Java, and other languages
is an `instanceof` like operator. Such an operator should not be used
in object-oriented programming. It's unreliable in many contexts, promotes
procedural programming, and can cause namespace pollution. In this article
I'll focus on JavaScript, but the same arguments apply to other languages
with minor environmental differences.

## Unreliability

JavaScript is not a pure object-oriented language. It has a number of primitive
types that are not objects. The `instanceof` operator is unreliable when used
with these types. For example, most primitives are not considered instances of their
corresponding object type:

```javascript
"foo" instanceof String; // false
true instanceof Boolean; // false
42 instanceof Number; // false
```

This is one of the original sins of JavaScript.

The `instanceof` operator is also unreliable when used across
[iframe boundaries](https://groups.google.com/g/comp.lang.javascript/c/XTWYCOwC96I/m/70rNoQ3L-xoJ),
[Realms](https://github.com/tc39/proposal-shadowrealm) and
module boundaries in some applications (ex: [node](https://github.com/nodejs/node/issues/13408)).
In most cases, the operator fails because each context gets a copy of the code
and `instanceof` does not have a reference to the original object type to compare against.

## Procedural Programming and Excessive Imports

JavaScript is a multi-paradigm language, but it's generally wise to focus on
a specific paradigm when writing code. If you don't, you'll end up with impedance
mismatches and cognitive dissonance at the boundaries between paradigms.

By relying on `instanceof` you're writing procedural code. You're checking the
type of an object and then performing some action based on that type. This implies
the existence of if-else and/or switch statements across your code base to discriminate
between types.

```js
function doSomething(obj) {
    if (obj instanceof Foo)
        // do something
    else if (obj instanceof Bar)
        // do something else
    else if (obj instanceof Baz)
        // do something else
    else
        // do something else
}

// or

function doSomething(obj) {
    switch (true) {
        case obj instanceof Foo:
            // do something
            break;
        case obj instanceof Bar:
            // do something else
            break;
        case obj instanceof Baz:
            // do something else
            break;
        default:
            // do something else
    }
}
```

I call this the great maze of if-elsedom and switchdom. You'll notice that there
is a significant amount of code used to navigate the maze of conditionals to
execute the useful code. This is not Object-Oriented Programming.

An additional problem here is that you need to import the types you're checking
against. This is a form of namespace pollution; you're importing types that you
shouldn't need to care about.

```js
import Base from './base';
import Foo from './foo';
import Bar from './bar';
import Baz from './baz';

function doSomething(obj: Base) {
    if (obj instanceof Foo)
        // do something
    else if (obj instanceof Bar)
        // do something else
    else if (obj instanceof Baz)
        // do something else
    else
        // do something else
}
```

This is a violation of the
[Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter).

## Type Predicate Pattern

A quick and lazy way to improve the above code is to use a type predicate method
instead of `instanceof`. This is a function that returns a boolean indicating
whether the object is of a specific type.

```js
class Base {
    isFoo() { return false; }
    isBar() { return false; }
    isBaz() { return false; }
}

class Foo extends Base {
    override isFoo() { return true; }
}

class Bar extends Base {
    override isBar() { return true; }
}

class Baz extends Base {
    override isBaz() { return true; }
}
```

Which changes the `doSomething` function to:

```js
function doSomething(obj: Base) {
    if (obj.isFoo())
        // do something
    else if (obj.isBar())
        // do something else
    else if (obj.isBaz())
        // do something else
    else
        // do something else
}
```

While this is an improvement, it's still not sufficient. The namespace pollution and
explicit `instanceof` usages have been removed but the maze of conditionals remain.
There is another problem here as well. If you add a new type (`Quux`), you'll
still need to update every conditional in your code base to handle it. The Base
class would need to be updated as well. This is a violation of the
[Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).
So we need a better solution.

## SubType Polymorphism

In Functional and Procedural programming like the above, you have an operation in hand
(`doSomething`) and you utilize pattern matching or a conditional
to discriminate between types and locate the appropriate code to execute. In contrast,
Object-Oriented Programming leverages SubType Polymorphism. In this paradigm, you
have an object in hand and you ask the object to perform an operation on itself.

So the above function `doSomething(obj)` becomes `obj.doSomething()`. The object
itself knows how to handle the operation and you as the caller don't need to
know which variant it is. Instead of the caller discriminating between types,
the object itself discriminates between types.

```js
class Base {
    doSomething() { ... }
}

class Foo extends Base {
    override doSomething() { ... }
}

class Bar extends Base {
    override doSomething() { ... }
}

class Baz extends Base {
    override doSomething() { ... }
}
```

This also enables you to add new variants without modifying existing code. You simply
add a new class and implement the operation. The callers don't need to be updated:

```js
class Quux extends Base {
    override doSomething() { ... }
}
```

## Challenge: Multiple Dispatch

There are use cases where the behavior is dependent on multiple types which can be challenging
to handle. Here's an example:

```typescript
abstract class Shape {
    abstract intersects(other: Shape): boolean;
}
class Circle extends Shape {
    constructor(readonly radius: number) { super(); }

    override intersects(other: Shape): boolean {
        if (other instanceof Circle)
            // ...
        else if (other instanceof Rectangle)
            // ...
        else
            throw new Error(`Unknown shape: ${other}`);
    }
}
class Rectangle extends Shape {
    constructor(readonly width: number, readonly height: number) { super(); }

    override intersects(other: Shape): boolean {
        if (other instanceof Circle)
            // ...
        else if (other instanceof Rectangle)
            // ...
        else
            throw new Error(`Unknown shape: ${other}`);
    }
}
```

If your language (C#, Groovy, Raku, etc.) supports [Multiple-Dispatch](https://en.wikipedia.org/wiki/Multiple_dispatch),
you can use that instead. Here's an example in [Julia](https://julialang.org/):

```julia
abstract type Shape end

struct Circle <: Shape
    radius::Float64
end

struct Rectangle <: Shape
    width::Float64
    height::Float64
end

intersects(a::Circle, b::Circle) = ...
intersects(a::Circle, b::Rectangle) = ...
intersects(a::Rectangle, b::Circle) = ...
intersects(a::Rectangle, b::Rectangle) = ...
intersects(a::Shape, b::Shape) = error("Unknown shape: $a")

...

intersects(Circle(1.0), Rectangle(2.0, 3.0)) # OK
intersects(Circle(1.0), 1) # ERROR
```

That's nice and declarative but it's not available in all Object-Oriented languages.
So what can you do if your language doesn't support Multiple-Dispatch? One option
is to use multiple levels of single dispatch:

```typescript
// TypeScript
abstract class Shape {
    abstract intersects(other: Shape): boolean;
    abstract intersectsCircle(other: Circle): boolean;
    abstract intersectsRectangle(other: Rectangle): boolean;
}

class Circle extends Shape {
    constructor(readonly radius: number) { super(); }

    override intersects(other: Shape): boolean {
        return other.intersectsCircle(this);
    }

    override intersectsCircle(other: Circle): boolean { ... }
    override intersectsRectangle(other: Rectangle): boolean { ... }
}

class Rectangle extends Shape {
    constructor(readonly width: number, readonly height: number) { super(); }

    override intersects(other: Shape): boolean {
        return other.intersectsRectangle(this);
    }

    override intersectsCircle(other: Circle): boolean { ... }
    override intersectsRectangle(other: Rectangle): boolean { ... }
}

...
myShape.intersects(otherShape);
```

This is a bit verbose compared to Multiple-Dispatch but it works.
The caller doesn't need to know the type of either shape nor needs to call
the specialized methods.

The problem though is that our solution is not extensible. If we add a new shape
(`Triangle`), we need to update every existing shape to handle it. This brings back the
violation of the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).

So what can we do? Another alternative is to use [Object Algebras](https://oleksandrmanzyuk.wordpress.com/2014/06/18/from-object-algebras-to-finally-tagless-interpreters-2/). Here's an example

```typescript
import { Merge } from '@mlhaufe/object-algebra';

interface ShapeAlgebra<T> {
    Circle(radius: number): T;
    Rectangle(width: number, height: number): T;
}

abstract class ShapeData {}
class CircleData extends ShapeData {
    constructor(readonly radius: number) { super(); }
}
class RectangleData extends ShapeData {
    constructor(readonly width: number, readonly height: number) { super(); }
}

class ShapeDataFactory implements ShapeAlgebra<ShapeData> {
    Circle(radius: number): ShapeData {
        return new CircleData(radius);
    }
    Rectangle(width: number, height: number): ShapeData {
        return new RectangleData(width, height);
    }
}

interface Intersectable {
    intersects(other: ShapeData): boolean;
    intersectsCircle(other: CircleData): boolean;
    intersectsRectangle(other: RectangleData): boolean;
}
class IntersectTrait implements ShapeAlgebra<Intersectable> {
    Circle(radius: number): Intersectable {
        return {
            intersects(other: ShapeData): boolean {
                return other.intersectsCircle(this);
            },
            intersectsCircle(other: CircleData): boolean { ... },
            intersectsRectangle(other: RectangleData): boolean { ...}
        };
    }
    Rectangle(width: number, height: number): Intersectable {
        return {
            intersects(other: ShapeData): boolean {
                return other.intersectsRectangle(this);
            },
            intersectsCircle(other: CircleData): boolean { ... },
            intersectsRectangle(other: RectangleData): boolean { ...}
        };
    }
}

class ShapeFactory extends Merge(ShapeDataFactory, IntersectTrait) {}
const s = new ShapeFactory(),
    c1 = s.Circle(1),
    r1 = s.Rectangle(2, 3)

c1.intersects(r1); // OK
```

This approach is pretty heay-handed but it's extensible in both dimensions: new shapes
and new operations. It's also declarative and the caller doesn't need to know the type
of either shape nor needs to call the specialized methods. It utilizes a helper library
([@mlhaufe/object-algebra](https://www.npmjs.com/package/@mlhaufe/object-algebra)) I wrote
to make it easier to work with Object Algebras in TypeScript by providing a `Merge` function.

As time goes on I hope JavaScript and other OO languages will support Multiple-Dispatch
or other features that make the above solutions unnecessary or easier to express.
Until then, I hope the above examples are helpful.
