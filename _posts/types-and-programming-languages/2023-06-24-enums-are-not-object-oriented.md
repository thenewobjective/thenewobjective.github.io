---
layout: post
icon: file-text
title: "Enums Are Not Object Oriented"
date: 2023-06-24 12:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/enums-are-not-object-oriented
---

* TOC
{:toc}

## Introduction

If you are aiming to program in a pure Object Oriented style, then you should
avoid using enums as they are not object oriented but rather a procedural
construct. Here I will explain why and demonstrate an object oriented alternative.

## What is an enum?

Enums in popular languages vary slightly, but practically speaking they are
a fixed set of named constants. For example:

```typescript
enum Color {
  RED  = 0xFF0000, 
  GREEN = 0x00FF00,
  BLUE = 0x0000FF
}
```

Each language may vary slighty in extensions and implementation details, but
practically they fulfill the same role.

The attraction of enums is that they are a fixed set of constants that can be
used in place of magic numbers. For example:

```typescript
const getFavoriteColor = () => 0x0000FF;

// vs

const getFavoriteColor = () => Color.BLUE;
```

Additionally, enums can be used in switch statements to provide case exhaustive
pattern matching that can be checked at compile time:

```typescript
switch (getFavoriteColor()) {
  case Color.RED:
    console.log("Red");
    break;
  case Color.GREEN:
    console.log("Green");
    break;
  case Color.BLUE:
    console.log("Blue");
    break;
  // Compiler error if not exhaustive
}
```

They can often be used as a type:

```typescript
function printColor(color: Color) {
  console.log(color);
}
```

Bitwise operations can be performed on them when they are backed by a number:

```typescript
enum Color {
  RED = 0xFF0000,
  GREEN = 0x00FF00,
  BLUE = 0x0000FF
}

const MAGENTA = Color.RED | Color.BLUE, // Adds the two colors together
  CYAN = MAGENTA ^ Color.RED, // Removes the red component
  BLACK = MAGENTA & CYAN; // Removes the green and blue components
```

## Why are enums not object oriented?

Assuming that enums in your language are not simply syntactic sugar for another construct
(like a lightweight class), they are not object oriented but procedural. The
existence of enums implies the use of a conditional elsewhere in your code:

```typescript
function printColor(color: Color) {
  switch (color) {
    case Color.RED:   console.log("Red");   break;
    case Color.GREEN: console.log("Green"); break;
    case Color.BLUE:  console.log("Blue");  break;
  }
}

// or

function printColor(color: Color) {
  if (color === Color.RED) 
    console.log("Red");
  else if (color === Color.GREEN)
    console.log("Green");
  else if (color === Color.BLUE)
    console.log("Blue");
}
```

Such forms of conditional logic are procedural and not object oriented.
[Elsewhere](/types-and-programming-languages/instanceof-is-not-object-oriented) I have described
this as the great maze of if-elsedom and switchdom where you have to navigate through the maze of 
conditionals to find the code you wish to execute. This has the additional problem of being
brittle to change. If you add a new color, you have to find all the places where you have
a conditional/switch and add a new branch.

## The object oriented alternative

The general approach to eliminating conditionals and switch statements is to use subtype polymorphism.

So instead of:

```typescript
function printColor(color: Color) {
  switch (color) {
    case Color.RED:   console.log("Red");   break;
    case Color.GREEN: console.log("Green"); break;
    case Color.BLUE:  console.log("Blue");  break;
  }
}
```

We do:

```typescript
color.print();
```

Where `color` is an instance of a subtype of `Color` that implements the `print` method.
  
But how should colors be represented? One approach is to use an explicit class hierarchy:

```typescript
abstract class Color {
  abstract print(): void;
}

class Red extends Color {
  print() { console.log("Red"); }
}

class Green extends Color {
  print() { console.log("Green"); }
}

class Blue extends Color {
  print() { console.log("Blue"); }
}
```

This is a perfectly valid approach, but it has the downside of being verbose. If you have a large
number of colors, you will have to write a lot of boilerplate code. Additionally, you will have to
create a new class for each color.

A more concise approach is to utilize what is called an enumeration class:

```typescript
abstract class Enumeration<KeyType> {
  constructor(readonly key: KeyType, readonly name: string) {}
}
```

Which can be utilized as follows:

```typescript
class Color extends Enumeration<number> {
  static readonly RED = new Color(0x0000FF, "Red");
  static readonly GREEN = new Color(0x00FF00, "Green");
  static readonly BLUE = new Color(0xFF0000, "Blue");
}
```

which looks much closer to the original enum. The difference is that we have
eliminated the procedural conditional logic and replaced it with subtype
polymorphism. The added benefit of this approach is that we can now add new colors without
having to modify any existing usages as they will still call the `print` method.

This also has the added benefit of being able to add methods to the enumeration class:

```typescript
abstract class Enumeration<KeyType> {
  constructor(readonly key: KeyType, readonly name: string) {}

  // Returns all the values of the enumeration
  static values<T extends Enumeration<KeyType>, KeyType>(this: new () => T): T[] {
    return Object.values(this);
  }

  toString() { return this.name; }

  equals(other: Enumeration<KeyType>) {
    return this.key === other.key;
  }
}
```

## What about case exhaustive pattern matching?

By using subtype polymorphism, we have eliminated the need for case exhaustive pattern matching.
This is because the compiler will ensure that we have implemented the `print` method for all
subtypes of `Color`.

## What about bitwise operations?

If the enumeration class is backed by a number, we can still perform bitwise operations on it:

```typescript
class Color extends Enumeration<number> {
  static readonly RED = new Color(0x0000FF, "Red");
  static readonly GREEN = new Color(0x00FF00, "Green");
  static readonly BLUE = new Color(0xFF0000, "Blue");

  static readonly MAGENTA = Color.RED | Color.BLUE;
  static readonly CYAN = Color.MAGENTA ^ Color.RED;
  static readonly BLACK = Color.MAGENTA & Color.CYAN;
}
```

## Sugar via abstraction

With first class classes, we can create a function that provides a more convenient syntax for
creating enumeration classes:

```typescript
function Enum<ValueType>(...entries: [name: string, value: ValueType][]) {
  return class extends Enumeration<ValueType> {
    static {
      for (const [name, value] of entries) {
        this[name] = new this(value, name);
      }
    }
  };
}
```

Example usage:

```typescript
const Color = Enum(
  ["RED", 0xFF0000],
  ["GREEN", 0x00FF00],
  ["BLUE", 0x0000FF]
)
```

This may be a bit too cute though and to quote Alan Perlis:

> Syntactic sugar causes cancer of the semicolon.
> <cite markdown=1>[Alan Perlis](https://www.cs.yale.edu/homes/perlis-alan/quotes.html)</cite>