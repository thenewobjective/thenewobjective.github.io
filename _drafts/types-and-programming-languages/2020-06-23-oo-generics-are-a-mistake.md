---
layout: post
icon: file-text
title:  "Generics Are a Mistake"
date:   2020-06-23 12:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/generics-are-a-mistake
---

In object-oriented programming languages generic types are a mistake. This feature
has introduced dizzying complexity for little gain. There's an alternative that
is more expressive but most popular languages are lacking this facility.

* What a generic type is
* example
* Shortcoming

---
Introduction

* Thesis Paragraph

Generics

* Description
* Example
*
* Generics are functional
* Doesn't work well with subtyping, hence the introduction of 'extends', +/-, etc
* Social convention of single letter is harmful
* Subtyping and Equality
* Covariant? Contravariant? +/-
* Forced to thread. Pollutes everything
* CRTP

Associated Types

* Description
* Example in pseudo-code
* TypeScript simulation

Generics vs Associated Types

Bonus: Reification

Conclusion

References

* <http://lambda-the-ultimate.org/node/5358#comment-92984>
* Page 268 of "Object-Oriented Software construction"
* Page 254 of "Programming Rust"
* <http://lambda-the-ultimate.org/node/5121>
* <http://lambda-the-ultimate.org/node/4865#comment-78081>
* <http://lambda-the-ultimate.org/node/4865#comment-78102>
* <http://lambda-the-ultimate.org/node/4865#comment-78094>
* <https://www.google.com/search?ie=UTF-8&oe=UTF-8&q=associated+type&btnG=&domains=http%3A%2F%2Flambda-the-ultimate.org&sitesearch=http%3A%2F%2Flambda-the-ultimate.org>
* <http://wiki.c2.com/?GenericsVsSubtyping>
* <http://wiki.c2.com/?GenericVsObjectOrientedProgramming>
* <https://gbracha.blogspot.com/2018/10/reified-generics-search-for-cure.html>
* <https://channel9.msdn.com/events/Lang-NEXT/Lang-NEXT-2014/Panel-Type-Systems-and-Much-More?term=erik%20meijer&lang-en=true&pageSize=15&skip=60>
* Java Naming Conventions
  * <https://stackoverflow.com/a/2900933/153209>
<https://stackoverflow.com/a/30146204/153209>

* <https://youtu.be/Yb_Z9BxVquw?t=294>
  * Beta has virtual types (associated types)
  * <https://dl.acm.org/doi/10.5555/646156.679846>
