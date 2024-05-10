---
layout: post
icon: file-text
title:  "Managing Complexity"
date:   2024-05-09 13:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/managing-complexity
---

* TOC
{:toc}

## Introduction

Most software projects [fail](https://www.standishgroup.com/sample_research_files/DemoPRBR.pdf) (~75%).
This is a fact that has been known for decades. The reasons for this are many and varied but generally fall into
two categories: human organization and technical. The human organization aspect I have covered partially in a
[previous article](/software-systems-engineering/conways-law-and-consequences). Here I will focus on the
technical aspect.

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

This structure is quite imposing. Standing at 481 feet tall and having a weight of at
least 5.75 million tons, it remained the largest man-made structure for more than 3,800 years.
<sup>[[ref](https://weightofstuff.com/how-much-does-the-pyramid-of-giza-weigh/)]</sup>

Despite it being a grand monolith, can it be considered a grand architecture?
No, this is an example of what can be accomplished with perhaps the greatest of brute force methods.
It amounts to little better than a pile of rocks:

<figure>
    <img src="/media-library/software-systems-engineering/rock-pile.png" alt="A pile of rocks">
<figcaption markdown="1">

Credit: [Wikipedia](https://en.wikipedia.org/wiki/Cairn)

</figcaption>
</figure>

Even so it still took more than 3,800 years until another structure could overtake it in height in the year 1092;
[The Lincoln Cathedral](https://en.wikipedia.org/wiki/Lincoln_Cathedral):

<figure>
    <img src="/media-library/software-systems-engineering/lincoln-cathedral.jpg" alt="The Lincoln Cathedral">
<figcaption markdown="1">

Credit: [Wikipedia](https://en.wikipedia.org/wiki/Lincoln_Cathedral)

</figcaption>
</figure>

This cathedral stood at 525 feet and was the tallest man-made structure itself for another 238 years.
You'll notice that the form of this structure is vastly different from the that of the pyramid.
What is the fundamental difference between the two? What enabled this new scale?
The answer was not some new material but a new organization of existing ones, specifically the
[Arch](https://en.wikipedia.org/wiki/Arch):

<figure>
    <img src="/media-library/software-systems-engineering/rock-arch.jpg" alt="Rock Arch">
<figcaption markdown="1">

Credit: [Wikipedia](https://en.wikipedia.org/wiki/Arch#/media/File:Arch_Balance_(cropped).jpg)

</figcaption>
</figure>

The arch enabled grander constructions with orders of magnitude less effort.
No more brute-forcing large structures. We obtained scale through organization.

> As with most media from which things are built, whether the thing is a cathedral, a bacterium, a sonnet,
> a fugue or a word processor, **architecture dominates material**. To understand clay is not to understand the pot.
> <cite markdown="1">[Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay)</cite>

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
    <img src="/media-library/software-systems-engineering/eiffel-tower.jpg" alt="Eiffel Tower">
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

Thus, the following quote becomes clear:

> "Any idiot can build a bridge that stands, but it takes an
> engineer to build a bridge that barely stands."
> <cite>- Unknown</cite>

### Fighting Complexity

In traditional architecture the primary enemy is gravity. The Arch is an effective tool that
fights against it. The question we have now is: what is the analogy to gravity in Software,
and what is the "Arch"?

In the early days of Software Engineering there was a major concern. It was referred to as
[The Software Crisis](https://en.wikipedia.org/wiki/Software_crisis). This crisis can be
summarized by a couple quotes:

> “The major cause of the software crisis is that the machines have become several orders of magnitude more
> powerful! To put it quite bluntly: as long as there were no machines, programming was no problem at all;
> when we had a few weak computers, programming became a mild problem, and now we have gigantic computers,
> programming has become an equally gigantic problem.”
> <cite markdown="1">[Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra)</cite>
<br>
> Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of
> each other, with no structural integrity, but just done by brute force and thousands of slaves.
> <cite markdown="1">[Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay)</cite>

There was a point where the computer was the most expensive part of a project. Now it is by far
the programmer. Computing has become practically free, but the price of the programmer has skyrocketed.
You, I, and most people now have a supercomputer in their pocket:

* **1997** - Intel ASCI Red/9152 supercomputer: **1.338 TFLOPS**
* **2021** - IPhone 13 Pro: **1.5 TFLOPS**

Additionally, we have [Wirth’s Law](https://en.wikipedia.org/wiki/Wirth's_law) which is an adage on
computer performance that states that software is getting slower more rapidly than hardware is
becoming faster.

So why do most software projects fail if the machines are plenty and more than capable?

The failure rates, [depending on the study](https://www.zdnet.com/article/study-68-percent-of-it-projects-fail/),
range from 50% to 80% or more. There is also a cute aphorism called the [Ninety–ninety rule](https://en.wikipedia.org/wiki/Ninety%E2%80%93ninety_rule):

> The first 90 percent of the code accounts for the first 90 percent of the development time.
> The remaining 10 percent of the code accounts for the other 90 percent of the development time.
> <cite>Tom Cargill, Bell Labs</cite>

In my earlier article, ["Conway's Law and Consequences"](/software-systems-engineering/conways-law-and-consequences),
I tackle the human organization aspect of software and how they relate. I invite you to read that before continuing here. In this article I'm focusing on the non-organization aspect.

So back to the original question: What is the analogy to gravity in software and what is our "arch"?

As we develop solutions, some problems are naturally (intrinsically) harder than others; for example: adding a
list of numbers vs computing the running average of the same list. The code we write often has
extraneous details and overhead that has nothing directly to do with the problem we are trying to solve (extrinsic).

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

> Elaborations to express an idea complicate the expression
> <cite markdown="1">[Gerald Sussman](https://en.wikipedia.org/wiki/Gerald_Jay_Sussman)</cite>

So the complexity of our code, whether it be extrinsic or intrinsic is the "weight" that bears upon us thus complexity
is our "gravity" and what we fighting against. Our goal is then how can we get the two lines of this chart to align?

<figure>
    <img src="/media-library/software-systems-engineering/complexity-time-loc.png" alt="Complexity over time chart">
    <figcaption>Intrinsic vs Extrinsic complexity over time</figcaption>
</figure>

We can't alter the intrinsic complexity of the problem, but we can reduce the extrinsic complexity of our solution.

> For any system, there is a certain amount of complexity that cannot be reduced
> <cite markdown="1">[Tesler's Law](https://lawsofux.com/teslers-law/)</cite>

## Anergetic Systems Failure

Before we can identify our "arches" for fighting complexity, we need to understand that complexity better.

You may have heard of the [Peter principle](https://en.wikipedia.org/wiki/Peter_principle):

> Every employee tends to rise to his level of incompetence

There is an analogous observation by [Michael Arntzenius](http://www.rntz.net/index.html) for software:

> Software grows until it exceeds our capacity to understand it.

These quotes may feel like observations of some greater general truth, but we don't need to take them as such.
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

## A Semiotic Perspective

Semiotics is the study of signs and symbols and their use or interpretation. In software, we have
many signs and symbols that we use to communicate with the computer, our colleagues, and ourselves.
The relationship between a symbol and its meaning is represented by a
"[Semiotic Triangle](https://en.wikipedia.org/wiki/Triangle_of_reference)":

<figure>
    <img src="/media-library/software-systems-engineering/semiotic-triangle.png" alt="Semiotic Triangle">
    <figcaption>The Semiotic Triangle</figcaption>
</figure>

In this diagram you see a relationship between Thought, Symbol, and Referent. The Thought is the
concept/idea you are trying to express. The Symbol (Syntax) is the representation of that concept.
The Referent (meaning) is the [Thing-in-itself](https://en.wikipedia.org/wiki/Thing-in-itself)
that the concept refers to.



## Measuring Complexity

In order to have any hope of understanding and therefore managing complexity, we must first measure it
otherwise we have no way to know if we are making progress against it. There are many ways to measure
complexity due to its multifaceted nature and which aspects of it you are interested in the most. Some
measures of complexity include:

| Complexity Measure | Perspective |
| ------------------ | ----------- |
| [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) | Control Flow Structure |
| [Halstead complexity](https://en.wikipedia.org/wiki/Halstead_complexity_measures) | Operators and Operands |
| [Henry and Kafura complexity](https://www.researchgate.net/publication/224172494_Information_flow_metrics_and_complexity_measurement) | Control and Data flow |
| [Chidamber and Kemerer Metrics](https://en.wikipedia.org/wiki/Programming_complexity#Chidamber_and_Kemerer_Metrics) | Object-Oriented Design |
| [Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity) | Algorithmic Entropy |
| [Asymptotic Complexity](https://en.wikipedia.org/wiki/Analysis_of_algorithms) | Algorithmic Efficiency |

<!--
https://en.wikipedia.org/wiki/Goodhart's_law
Goodhart's law is an adage often stated as, "When a measure becomes a target, it ceases to be a good measure".
-->

> "For every polynomial-time algorithm you have, there is an exponential algorithm that I would rather run"
> <cite markdown="1">[Alan Perlis](https://en.wikipedia.org/wiki/Alan_Perlis)</cite>

<!-- ## Semiotics

> "The limits of my language mean the limits of my world."
> <cite markdown="1">[Ludwig Wittgenstein](https://en.wikipedia.org/wiki/Ludwig_Wittgenstein)</cite>

The Sign, Signifier, and Signified are the three components of a sign. The Sign is the thing that is being
represented, the Signifier is the representation of the thing, and the Signified is the concept that is
being represented. This is the basis of [Semiotics](https://en.wikipedia.org/wiki/Semiotics).

Complexity can be found in all three components of a sign. -->

<!-- Reference the refactoring website -->

<!--
### Technical Debt

Object Points
Function Points
Story Points
"Effort" vs "complexity" vs Familiarity

https://en.wikipedia.org/wiki/Technical_debt

* Help ticketing systems: Help ticketing systems are a common indicator and resource to identify potential issues. They can help you track and measure the number of open tickets, their priority, and the time it takes to resolve them.
* Time-to-fix metrics: This measures the amount of time it takes to make changes to existing code and to solve problems without using quick fixes. This metric can help you identify areas where technical debt is accumulating.
* Technical debt ratio (TDR): TDR is the ratio of the cost to fix the software system vs. the cost to build it. Tools like SonarQube and Coverity can help you measure TDR.
* Number and severity of bugs left unfixed: Tracking the number and severity of bugs left unfixed per agile iteration can help you plan bug fixing activities for the next iteration.
* Ownership, cohesion, and churn metrics: These metrics can help you measure technical debt by analyzing the ownership of code, its cohesion, and the rate of changes made to it.
* Person-hours cost: This metric measures the cost of technical debt in person-hours. While it may not be the most accurate method, it can give you an idea of the scale of the problem.

https://twitter.com/php_ceo/status/765298072691806209?lang=en
https://web.archive.org/web/20220905232237/https://medium.com/@joaomilho/festina-lente-e29070811b84
-->

## The Language Of The Domain

> The complexity of software is an essential property, not an accidental one. Hence
> descriptions of a software entity that abstract away its complexity often abstract away its
> essence.
> <cite markdown="1">Fred Brooks, [“No silver bullet”, 1987](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf)</cite>

Seeing that our choice of expression has a direct impact on the complexity of our work, we know
the first problem to be solved: **choosing or creating the right language**.

What is the right language? It is the one that allows us to express ideas directly in
terms of the [domain](https://en.wikipedia.org/wiki/Domain_(software_engineering)) in the most concise
and clear way. A "domain" is a sphere of knowledge, subject area, or activity. In other words,
the ["Universe of Discourse"](https://en.wikipedia.org/wiki/Domain_of_discourse#Universe_of_discourse).
This we refer to as a [Domain Specific Language (DSL)](https://en.wikipedia.org/wiki/Domain-specific_language).
It serves not only as the "material" with which we build our software but also as the
[ubiqutous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) that we use to communicate.
Being a negotiated language between the computer, the programmer, and the domain, it can never be
[informationally perfect](https://en.wikipedia.org/wiki/Kolmogorov_complexity)
but still serves as a [tool of thought](https://www.jsoftware.com/papers/tot1.htm).

Some examples of DSLs would be a language of shapes for a graphics program (SVG), a language of
queries for a database (SQL), or a language of styles for a document (CSS). These languages are
designed to be concise and clear in their respective areas. They abstract away the incidental
complexity of the problem and allow the developer to focus on the essential complexity.

Care must be taken when choosing or creating a DSL. The language must be expressive enough
to cover the domain but not so expressive or restrictive that it becomes a burden to use. Here is an
example DSL called [HQ9+](https://cliffle.com/esoterica/hq9plus/) for generating the lyrics to the song
[99 Bottles of Beer](https://en.wikipedia.org/wiki/99_Bottles_of_Beer):

`9`

Yes, that's it, a single character which will generate the lyrics to the song. This DSL is an extreme example of
specialization but it can not be extended. When you have a closed domain like 99 Bottles of Beer, it is fine to
use a DSL like this. However, when you have an open domain where new entities may be introduced, you need a DSL
that can also be extended. This is where the choice of language becomes critical.

Another example of a poor DSL is the [Regular Expression](https://en.wikipedia.org/wiki/Regular_expression).
Regular Expressions are a powerful tool for matching patterns in text but they are also a source of
[many bugs](https://blog.codinghorror.com/regex-use-vs-regex-abuse/) due to the write-only nature of the language
as many have called it. A better alternative would be a language like Raku's [Grammars](https://docs.raku.org/language/grammars)

## The Language of the System

In most software projects, you will find that you are dealing with multiple domains. For example, in a web
application you may have a separate domain for the database, the front-end, the back-end,
deployment, and of course the business domain of the problem itself. Each of these may have their own DSLs:
SQL for the database, HTML/CSS/JavaScript for the front-end, Java/C#/Python for the back-end, Terraform for the deployment,
and potentially a DSL for the business domain itself
(ie. [Decision Model and Notation](https://en.wikipedia.org/wiki/Decision_Model_and_Notation)).

This leads to a cognitive overhead as you switch between these domains (Context Switching Cost).
There is also the issue of [impedance mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch)
between these domains when they interact with each other. You often find yourself writing code to translate between
these domains (ORMs, APIs, etc.)

Many people try to avoid this problem by using a
["General Purpose Language"](https://en.wikipedia.org/wiki/General-purpose_programming_language) (GPL) for
all domains. These are the most popular languages like Java, C#, Python, JavaScript, etc. These languages are designed
to be expressive across a wide range of domains. The trade-off here is that they are often more awkward to use
in any particular domain which leads to incidental complexity due to the additional ceremony and
[design patterns](https://en.wikipedia.org/wiki/Software_design_pattern) required to make them work effectively.

> A language is considered Low-Level if it forces you to pay attention to the irrelevant.
> <cite markdown="1">[Alan Perlis](https://en.wikipedia.org/wiki/Alan_Perlis)</cite>

> Design patterns are bug reports against your programming language.
> <cite markdown="1">[Peter Norvig](https://www.norvig.com/)</cite>

So by choosing a GPL for all domains you are trading off the cognitive overhead of coordinating multiple specialized
languages for the incidental complexity of a coarser one. The General Purpose Language, especially the most popular ones,
have a tendency to grow ever [larger and more complex](https://erights.medium.com/the-tragedy-of-the-common-lisp-why-large-languages-explode-4e83096239b9)
as they try to cover more and more domains for their users. Eventually the language becomes so large that
users start to use only small subsets of the language and the rest becomes a burden (C++, LaTex, Common Lisp, etc.).

> Moreover, at some point the elaboration of a high-level language becomes a burden that increases,
> not reduces, the intellectual task of the user who rarely uses the esoteric constructs.
> <cite markdown="1">Fred Brooks, [“No silver bullet”, 1987](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf)</cite>

> Beware of the [Turing tar-pit](https://en.wikipedia.org/wiki/Turing_tarpit) in which everything is possible but nothing of interest is easy.
> <cite markdown="1">[Alan Perlis](https://en.wikipedia.org/wiki/Alan_Perlis)</cite>

So, how can we obtain the benefits of a DSL while not having to learn a new language for each domain?
One answer (there are others) is to use a GPL which is extensible syntactically and semantically with a brevity of expression.
In other words we want to have the facilities to create our own DSLs within the GPL. This is the idea behind
[Language Oriented Programming](https://en.wikipedia.org/wiki/Language-oriented_programming) (LOP) but applied
by the individual developer rather than the language designer. We create what are called
[Internal DSLs](https://martinfowler.com/dsl.html). These are DSLs that are defined within the GPL itself.
This is in contrast to *External DSLs* which are defined in a separate language and then translated into the GPL via a parser.
Major benefits of Internal DSLs are that they are much quicker to develop and can leverage the existing tooling and features
of the host language. The downside is that they are potentially limited by the host language and can not be extended as easily
if that host language is not extensible. Another challenge is the potential for
"[mixing metaphors](https://www.masterclass.com/articles/mixed-metaphor)" in a confusing way: Is
`table` a database table or a furniture table? This introduces an interesting analogy to
[Language Games](https://en.wikipedia.org/wiki/Language_game_(philosophy)) in philosophy.

[Fluent interfaces](https://en.wikipedia.org/wiki/Fluent_interface) are a common example of a means for
creating Internal DSLs. Here is an example of a fluent interface in JavaScript for creating graphics:

```js
const graphics = GraphicsDSL.create();

graphics
  .rectangle(10, 10, 100, 50)
  .circle(50, 50, 30)
  .group()
    .rectangle(20, 20, 50, 50)
    .circle(60, 60, 20)
  .group()
    .circle(80, 80, 10)
  .render();
```

Other ways for defining Internal DSLs include but are not limited to
[macro systems](https://en.wikipedia.org/wiki/Hygienic_macro) and
[Meta-Object Protocols](https://en.wikipedia.org/wiki/Metaobject)

## Architecture

Wether you are able to utilize an optimal language or not, there are still complexities that arise as the system grows.
Don't fret, recall that the complexity of software is an essential property, not an accidental one and that
architecture dominates material.

{...TODO...}

<!-- ## Modularization -->

<!--
Separation of concerns
vs
Local reasoning (Locality of reference)
-->

<!-- Alan Kay:
We often have to be reminded about the largest and most important difference between maths and science:
 that our ideas and beliefs and reasoning about them (maths) happen strictly between our ears, and thus
 can be consistent but not at all in accord with our external situation or what we should be doing — whereas
 science is done with the knowledge that it is being thought about by our limited brains and so we need to put
 in a lot more work to draw any kind of conclusions that might have something to do with “What’s out there?”.

Einstein, in a talk in 1921, felt he had to remind his audience of physicists about this: he felt they were taking
 their mathematical conclusions far too literally about “What’s out there?”. He said to them:

“As far as the laws of mathematics refer to reality, they are not certain;
and as far as they are certain, they do not refer to reality.”

If we are able to see that what he means by the “laws of mathematics” refers to all human reasoning,
then we can see why getting fluent in maths and science is critical for general daily like (as with reading and
 writing). He is talking about the need for a special new kind of sanity for humanity: one that both allows internal
  reasoning and then requires it to be “negotiated” with the actual universe we live in (whether within our families, towns, countries, etc).

<aside>
WHat of Semiotics and the Monas Hieroglyphica where Sign, Signifier, and Signified are one?
</aside>
-->

<!--
“Good general theory does not search for the maximum generality, but for the right generality.” — Saunders Mac Lane

'Interconnectedness makes big programs eventually crumble under their own weight.' -- Simon Peyton Jones
-->

<!-- > The purpose of abstraction is not to be vague, but to create a new semantic level
> in which one can be absolutely precise.
> <cite markdown="1">[Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra)</cite> -->

<!--
A good language provides primitives, a means of combination, and a means of abstraction
that become the primitives of the next layer closer to the target domain.
Syntactic sugar gets in the way due to a lack of orthogonality.

Emergent behaviors and leaky abstractions are due to essential complexity being abstracted

Side-effects are an essential property that can't be abstracted away.

Compare with "Effects"

Tennant's Correspondence Principle: The laws of a new theory must include the laws of the old theory in
 the appropriate domain.
    https://softwareengineering.stackexchange.com/questions/116395/what-is-the-good-explanation-of-tennents-correspondence-principle

Note that in the latter case embedded DSLs (strings) are black boxes

some languages are better here like C# and it's LINQ syntax. It's extensibility
is constrained to query languages though

THus Language Oriented Programming

-->

<!--
A truly powerful language to manage complexity must have the following features:

1. A finite set of orthogonal primitives
2. A means of composition to combine primitives
3. a means of abstraction to introduce new primitives of closer to the target domain.
  3.1.
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

there is a difference between an algorithm and the expression of the algorithm in a particular language
The expression of that algorithm generally has overhead due to readability preferences ()

https://en.m.wikipedia.org/wiki/Code_refactoring
https://en.m.wikipedia.org/wiki/Decomposition_(computer_science)
https://softwareengineering.stackexchange.com/a/97695
-->

<!--

Software rot due to a lack of robustness
3rd party dependencies
https://www.johndcook.com/blog/2010/05/10/taking-your-code-for-a-walk/
https://en.m.wikipedia.org/wiki/Software_rot
https://en.m.wikipedia.org/wiki/Technical_debt
https://en.m.wikipedia.org/wiki/Software_entropy
-->

<!--
https://hackmd.io/@pierodibello/S1JvdXoKP
https://stackoverflow.com/questions/14420276/well-designed-query-commands-and-or-specifications
https://wiki.c2.com/?CodeSmell
https://hackmd.io/@pierodibello/S1JvdXoKP
-->

<!--
Orthogonality: The ability to combine any feature with any other feature in any way.

'So much complexity in software comes from trying to make one thing do two things.' -- Ryan Singer
-->

<!--
"I claim that compositionality is extremely delicate, and that it is so powerful that
 it is worth going to extreme lengths to achieve it."
 <https://julesh.com/2017/04/22/on-compositionality/>
-->

<!--
https://en.wikipedia.org/wiki/Feature-driven_development
https://en.wikipedia.org/wiki/Algorithm#Expressing_algorithms
https://twitter.com/wallingf/status/1144718612353015808
https://www.johndcook.com/blog/2012/04/23/100x-better-approach-to-software/
https://dl.acm.org/doi/10.1145/505145.505147
http://www.gkc.org.uk/martin/papers/middle-out-t.pdf
http://lambda-the-ultimate.org/node/4560
https://twitter.com/rauschma/status/1567871859122737163
https://twitter.com/FunctorFact/status/1655606046478462978
-->

## References and Additional Resources

* *[Clean architecture : a craftsman's guide to software structure and design](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)*, Robert C. Martin, 2017
* *[Is it really "Complex"? Or did we just make it "Complicated"?](https://www.youtube.com/watch?v=ubaX1Smg6pY)*, Alan Kay, June 2014
* *[No Silver Bullet—Essence and Accident in Software Engineering](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf)*, Frederick P. Brooks, Jr. 1986
* *[The Language of the System](https://www.youtube.com/watch?v=ROor6_NGIWU)*, Rich Hickey, 2012
* *[Why Systems Fail and Problems Sprout Anew; Commentary on the principles of 'Systemantics'](https://laetusinpraesens.org/docs/systfail.php)*, Anthony Judge. 1980
