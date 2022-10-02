---
layout: post
icon: file-text
title:  "Managing Complexity"
date:   2022-09-04 13:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/managing-complexity
commentThreadId: -1
---

* TOC
{:toc}

## Introduction

{TODO}

## What is Software Architecture

### Fighting Gravity

Traditional architecture is discussed in terms of buildings and other physical structures.
Let's look at one of the most popular human-built structures
[The Great Pyramid of Giza](https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza):

<figure>
    <img src="/media-library/software-systems-engineering/pyramid-of-giza.jpg" alt="The Great Pyramid of Giza">
<figcaption markdown="1">

Credit: [Nina Aldin Thune](https://commons.wikimedia.org/w/index.php?curid=282496)

</figcaption>
</figure>

This structure is quite imposing. Standing at 481 feet tall it remained the tallest man-made
structure for more than 3,800 years with a weight of at least 5.75 million tons.
<sup>[[ref](https://weightofstuff.com/how-much-does-the-pyramid-of-giza-weigh/)]</sup>

Is this considered a grand architecture? No, this is an example of what can be accomplished with
brute force at scale. This is little better than a pile of rocks:

<figure>
    <img src="/media-library/software-systems-engineering/rock-pile.png" alt="A pile of rocks">
<figcaption markdown="1">

Credit: [Wikipedia](https://en.wikipedia.org/wiki/Cairn)

</figcaption>
</figure>

Even so we have to wait 3,800+ until another structure could overtake in the year 1092;
[The Lincoln Cathedral](https://en.wikipedia.org/wiki/Lincoln_Cathedral):

<figure>
    <img src="/media-library/software-systems-engineering/lincoln-cathedral.jpg" alt="The Lincoln Cathedral">
<figcaption markdown="1">

Credit: [Wikipedia](https://en.wikipedia.org/wiki/Lincoln_Cathedral)

</figcaption>
</figure>

This cathedral stood at 525 feet tall and was the tallest man-made structure for 238 years. You notice
that the form of this structure is vastly different from the that of the pyramid. What is the fundamental
difference between the two? What enabled this new scale? The answer is the discovery of the
[Arch](https://en.wikipedia.org/wiki/Arch):

<figure>
    <img src="/media-library/software-systems-engineering/rock-arch.jpg" alt="Rock Arch">
<figcaption markdown="1">

Credit: [Wikipedia](https://en.wikipedia.org/wiki/Arch#/media/File:Arch_Balance_(cropped).jpg)

</figcaption>
</figure>

This discovery enabled grander constructions with orders of magnitude less effort.
No more brute-forcing large structures. We can obtain scale through the proper
organization of the materials.

<table>
    <tr>
        <td>
<figure>
    <img src="/media-library/software-systems-engineering/pyramid-of-giza.jpg" alt="The Great Pyramid of Giza">
<figcaption markdown="1">

The Great Pyramid of Giza<br>
**481 ft**<br>
**5,750,000 tons**<sup>[[ref](https://weightofstuff.com/how-much-does-the-pyramid-of-giza-weigh/)]</sup><br>
Credit: [Nina Aldin Thune](https://commons.wikimedia.org/w/index.php?curid=282496)

</figcaption>
</figure>
        </td>
        <td>
<figure>
    <img src="/media-library/software-systems-engineering/eiffel-tower.jpg">
<figcaption markdown="1">

The Eiffel Tower<br>
**1,063 ft**<br>
**8,047 tons**<sup>[[ref](https://en.wikipedia.org/wiki/Eiffel_Tower)]</sup><br>
Credit: [Benh LIEU SONG](https://commons.wikimedia.org/w/index.php?curid=6926930)

</figcaption>
</figure>
        </td>
    </tr>
</table>

Thus, the following unattributed quote becomes clear:

> "Any idiot can build a bridge that stands, but it takes an
> engineer to build a bridge that barely stands."
> <cite>- Unknown</cite>

### Fighting Complexity

In traditional architecture the primary enemy is gravity. The Archway is an effective tool that
fights against it. The question we have now is: what is the analogous enemy in Software, and what is
its "Arch"?

In the early days of Software Engineering there was a major concern. It was referred to as
[The Software Crisis](https://en.wikipedia.org/wiki/Software_crisis). This crisis can be
summarized by a quote from [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra):

> “The major cause of the software crisis is that the machines have become several orders of magnitude more
> powerful! To put it quite bluntly: as long as there were no machines, programming was no problem at all;
> when we had a few weak computers, programming became a mild problem, and now we have gigantic computers,
> programming has become an equally gigantic problem.”
> <cite markdown="1">[Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra)</cite>

There was a point where the computer was the most expensive part of a project. Now it is by far
the programmer. Computing has become practically free and the price of the programmer has skyrocketed.
You, I, and most people now have a supercomputer in their pocket:

* **1997** - Intel ASCI Red/9152 supercomputer: **1.338 TFLOPS**
* **2021** - IPhone 13 Pro: **1.5 TFLOPS**

So why do most software projects fail if the machines are plenty and capable?

The failure rates, [depending on the study](https://www.zdnet.com/article/study-68-percent-of-it-projects-fail/),
range from 50% to 80% or more. There is also a cute aphorism called the [Ninety–ninety rule](https://en.wikipedia.org/wiki/Ninety%E2%80%93ninety_rule):

> The first 90 percent of the code accounts for the first 90 percent of the development time.
> The remaining 10 percent of the code accounts for the other 90 percent of the development time.
> <cite>Tom Cargill, Bell Labs</cite>

In my earlier article, ["Conway's Law and Consequences"](/software-systems-engineering/conways-law-and-consequences),
I tackle the human organization aspect of software and how they relate. I invite you to read that before continuing here. In this article I focus only on the implementation. So back to the original question: What is the analogy to gravity in software and what is our "arch"? I think this becomes clear with the following graphic:

<figure>
    <img src="/media-library/software-systems-engineering/complexity-time-loc.png" alt="Complexity over time chart">
    <figcaption>Intrinsic vs Extrinsic complexity over time</figcaption>
</figure>

As we develop solutions, some problems are naturally (intrinsically) harder than others; for example: adding a
list of numbers vs computing the running average of the same list. The code we write though often has
extraneous details and overhead that has nothing directly to with the problem we are trying to solve (extrinsic).

Let's compare a program that writes "Hello World" to the console in Java and JavaScript:

```java
// Java
class HelloWorld {
    public static void main(String[] args)
    {
        System.out.println("Hello World");
    }
}
```

```js
// JavaScript
console.log('Hello World')
```

Not to pick on Java in this contrived example, but it makes clear the point that many of our challenges in software
are not because the problems are complex but that we
[make them complicated](https://www.youtube.com/watch?v=ubaX1Smg6pY).

So the complexity of our code, whether it be extrinsic or intrinsic is the "weight" that bears upon us and the machines
that must execute it thus complexity is our analogy to gravity and what we are fighting against. How can we get the two lines of our chart to align?

## Anergetic Systems Failure

Before we can identify our "arches" for fighting against complexity, we need to understand that complexity better.

You may have heard of the [Peter principle](https://en.wikipedia.org/wiki/Peter_principle):

> Every employee tends to rise to his level of incompetence

There is an analogous observation by [Michael Arntzenius](http://www.rntz.net/index.html) for software:

> Software grows until it exceeds our capacity to understand it.

These quotes may feel like observations of some great general truth, but we don't need to take them as such.
How does such a situation arise? It takes effort to implement features in our software and not all of those
efforts are useful.

In physics energy is defined as the ability to do work and can be expressed by the following relation:
`Energy = Exergy + Anergy`. Exergy is the part of energy used in useful work. Anergy is that
portion which is wasted in side effects such as heat, overcoming friction, and other activities not related
to the desired outcome. Anergy is sometimes referred to as
[disorder](https://en.wikipedia.org/wiki/Entropy_(order_and_disorder)) and
[entropy](https://wikidiff.com/anergy/entropy)

In software, we deal with this as well by the analogous relation:
`Algorithm = Algorithmic Exergy + Algorithmic Anergy`. You may have seen this under another name:
[Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity). Plainly speaking,
when we express an algorithm we do so in some language we find convenient.
These could be flow charts, Python, a natural language like English, or even
[artistic paintings](https://www.dangermouse.net/esoteric/piet/samples.html). Whatever we adopt as
our language of expression, we also adopt certain trade-offs. In the above "Hello World" comparison
you can identify the useful work (exergy) clearly: the logging of the "Hello World" message. You
can also identify the wasted effort (anergy) in the Java code: the ceremony around defining the
class and method. As we create ever larger systems, this incidental complexity (anergy)
grows as well until the "weight" of it makes further changes practically impossible. This "weight"
being the cognitive overhead and execution cost on the underlying machine. This ultimate failure
I like to call **"Anergetic Systems Failure"**, or as others have called it:
["Project Heat Death"](https://ieeexplore.ieee.org/document/4302682) as an
[analogy from cosmology](https://en.wikipedia.org/wiki/Heat_death_of_the_universe).

## The Language Of The Domain

Seeing that our choice of language has a direct impact on the complexity of our work, we know
the first problem to be solved: using a better language. That's easier said than done though; in 2004
[best estimates](http://lambda-the-ultimate.org/node/7) were that at least 4,600 programming languages existed.
In the nearly 20 years since then we can safely assume that number has increased significantly.

Due to this [paradox of choice](https://en.wikipedia.org/wiki/The_Paradox_of_Choice) and the
[inertia of the industry](https://www.tiobe.com/tiobe-index/), we tend to pick
what is most popular and easy for us to learn (similar to what we already know). As a consequence
we tend to use languages that are
["general-purpose"](https://en.wikipedia.org/wiki/General-purpose_programming_language)
and not particularly well suited for any specific problem. In other words, we fall into the
[Golden Hammer fallacy](https://en.wikipedia.org/wiki/Law_of_the_instrument#Computer_programming).
To state it another way: you don't know the details of the project you're building, but you've
decided to use Python as your programming language as that's what you and your team already know.

<!--
The problem with "general-purpose" languages are also their key selling-point: you don't know the details
of the problem and don't want to juggle dozens of specialized languages in the same project. Just look
at the mess that is web an average development project: HTML, CSS, (Java|Type)Script, a
Server-Side language (C#, PHP, etc.), SQL for database access, YAML for build and deployment...
-->

<!-- 
https://martinfowler.com/dsl.html
https://en.wikipedia.org/wiki/Domain-specific_language
-->

<!--
Domain specific languages versus impedance mismatch. 

General purpose languages and combining multiple domains. 

Primitives means of combination and means of abstraction.

Cognitive overhead of multiple dsls.
 
Internal versus external dsls.

Regularity is desirable across problem domains as we are optimizing human understanding and minimizing cognitive load. We are not code golfing every where. 
-->

<!--
Even if you can't pick the optimal language, Architecture dominates materials
-->

<!--
Algorithmic Anergy is not just about explicit syntactic noise.
(Or maybe it is and the implications are not clear?)
 -->

<!-- Design patterns are bug reports against your programming language -->

<!-- Syntactic Sugar Cons. point-free programming as legos with a single peg.-->

<!-- A language is considered Low-Level if it forces you to pay attention to the irrelevant -->

<!-- implicit meaning in your mind vs explicit meaning in the code. 
    let point = {x: 3, y: 4, z: 12}

    vs.

    let point = [3, 4, 12]

    EIBTI.
-->

<!--
https://en.wikipedia.org/wiki/Language-oriented_programming

A good language provides primitives, a means of combination, and a means of abstraction
that become the primitives of the next layer closer to the target domain.
Syntactic sugar gets in the way due to a lack of orthogonality.

Emergent behaviors and leaky abstractions are due to ???
-->

<!-- 
A Domain is a [Domain of Discourse](https://en.wikipedia.org/wiki/Domain_of_discourse).
    A sphere of knowledge (ontology), influence, or activity. The subject area to which the
    user applies a program is the domain of the software.
-->

<!--
Edsger Dijkstra call APL "a mistake, carried through to perfection"
    No control structures?
Per Alan Kay: perhaps because of required learning curve to be effective?
    Does the same apply to regex syntax?
-->

<!--
What is refactoring reducing?
Refactoring won't eliminate language overhead

> Strive to add function by deleting code.
> <cite markdown="1">[Jon Bentley](https://en.wikipedia.org/wiki/Jon_Bentley_(computer_scientist))</cite>

Relationship to cyclomatic complexity? 

Cyclomatic complexity doesn't measure extraneous language features though. 
Relationship to Big O notation? 

there is a difference between an algorithm and the expression of the algorithm in a particular language
The expression of that algorithm generally has overhead due to readability preferences ()

https://en.m.wikipedia.org/wiki/Code_refactoring
https://en.m.wikipedia.org/wiki/Decomposition_(computer_science)
https://softwareengineering.stackexchange.com/a/97695
https://en.m.wikipedia.org/wiki/Software_rot
https://en.m.wikipedia.org/wiki/Software_entropy
https://en.m.wikipedia.org/wiki/Technical_debt

Software rot due to a lack of robustness 

Implementation does not just introduce intentional or accidental technical debt, but there is also the overhead of the implementation language itself. A great maze of if-elsedom? All low-level code? 

Low level code being all code not directly related to the problem domain. Like for loops, the return or break statement, etc. 

Are design patterns considered tech debt, or the lack of a proper domain language? 

Is using a particular programming language considered technical debt?
PHP VS Haskell 

HQ9+ vs Perl
-->

<!-- 
Database first vs code first
Where is the Domain of the application?
    Why isn't C# a framework details instead of the database?

If the database is chosen as the place for the entities you end up in a situation
of building a relational model that decomposes the desired entities into a normalized form
useful for that database. DBMSes also force you to define behavior separate from the entities
as stored procedures. Custom types are also generally not possible:
Is there a ZIP-code type? Phone type? Email Type? A UPC code type? etc.
What's considered optimal for a database representation does not make it optimal for representation in
other parts of your application. You'd also be combining your 
Data Access Layer (DAL) with your Business Logic Layer. (Which may or may not be okay)

https://search.brave.com/search?q=database+first+vs+code+first
https://crosp.net/blog/software-architecture/clean-architecture-part-1-databse-vs-domain/
https://hackmd.io/@pierodibello/S1JvdXoKP
https://stackoverflow.com/questions/14420276/well-designed-query-commands-and-or-specifications
https://search.brave.com/search?q=database+first+vs+code+first
https://wiki.c2.com/?CodeSmell
https://crosp.net/blog/software-architecture/clean-architecture-part-1-databse-vs-domain/
https://hackmd.io/@pierodibello/S1JvdXoKP
https://search.brave.com/search?q=entity+framework+vs+database+project&source=desktop
https://www.johndcook.com/blog/2010/05/10/taking-your-code-for-a-walk/
-->

<!--
## Example Architectures

Clean Architecture implies Code First instead of DB first development?
	(Entity Framework)
-->

<!-- 
Monolith by architecture, or monolith by infrastructure?
https://twitter.com/alexcwatt/status/1544876135711916035
https://medium.com/qe-unit/airbnbs-microservices-architecture-journey-to-quality-engineering-d5a490e6ba4f
-->