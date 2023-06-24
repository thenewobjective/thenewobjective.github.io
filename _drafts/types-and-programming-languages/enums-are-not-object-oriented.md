---
layout: post
icon: file-text
title:  "Enums Are Not Object Oriented"
date:   2020-06-24 12:00:00 -0600
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

```java
// Java, C#, TypeScript, etc.
enum Color {
  RED, GREEN, BLUE
}
```

Each language may vary slighty in extensions and implementation details, but
practically they fulfill the same role.

The attraction of enums is that they are a fixed set of constants that can be
used in place of magic numbers. For example:

```typescript
function getFavoriteColor(): Color {
  return Color.BLUE;
}

// vs

function getFavoriteColor(): number {
  return 0x0000FF;
}
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
  RED = 0x0000FF,
  GREEN = 0x00FF00,
  BLUE = 0xFF0000
}

const MAGENTA = Color.RED | Color.BLUE,
  YELLOW = Color.RED | Color.GREEN,
  CYAN = Color.GREEN | Color.BLUE;

const redPart = MAGENTA & Color.RED, // 0xFF0000
  greenPart = MAGENTA & Color.GREEN, // 0x000000
  bluePart = MAGENTA & Color.BLUE; // 0x0000FF
```

## Why are enums not object oriented?

Assuming that enums in your language are not simply syntactic sugar for another
construct, they are not object oriented but rather a procedural construct. The
existence of enums implies the use of a conditional elsewhere in your code:

```typescript
function printColor(color: Color) {
  switch (color) {
    case Color.RED:
      console.log("Red");
      break;
    case Color.GREEN:
      console.log("Green");
      break;
    case Color.BLUE:
      console.log("Blue");
      break;
  }
}

// or

function printColor(color: Color) {
  if (color === Color.RED) {
    console.log("Red");
  } else if (color === Color.GREEN) {
    console.log("Green");
  } else if (color === Color.BLUE) {
    console.log("Blue");
  }
}
```

## The object oriented alternative

## What about case exhaustive pattern matching?

## What about bitwise operations?

## Conclusion

<!--

## Notes

* <https://stackoverflow.com/questions/34113758/enums-vs-subclasses-which-is-object-oriented-design>
* <https://softwareengineering.stackexchange.com/questions/211811/in-what-situations-does-it-make-sense-to-use-an-enumeration-when-writing-object>
* <https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/enumeration-classes-over-enum-types>

-->