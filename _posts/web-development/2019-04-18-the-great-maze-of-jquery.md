---
layout: post
icon: file-text
title:  "The Great Maze of jQuery"
date:   2019-04-18 12:00:00 -0600
category: Web Development
commentThreadId: 2
---

*David Mark ([@Cinsoft](https://twitter.com/Cinsoft){:target="_blank"}, [Github](https://github.com/david-mark){:target="_blank"}, [comp.lang.javascript](https://groups.google.com/forum/#!profile/comp.lang.javascript/APn2wQdow28xcHDrDggfWTU5hXOy7oRk11vZM0N4N-idI7HJycIOyoXWIDEZoK6_MEPc2ywEyeeK){:target="_blank"}) is a notorious web developer from a different age. He is abrasive and effective. The following is a reposting of [my response](https://gist.github.com/mlhaufe/a7d7469db14b3b006e6cdf15e5669d80){:target="_blank"} to a request for comments on yet another jQuery architectural problem. It has been slightly edited for blog form.*

## Faking Ad-Hoc Polymorphism

JavaScript does not support Ad-Hoc Polymorphism (One method name with multiple implementations based on parameters). Many developers (including jQuery authors) try to fake it by using double-dispatch, or an inlined Great Maze of If-Else-dom or Switch-dom. To clarify what that is in the abstract here is an example of it (in TypeScript for clarity):

<script src="https://gist.github.com/mlhaufe/fe6cfe394954f4bc7afaff8e54c01b88.js?file=example-1.js"></script>

The key thing you’ll notice in these “workaround” approaches is the amount of code spent just trying to find the part (The Great Maze) that actually does useful work (the alert). Not to mention that in a more real-world example, much of the “useful work” is probably duplicated along with the “maze”. Imagine the maintenance and evolutionary problems with this code as well.

One way to avoid this issue is to push the condition logic to the caller and to expose the implementation more directly:

<script src="https://gist.github.com/mlhaufe/fe6cfe394954f4bc7afaff8e54c01b88.js?file=example-2.js"></script>

The issue now is that while the code is far simpler for you as a library author, it is now more complicated for the user:

<script src="https://gist.github.com/mlhaufe/fe6cfe394954f4bc7afaff8e54c01b88.js?file=example-3.js"></script>

Another issue with the first example and in the one above: Let’s say I want to add a Triangle class, I now have to update every object in the my library or else every single switch/if statement depending on the approach I used. In other words: Every shape has to be aware of every other related shape…

So now the challenge is, how to provide the author with the usability of a single method while avoiding The Great Maze and maintainability problems when we’re restricted to Single-Dispatch in JavaScript…

## Multiple Paradigm Pain

JavaScript is a multi-paradigm language. It supports: [Functional](https://en.wikipedia.org/wiki/Functional_programming){:target="_blank"}, [Procedural](https://en.wikipedia.org/wiki/Procedural_programming){:target="_blank"}, [Object Oriented](https://en.wikipedia.org/wiki/Object-oriented_programming){:target="_blank"} ([Prototypical](https://en.wikipedia.org/wiki/Prototype-based_programming){:taret="_blank"}), [Imperative](https://en.wikipedia.org/wiki/Imperative_programming){:target="_blank"}, and others. Not all of these paradigms are compatible with each other and choosing to use the wrong combination leads to cognitive dissonance and impedance mismatch.

jQuery in particular utilizes all of these in places which require extra code to make up for the dissonance, or causes one to overlook other problems as it can distract from higher level issues. The issue you pointed to is one example of this with all of the code duplication made invisible due to helper methods (the function is duplicated with the only difference being the name of the type)

## Sound Architecture is key

> Safe upon the solid rock the ugly houses stand:<br>
> Come and see my shining palace built upon the sand!
>
> <cite>Edna St. Vincent-Millay, Second Fig</cite>

Since jQuery is closest to an Object Oriented architecture, I would suggest they actually commit to it properly and eliminate/reduce the contradictory paradigms. By doing so, many problems become clearer and a methodology for refactoring and extension become clear.

Now the climax: A solution to the problems above. By choosing OOP, the answer to our dilemma of duplicate code, extraneous conditionals, and maintainability is straightforward: Subtype Polymorphism. With this approach, the implementation is different based on the current type (this) instead of different based on the parameters. With implementation inheritance as well, the duplication is also eliminated:

<script src="https://gist.github.com/mlhaufe/fe6cfe394954f4bc7afaff8e54c01b88.js?file=example-4.js"></script>

Adding a Triangle is now so obvious that an example is not even needed. Every Shape is aware of its immediate parent and the parent is unaware of its children. Loose coupling has also been achieved.
