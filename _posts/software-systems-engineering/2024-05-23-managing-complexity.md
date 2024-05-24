---
layout: post
icon: file-text
title:  "Managing Complexity"
date:   2024-05-23 13:00:00 -0600
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

## Fighting Gravity

Traditional architecture is discussed in terms of buildings and other physical structures.
Let us look at one of the most popular human-built structures
[The Great Pyramid of Giza](https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza):

{% include figure.html
  src="/media-library/software-systems-engineering/pyramid-of-giza.jpg"
  alt="The Great Pyramid of Giza"
  desc="Credit: [Nina Aldin Thune](https://commons.wikimedia.org/w/index.php?curid=282496)"
%}

This structure is quite imposing. Standing at 481 feet tall and having a weight of at
least 5.75 million tons, it remained the largest man-made structure for more than 3,800 years.
<sup>[[ref](https://weightofstuff.com/how-much-does-the-pyramid-of-giza-weigh/)]</sup>

Despite it being a grand monolith, can it be considered a grand architecture?
No, this is an example of what can be accomplished with perhaps the greatest of brute force methods.
It amounts to little better than a pile of rocks:

{% include figure.html
  src="/media-library/software-systems-engineering/rock-pile.png"
  alt="A pile of rocks"
  desc="Credit: [Wikipedia](https://en.wikipedia.org/wiki/Cairn)"
%}

Even so it still took more than 3,800 years until another structure could overtake it in height in the year 1092;
[The Lincoln Cathedral](https://en.wikipedia.org/wiki/Lincoln_Cathedral):

{% include figure.html
  src="/media-library/software-systems-engineering/lincoln-cathedral.jpg"
  alt="The Lincoln Cathedral"
  desc="Credit: [Wikipedia](https://en.wikipedia.org/wiki/Lincoln_Cathedral)"
%}

This cathedral stood at 525 feet and was the tallest man-made structure itself for another 238 years.
You'll notice that the form of this structure is vastly different from the that of the pyramid.
What is the fundamental difference between the two? What enabled this new scale?
The answer was not some new material but a new organization of existing ones, specifically the
[Arch](https://en.wikipedia.org/wiki/Arch):

{% include figure.html
  src="/media-library/software-systems-engineering/rock-arch.jpg"
  alt="Rock Arch"
  desc="Credit: [Wikipedia](https://en.wikipedia.org/wiki/Arch#/media/File:Arch_Balance_(cropped).jpg)"
%}

The arch enabled grander constructions with orders of magnitude less effort.
No more brute-forcing large structures. We obtained scale through organization.

> As with most media from which things are built, whether the thing is a cathedral, a bacterium, a sonnet,
> a fugue or a word processor, **architecture dominates material**. To understand clay is not to understand the pot.
> <cite markdown="1">[Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay)</cite>

<table>
  <tr>
    <td>
      {% include figure.html
        src="/media-library/software-systems-engineering/pyramid-of-giza.jpg"
        alt="The Great Pyramid of Giza"
        desc="The Great Pyramid of Giza<br>**481 ft**<br>**5,750,000 tons**<sup>[[ref](https://weightofstuff.com/how-much-does-the-pyramid-of-giza-weigh/)]</sup><br>Credit: [Nina Aldin Thune](https://commons.wikimedia.org/w/index.php?curid=282496)"
      %}
    </td>
    <td>
      {% include figure.html
        src="/media-library/software-systems-engineering/eiffel-tower.jpg"
        alt="Eiffel Tower"
        desc="The Eiffel Tower<br>**1,063 ft**<br>**8,047 tons**<sup>[[ref](https://en.wikipedia.org/wiki/Eiffel_Tower)]</sup><br>Credit: [Benh LIEU SONG](https://commons.wikimedia.org/w/index.php?curid=6926930)"
      %}
    </td>
  </tr>
</table>

Thus, the following quote becomes clear:

> "Any idiot can build a bridge that stands, but it takes an
> engineer to build a bridge that barely stands."
> <cite>- Unknown</cite>

## Fighting Complexity

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
the programmer. Computing has become practically free, but the price of programming has skyrocketed.
You, I, and most people now have a supercomputer in their pocket:

<table>
  <tr>
    <td>
      {% include figure.html
        src="/media-library/software-systems-engineering/Asci_red.jpg"
        alt="Intel ASCI Red/9152 supercomputer"
        desc="**1997** - Intel ASCI Red/9152 supercomputer: **1.338 TFLOPS**<br>By [Sandia National Laboratories](https://web.archive.org/web/19990202210213/http://www.sandia.gov/ASCI/images/RedPictures.htm)"
      %}
    </td>
    <td>
      {% include figure.html
        src="/media-library/software-systems-engineering/iPhone_13_Pro.jpg"
        alt="iPhone 13 Pro"
        desc="**2021** - iPhone 13 Pro: **1.5 TFLOPS**<br>Image Credit: [Wikipedia](https://en.wikipedia.org/wiki/IPhone_13_Pro)"
      %}
    </td>
  </tr>
</table>

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
I tackle the human organization aspect of software and how they relate. I invite you to read that before continuing here. In this article I am focusing on the non-organization aspect.

So back to the original question: What is the analogy to gravity in software and what are our "arches"?

As we develop solutions, some problems are naturally (intrinsically) harder than others; for example: adding a
list of numbers vs computing the running average of the same list. The code we write often has
extraneous details and overhead that has nothing directly to do with the problem we are trying to solve (extrinsic).

Let us compare a program that writes "Hello World" to the console in Java and JavaScript:

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

So, the complexity of our code, whether it be extrinsic or intrinsic is the "weight" that bears upon us thus complexity
is our "gravity" and what we fighting against. Our goal is then how can we get the two lines of this chart to align?

{% include figure.html
  src="/media-library/software-systems-engineering/complexity-time-loc.png"
  alt="Complexity over time chart"
  desc="Intrinsic vs Extrinsic complexity over time" %}

We cannot alter the intrinsic complexity of the problem, but we can reduce the extrinsic complexity of our solution.

> For any system, there is a certain amount of complexity that cannot be reduced
> <cite markdown="1">[Tesler's Law](https://lawsofux.com/teslers-law/)</cite>

## Anergetic Systems Failure

Before we can identify our "arches" for fighting complexity, we need to understand that complexity better.

You may have heard of the [Peter principle](https://en.wikipedia.org/wiki/Peter_principle):

> Every employee tends to rise to his level of incompetence

There is an analogous observation by [Michael Arntzenius](http://www.rntz.net/index.html) for software:

> Software grows until it exceeds our capacity to understand it.

These quotes may feel like observations of some greater general truth, but we do not need to take them as such.
How does such a situation arise? It takes effort to implement features in our software and not all those
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
when we express an algorithm, we do so in some language we find convenient.
These could be flow charts, Python, a natural language like English, or even
[artistic paintings](https://www.dangermouse.net/esoteric/piet/samples.html). Whatever we adopt as
our language of expression, we also adopt certain trade-offs. In the above "Hello World" comparison
you can identify the useful work (exergy) clearly: the logging of the "Hello World" message. You
can also identify the wasted effort (anergy) in the Java code: the ceremony around defining the
class and method. As we create ever larger systems, this incidental complexity (anergy)
grows as well until the "weight" of it makes further changes impossible. This "weight"
being the cognitive overhead and execution cost on the underlying machine. This ultimate failure
I like to call **"Anergetic Systems Failure"**, or as others have called it:
["Project Heat Death"](https://ieeexplore.ieee.org/document/4302682) as an
[analogy from cosmology](https://en.wikipedia.org/wiki/Heat_death_of_the_universe).

> Interconnectedness makes big programs eventually crumble under their own weight.
> <cite markdown="1">[Simon Peyton Jones](https://en.wikipedia.org/wiki/Simon_Peyton_Jones)</cite>

## A Semiotic Perspective

[Semiotics](https://en.wikipedia.org/wiki/Semiotics) is the study of signs and symbols and their use or interpretation.
In software, we have many signs and symbols that we use to communicate with the computer, our colleagues, and ourselves.
The relationship between a symbol and its meaning is represented by a
"[Semiotic Triangle](https://en.wikipedia.org/wiki/Triangle_of_reference)":

{% include figure.html
  src="/media-library/software-systems-engineering/semiotic-triangle.png"
  alt="Semiotic Triangle"
  desc="The Semiotic Triangle" %}

In this diagram you see a relationship between Thought, Symbol, and Referent. The Thought is the
concept/idea you are trying to express. The Symbol (Syntax) is the representation of that concept.
The Referent (meaning) is the [Thing-in-itself](https://en.wikipedia.org/wiki/Thing-in-itself)
that the concept refers to.

Complexity can be found in all three aspects of the triangle:

* **Referent Complexity**: The phenomenon we are dealing with can be inscrutable (e.g., Black Holes).
* **Thought Complexity**: Our mental model can be a poor representation (e.g., Flat Earth Theory)
* **Symbol Complexity**: The language we choose can be verbose and awkward (e.g., Arithmetic in Roman Numerals)

For each of these aspects, much can be written about how to manage complexity. Here I will focus on
Symbol Complexity as it is the most directly under our shared control.

## Measuring Complexity

To have any hope of managing complexity, we must be able to measure it otherwise we have no way to know
if we are making progress against it. There are many ways to measure complexity due to its multifaceted nature
 and which aspects of it you are interested in the most. Some
measures of complexity include:

| Complexity Measure | Perspective |
| ------------------ | ----------- |
| [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) | Control Flow Structure |
| [Halstead complexity](https://en.wikipedia.org/wiki/Halstead_complexity_measures) | Operators and Operands |
| [Henry and Kafura complexity](https://www.researchgate.net/publication/224172494_Information_flow_metrics_and_complexity_measurement) | Control and Data flow |
| [Chidamber and Kemerer Metrics](https://en.wikipedia.org/wiki/Programming_complexity#Chidamber_and_Kemerer_Metrics) | Object-Oriented Design |
| [Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity) | Algorithmic Entropy |
| [Asymptotic Complexity](https://en.wikipedia.org/wiki/Analysis_of_algorithms) | Algorithmic Efficiency |

With these measures in hand, we can manage complexity in part by reducing it. Keep in mind that
these are representations of complexity and not the complexity itself; The map is not the territory.

> "When a measure becomes a target, it ceases to be a good measure"
> <cite markdown="1">[Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart's_law)</cite>

By blindly optimizing for one measure of complexity you may inadvertently increase another. For example,
seeking the shortest code (Kolmogorov complexity) can lead to opaqueness. You can see this in the following
regex for [validating an email address](https://stackoverflow.com/a/201378/153209):

```js
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

Another example is that by Reducing Asymptotic Complexity you can increase Cyclomatic Complexity.
Compare the following two implementations for computing the [inverse square root](https://en.wikipedia.org/wiki/Fast_inverse_square_root):

<table>
  <tr>
<td markdown="1">

```js
let invSqrt = (x) => 1 / Math.sqrt(x)
```

</td>
<td markdown="1">

```js
let buffer = new ArrayBuffer(4),
    ui32 = new Uint32Array(buffer),
    f32 = new Float32Array(buffer);

let invSqrt = (n) => {
    ui32[0] = 0x5F3759DF - (ui32[0] >> 1);
    let x = f32[0] = n;
    return x * (1.5 - 0.5 * x * x * n);
}
```

</td>
  </tr>
</table>

The first implementation is clear and concise but the second may be more efficient depending on the runtime.
So, which is "better" in terms of complexity?

> "For every polynomial-time algorithm you have, there is an exponential algorithm that I would rather run"
> <cite markdown="1">[Alan Perlis](https://en.wikipedia.org/wiki/Alan_Perlis)</cite>

Since complexity is multifaceted and cannot be minimized in all aspects simultaneously, we must instead treat
its management like a [fitness landscape](https://en.wikipedia.org/wiki/Fitness_landscape)
where we are optimizing for a balance of measures. As the project, environment, goals, and systems change,
so too will the balance of complexity measures.

> Complexity cannot be removed, only shifted
> <cite markdown="1">[Waterbed Theory](https://wiki.c2.com/?WaterbedTheory)</cite>

## Language: The Material of Thought

Some believe that language is a tool, even a [tool of thought](https://www.jsoftware.com/papers/tot1.htm) and we
should use the best tool for the job. The problem with this analogy is that tools go away when a job is done,
but languages persist. A language is [not a tool but a material](https://schneide.blog/2009/12/21/the-fallacy-of-the-right-tool/)
with which we build our software and as a consequence, it has a direct impact on the complexity of our work.

### The Language of The Domain

What is the right language? It is the one that allows us to express ideas directly in
terms of the [domain](https://en.wikipedia.org/wiki/Domain_(software_engineering)) in the most concise
and clear way. A "domain" is a sphere of knowledge, subject area, or activity. In other words,
the ["Universe of Discourse"](https://en.wikipedia.org/wiki/Domain_of_discourse#Universe_of_discourse).
This we refer to as a [Domain Specific Language (DSL)](https://en.wikipedia.org/wiki/Domain-specific_language).
It serves not only as the "material" with which we build our software but also as the
[ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) that we use to communicate.
Being a negotiated language between the computer, the programmer, and the domain, it can never be
[informationally perfect](https://en.wikipedia.org/wiki/Kolmogorov_complexity)
but still serves as an optimal compromise.

Some examples of DSLs would be a language of shapes for a graphics program (SVG), a language of
queries for a database (SQL), or a language of styles for a document (CSS). These languages are
designed to be concise and clear in their respective areas. They abstract away the incidental
complexity of the problem and allow the developer to focus on the essential complexity.

Care must be taken when choosing or creating a DSL. The language must be expressive enough
to cover the domain but not so expressive or restrictive that it becomes a burden to use. Here is an
example DSL called [HQ9+](https://cliffle.com/esoterica/hq9plus/) for generating the lyrics to the song
[99 Bottles of Beer](https://en.wikipedia.org/wiki/99_Bottles_of_Beer):

`9`

Yes, that is it, a single character which will generate the lyrics to the song. This DSL is an extreme example of
specialization but it cannot be extended. When you have a closed domain like 99 Bottles of Beer, it is fine to
use a DSL like this. However, when you have an open domain where new entities may be introduced, you need a DSL
that can also be extended. This is where the choice of language becomes critical.

Another example of a poor DSL is the [Regular Expression](https://en.wikipedia.org/wiki/Regular_expression).
Regular Expressions are a powerful tool for matching patterns in text but they are also a source of
[many bugs](https://blog.codinghorror.com/regex-use-vs-regex-abuse/) due to the write-only nature of the language
as many have called it. A better alternative would be a language like Raku's [Grammars](https://docs.raku.org/language/grammars)

<table>
<summary>Regex vs Raku Grammar for matching an email address:</summary>
<tr>
<td markdown="1">

```perl
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

</td>
<td markdown="1">

```perl
grammar EmailGrammar {
    token TOP {
        ^ <local-part> '@' <domain> $
    }

    token local-part {
        <[a..z A..Z 0..9 ._%+-]>+
    }

    token domain {
        <subdomain>+ % '.'
    }

    token subdomain {
        <[a..z A..Z 0..9 -]>+
    }
}
```

</td>
</tr>
</table>

The Raku Grammar is more verbose but it is also more readable and maintainable. It is also extensible
whereas the Regex is not.

A good language in general is one that consists of primitives that are
[orthogonal](https://en.wikipedia.org/wiki/Orthogonality#Computer_science),
a means of combination, and a means of abstraction. The primitives are the building blocks of the language
and should be as simple as possible. The means of combination allows you to build more complex structures
from the primitives, and the means of abstraction allows you to create new primitives from existing ones.

> The purpose of abstraction is not to be vague, but to create a new semantic level
> in which one can be absolutely precise.
> <cite markdown="1">[Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra)</cite>

With the concepts and language of the domain in hand, a paradigm emerges. With a language of shapes, you
develop a shape-oriented paradigm. With a language of queries, you develop a query-oriented one, and so on.

> "A well-designed program uses the right concepts, and the paradigm follows from the
> concepts that are used. [Paradigms are epiphenomena]"
> <cite markdown="1">[Peter Van Roy](http://lambda-the-ultimate.org/node/4698)</cite>

Depending on the domain you are trying to model, you may find that it is still difficult to express in the
language you are using. This may be due to the language not being expressive enough or the concepts
not being well understood. You'll see this manifest as a proliferation of
[design patterns](https://en.wikipedia.org/wiki/Software_design_pattern). These patterns emerge when
the paradigm does not match the domain. They may not be obvious patterns but you'll
["smell"](https://wiki.c2.com/?CodeSmell) them and feel that something is off;
Leaky abstractions, emergent behaviors, boilerplate code, redundancy, invisible/implicit dependencies,
and other aspects of the code that that cannot be eliminated by
[refactoring](https://en.wikipedia.org/wiki/Code_refactoring).

> Design patterns are bug reports against your programming language.
> <cite markdown="1">[Peter Norvig](https://www.norvig.com/)</cite>

> "The limits of my language mean the limits of my world."
> <cite markdown="1">[Ludwig Wittgenstein](https://en.wikipedia.org/wiki/Ludwig_Wittgenstein)</cite>

As Alan Kay has said: `Perspective is worth 80 IQ points`. By changing the perspective of the problem
you can often find a better language to express it in and potentially eliminate the design patterns
that have emerged. Instead of thinking in terms of shapes and groups, thinking in terms of
objects and messages may be more appropriate. Instead of thinking in terms of queries and results,
thinking in terms of transformations and rules may be more appropriate, and so on.

An example is the Fibonacci sequence:

```js
let fib = (n) => n < 2 ? n : fib(n - 1) + fib(n - 2);
```

The above is a straightforward, but naive implementation that requires an exponential amount of time
and space to produce a result (specifically, [O(φ)](https://en.wikipedia.org/wiki/Golden_ratio) which is in `O(n2)`).
This can be improved significantly by utilizing [iteration](https://en.wikipedia.org/wiki/Iteration#Mathematics):

```js
const fib = n => {
    const f = (n0, n1, step) => step === n ? n1 : f(n1, n0 + n1, step + 1);
    return f(0, 1, 1);
};
```

This implementation is linear in time (`O(n)`) and constant in space (`O(1)`). But a new design pattern has emerged
of using a recursive function with an inner function for the purpose of iteration. We could abstract this pattern
into an `iterate` function, or we could change our perspective and think of it in terms of a
[Closed-Form Expression](https://en.wikipedia.org/wiki/Fibonacci_sequence#Closed-form_expression)
which not only eliminates the pattern, but runs in constant time and space (`O(1)`):

```js
// Binet's Formula
function fib(n) {
    const sqrt5 = 5 ** 0.5,
       phi = (1 + sqrt5) / 2,
       psi = (1 - sqrt5) / 2;

    return Math.round((phi**n - psi**n) / sqrt5);
}
```

Changing perspective can be particularly challenging as it requires a shift in thinking, but it can also be very rewarding
if you can find the right perspective for the problem you are trying to solve.

### The Language of the System

In most software projects, you will find that you are dealing with multiple domains. For example, in a web
application you may have a separate domain for the database, the front-end, the back-end,
deployment, and of course the business domain of the problem itself. Each of these may have their own DSLs:
SQL for the database, HTML/CSS/JavaScript for the front-end, Java/C#/Python for the back-end, Terraform for the deployment,
and potentially a DSL for the business domain itself
(i.e. [Decision Model and Notation](https://en.wikipedia.org/wiki/Decision_Model_and_Notation)).

This leads to a cognitive overhead as you switch between these domains
([Context Switching Cost](https://en.wikipedia.org/wiki/Task_switching_(psychology))).
There is also the issue of [impedance mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch)
between these domains when they interact with each other. You often find yourself writing code to translate between
them (ORMs, APIs, etc.)

Many people try to avoid this problem by using a
["General Purpose Language"](https://en.wikipedia.org/wiki/General-purpose_programming_language) (GPL) for
all domains. These are the most popular languages like Java, C#, Python, JavaScript, etc. These languages are designed
to be expressive across a wide range of domains. The trade-off here is that they are often more awkward to use
in any particular domain which leads to incidental complexity due to the additional ceremony and
[design patterns](https://en.wikipedia.org/wiki/Software_design_pattern) required to make them work effectively.

> A language is considered Low-Level if it forces you to pay attention to the irrelevant.
> <cite markdown="1">[Alan Perlis](https://en.wikipedia.org/wiki/Alan_Perlis)</cite>

So by choosing a GPL for all domains you are trading off the cognitive overhead of coordinating multiple specialized
languages for the incidental complexity of a coarser one. Ex: Everything is an object in
[Self](https://bibliography.selflanguage.org/self-power.html),
everything is a function in [Joy](https://hypercubed.github.io/joy/html/j00rat.html),
everything is a file in [Unix](https://en.wikipedia.org/wiki/Everything_is_a_file), etc.

The General Purpose Language, especially the most popular ones,
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
This contrasts with *External DSLs* which are defined in a separate language and then translated into the GPL via a parser.
Major benefits of Internal DSLs are that they are much quicker to develop and can leverage the existing tooling and features
of the host language. The downside is that they are potentially limited by the host language and cannot be extended as easily
if that host language is not extensible. Another challenge is the potential for
"[mixing metaphors](https://www.masterclass.com/articles/mixed-metaphor)" in a confusing way: is
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

Regardless of the quality of your building material (language), as the scale of your system grows,
architecture dominates, so we turn to the question: What is "Architecture"?
Software architecture is the organization of code into a structure that exhibits
[emergent properties](https://en.wikipedia.org/wiki/Emergence). These properties can be both
expected and unexpected. When expected, they are aimed towards the goals of the system. When unexpected,
they are the bugs and performance issues that plague them. In other words, when the system is more
than the sum of its parts it is the product of its interactions. The goal of architecture is to control
these emergent properties to while keeping the system functional and maintainable. When the properties are
not explicit in the code, then the system cannot be understood in terms of its parts. This is why many
systems fail ([Systemantics](https://laetusinpraesens.org/docs/systfail.php)).

If you view architecture through the lens of language itself:
primitives, means of combinations, and means of abstraction, then you can see that many familiar
architectural patterns and practices can be categorized:

* Primitives
  * Entities
  * Use Cases/Interactors
  * Controllers/Presenters
  * Gateways/Repositories
  * etc.
* Means of Combinations
  * Layering
  * Dependency Inversion
  * Adapters
  * etc.
* Means of Abstraction
  * Modules
  * Interfaces and Abstract Classes
  * Domain Events
  * Factories
  * Specifications
  * etc.

The list is far from exhaustive and the placement of some items may be debatable
but it gives an idea of how architecture can be viewed as a form of Domain Specific
Language organizing sub-languages in each subdomain. Like any language, it can be expressive or awkward, clear or opaque, concise or verbose.
Architectural design patterns, like design patterns discussed earlier, are bug reports against the language of the system.
There are architectural smells just as there are code smells.

When done well, and with the right perspective, you can identify many terrible smells in systems and the consequences
that are suffered as a result (a [Big Ball of Mud](https://wiki.c2.com/?BigBallOfMud)). A ubiquitous example:

> An operating system is a collection of things that do not fit into a
> language; there shouldn't be one.
> <cite markdown="1">[Dan Ingalls](https://en.wikipedia.org/wiki/Dan_Ingalls)</cite>

When considering the architecture of a system, two perspectives must be taken into account: the *Domain* and the *Use Cases*.
The domain and its language are the foundation of the system that both limits what is possible and guides what is necessary.
The use cases are the interactions with the system and the reason for its existence. The architecture must balance these
two perspectives to be effective. This is why [Domain Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
and [Clean Architecture](https://crosp.net/blog/software-architecture/clean-architecture-part-2-the-clean-architecture/)
were evolved respectively.

<figure>
  <img src="/media-library/software-systems-engineering/clean-architecture.png" alt="Clean Architecture">
  <figcaption markdown="1">
Clean Architecture by [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin)
  </figcaption>
</figure>

<figure>
  <img src="/media-library/software-systems-engineering/bounded-context.png" alt="Bounded Context">
  <figcaption markdown="1">
DDD - Bounded Context by [Martin Fowler](https://martinfowler.com/bliki/BoundedContext.html)
  </figcaption>
</figure>

Recall above in [The Language Of The System](#the-language-of-the-system), that each subdomain
can have its own DSL. From the Clean Architecture diagram above, you can how these subdomains
could be organized with the outermost layer being the most specialized and infrastructure
specific, and the innermost layer being the most general and idealized.

These two perspectives of Use-Case driven and Domain-Driven are not in opposition but in a dialectical
relationship. They can be synthesized in a [Feature Driven Development](https://en.wikipedia.org/wiki/Feature-driven_development)
approach where each "feature" satisfies one or more use cases in the domain and is organized in a layered architecture that
realizes it.

The above is not attempting to be a comprehensive guide to architecture nor prescriptive. There are many
architectural styles and patterns just as there are many languages. The goal is to provide a perspective
on how to view architecture as a language and how to manage complexity in software by choosing or designing
the right language for the job.

## Summary

In summary, the analogy to gravity in software is complexity and the analogy to material is language.
The architecture we build is the organization of that "material" into a structure that exhibits
the emergent properties we desire. By choosing or designing the right language we can reduce the incidental
complexity of our solutions. By choosing and utilizing the right architecture we can control
and guide the emergent properties of our systems at scales that are more than the sum of their parts and
ultimately avoid the "Anergetic Systems Failure" that plagues so many projects.

## References and Additional Reading

* *[Clean architecture : a craftsman's guide to software structure and design](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)*, Robert C. Martin, 2017
* *[Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215/ref=sr_1_1)*, Eric Evans, 2003
* *[Is it really "Complex"? Or did we just make it "Complicated"?](https://www.youtube.com/watch?v=ubaX1Smg6pY)*, Alan Kay, June 2014
* *[No Silver Bullet—Essence and Accident in Software Engineering](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf)*, Frederick P. Brooks, Jr. 1986
* *[The Language of the System](https://www.youtube.com/watch?v=ROor6_NGIWU)*, Rich Hickey, 2012
* *[Why Systems Fail and Problems Sprout Anew; Commentary on the principles of 'Systemantics'](https://laetusinpraesens.org/docs/systfail.php)*, Anthony Judge. 1980
* *[Essential Programming Paradigm](https://web.archive.org/web/20190216082110/https://static.aminer.org/pdf/20170130/pdfs/oopsla/cnshkwto187qwld3fsuibjzvuapkrlpt.pdf)*, Claude Y. Knaus, 2008
* *[Programming Paradigms for Dummies: What Every Programmer Should Know](https://webperso.info.ucl.ac.be/~pvr/VanRoyChapter.pdf)*, Peter Van Roy, 2009
* *[Erik Meijer started a discussion on Domain Specific Languages](http://lambda-the-ultimate.org/node/4560)*, Lambda The Ultimate, 2012
* *[On compositionality](https://julesh.com/2017/04/22/on-compositionality/)*, Jules Hedges, 2017
* *[The operating system: should there be one?](https://www.humprog.org/~stephen/research/papers/kell13operating.pdf)*, Stephen Kell, 2013
