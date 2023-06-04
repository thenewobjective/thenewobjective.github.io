---
layout: post
icon: file-text
title:  "Design by Contract"
date:   2021-10-28 12:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/design-by-contract
---

<!--
* TOC
{:toc}
-->

Here are two classes:

```typescript
class A<T> {
    add(item: T): void
    isEmpty(): boolean
    isFull(): boolean
    remove(): T
    size(): number
}

class B<T> {
    add(item: T): void
    isEmpty(): boolean
    isFull(): boolean
    remove(): T
    size(): number
}
```

Are they the same? If you saw these two classes in your codebase, would you work to refactor
them into a single class?

I will now rename the two classes and ask the same questions:

```typescript
class Stack<T> {
    add(item: T): void
    isEmpty(): boolean
    isFull(): boolean
    remove(): T
    size(): number
}

class Queue<T> {
    add(item: T): void
    isEmpty(): boolean
    isFull(): boolean
    remove(): T
    size(): number
}
```

Did you change your answer?

From the above you can see that the semantics of a class is not reflected in its name
nor its interface. You are often forced to
look at the implementation instead of being able to rely on a higher level of abstraction.

Here's another example

## Further Reading

- <http://se.ethz.ch/~meyer/publications/computer/contract.pdf>
