---
layout: post
icon: file-text
title:  "Leaky Abstractions Are Just Bad Abstractions"
date:   2019-01-15 12:00:00 -0600
category: Requirements Engineering
permalink: /requirements-engineering/leaky-abstractions-are-just-bad-abstractions
redirect_from:
    - /leaky-abstractions-are-just-bad-abstractions/
---

## Introduction

In 2002 Joel Spolsky [argued](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) that **“All non-trivial abstractions, to some degree, are leaky”**.  As a result, there have been numerous programmers who have used this as an excuse to throw away numerous abstractions in favor of lower-level alternatives. The original argument though is a [straw man](https://en.wikipedia.org/wiki/Straw_man) and the perpetuation of it is actively harmful to the industry.

## The Straw Men Cometh

Joel’s examples and the numerous other examples I’ve seen subsequently by proponents all fall into the same categorical error, namely: ascribing an expectation or requirement on an abstraction or model that was never there to begin with. To counter some of the specific claims:

1. TCP never specified that it would guarantee successful delivery of all data in all situations, nor did it guarantee a speed for delivery. It is very clear in what it means with the terms “reliable” as well as the rules about when and how a 0. connection will timeout and be closed: <https://tools.ietf.org/html/std7#section-2.6> . Oversimplifying this by assuming guaranteed transmission and speed is simply incorrect. Recall [L Peter Deutsch's](https://en.wikipedia.org/wiki/L._Peter_Deutsch) [Fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing):
    * The network is reliable;
    * Latency is zero;
    * Bandwidth is infinite;
    * The network is secure;
    * Topology doesn't change;
    * There is one administrator;
    * Transport cost is zero;
    * The network is homogeneous.

2. Iteration strategy over a two-dimensional array + Page Faults: There is no programming language in common use today that makes a guarantee about such iteration performance. Assuming one is not the fault of the language that didn’t specify one. The abstractions did not fail nor leak in these cases either.
3. Complaints about SQL performance: Again, the same problem as #2. Running two semantically equivalent queries will give you the same result, but there was no performance guarantee. Assuming one is again not the fault of the abstraction but with the expectation
4. And so on and so on...

## Expectations Meet Reality

Expectations of reality and reality itself are two different things. If an abstraction does not explicitly make claims about some aspect of interest it does not mean that it has leaked or failed, it’s simply the wrong one for what you’re concerned with. Build a better abstraction or use one which claims to fulfill your requirements (and can demonstrate it).

## The Appropriate Abstraction

> The purpose of abstraction is not to be vague,
> but to create a new semantic level in which one can be absolutely precise
> <cite><a href="https://en.wikipedia.org/wiki/Edsger_W._Dijkstra" target="_blank">Edsger Dijkstra</a></cite>

The goal is to hide unnecessary details allowing one to focus on those relevant to your [domain](https://en.wikipedia.org/wiki/Domain_of_discourse). If you create an abstraction that excludes a necessary detail then you've created a "leaky abstraction" in the spirit of what Spolsky claims (even though his examples are debatable).

An example of the right level of abstraction can be thought of by analogy with a geographic map.
A map is an abstraction of the territory it represents. If the physical map of the United States was the same
size as the country it would be practically useless. We scale these maps down to human size and as a result we
necessarily leave out details. Scaling alone can still leave an excessive amount of information though.
If one wished to navigate roads they don't care about all of the details between those roads. Keeping that information
would be distracting and make it more time consuming to identify more relevant information, so this is discarded as well.
If something interacts with the roads (like railroad crossings), then these may also be included in whole or in part where
they intersect. What you're looking for in a geographic map is an optimal level of utility and simplicity.

<!--

Rename post to: On Abstraction and Architecture

---

Zero Cost Abstractions

---

Don't confuse Declarative with Abstract
procedural code can be abstracted

-----
If we turn our attention to programming and programming languages, how do we obtain the right level of abstraction?
From [SICP](https://web.mit.edu/alexmv/6.037/sicp.pdf) we learn that a language consists of primitives, a means of combination, and a means of abstraction....
---

## Tennant's Correspondence Principle

Abstraction is done properly if it follows Tennant's Correspondence Principle.

The enables a higher level language to treat it as a new primitive
    From SICP: A language consists of Primitives, a Means of Combination, and a Means of Abstraction

Example in Lambda Calculus

Example in a Datastructure. Perhaps a Stack with an array implementation?

- <http://techscursion.com/2012/02/tennent-correspondence-principle.html>
- <https://softwareengineering.stackexchange.com/questions/116395/what-is-the-good-explanation-of-tennents-correspondence-principle>
- <https://gafter.blogspot.com/2006/08/tennents-correspondence-principle-and.html>
- <https://fanf.livejournal.com/118421.html>
- <https://esdiscuss.org/topic/tcp>
- <https://esdiscuss.org/topic/regarding-tennent-s-language-design-based-on-semantic-principles#content-0>

## Orthogonality

- Is there a way to measure and visibly represent the orthogonality of features in a language?
- Good primitives are defined by being orthogonal
  - But if bad primitives are given can you fix them for the next layer of abstraction?
    - Does this fixing violate TCP?
- Differing semantics demand different syntax
- Orthogonal semantics <>=> orthogonal syntax.
- <https://en.wikipedia.org/wiki/Orthogonality#Computer_science>

## Duality

## Concatenative Languages

Are concatenative languages an over-abstraction?

----

Alan Kay

Emergent Property can be another name for "Architecture"
an organization of matter or energy into a structure that ...
Emergent Behavior is architecture
  - What is non-emergent behavior then?

While your thoughts and beliefs are globally inconsistent,
you'll have consistent subsystems
---
Syntax should be suggestive, enable abstraction
Migration from Binary to Hex for readability
roman numerals & tally marks vs multiplication

Systems
- Emergent Properties
- Intentional Properties 

----
A language is defined by primitives, means of combination, and a means of abstraction.

idioms in the language are expressions that occur repeatedly in multiple contexts.
	- these idioms are candidates for being abstracted to form a new idiom at a 
	higher level language of discourse where they are a new primitive
- Tennant's Correspondance Principle applies here.

----
"Architecture is a vertical abstraction on implementation" --Roy Fielding et al.

-->