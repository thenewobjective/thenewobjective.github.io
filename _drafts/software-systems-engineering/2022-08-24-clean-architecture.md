---
layout: post
icon: file-text
title:  "Clean Architecture"
date:   2022-08-24 13:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/clean-architecture
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
structure for more than 3,800+ years with a weight of at least
5.75 million tons.
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

Thus the following unattributed quote becomes clear:

> "Any idiot can build a bridge that stands, but it takes an
> engineer to build a bridge that barely stands."
> <cite>- Unknown</cite>

### Fighting Complexity

In traditional architecture the primary enemy is gravity. The Archway is an effective tool that
fights against it. The question we have now is: what is the analogous enemy in Software and what is
the "Arch" in Software Architecture?

In the early days of Software Engineering there was a major concern. It was referred to as
[The Software Crisis](https://en.wikipedia.org/wiki/Software_crisis). This crisis can be
summarized by a quote from [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra):

> “The major cause of the software crisis is that the machines have become several orders of magnitude more
> powerful! To put it quite bluntly: as long as there were no machines, programming was no problem at all;
> when we had a few weak computers, programming became a mild problem, and now we have gigantic computers,
> programming has become an equally gigantic problem.”
> <cite markdown="1">[Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra)</cite>

There was a point where the computer was the most expensive part of a project. Now it is by far
the programmer. This isn't simply because computing has become practically free, but also that
the programmers have become far more expensive. You, I, and most people now have a supercomputer
in their pocket. Let's compare:

* **1997** - Intel ASCI Red/9152 supercomputer: **1.338 TFLOPS**
* **2021** - IPhone 13 Pro: **1.5 TFLOPS**

So why do most software projects fail? The failure rates,
[depending on the study](https://www.zdnet.com/article/study-68-percent-of-it-projects-fail/),
range from 50% to 80% or more.

There are many presentations and discussions 

<!--
[Gerald Sussman](https://en.wikipedia.org/wiki/Gerald_Jay_Sussman)
explained in his [presentation](https://www.infoq.com/presentations/We-Really-Dont-Know-How-To-Compute/)
at least partly that:
<q cite="https://www.infoq.com/presentations/We-Really-Dont-Know-How-To-Compute/">
    We Really Don't Know How To Compute!
</q>

Which is quite convincing but is thinking of the future of programming. To tackle the problems 
of today, Alan Kay expresses it better: Is it Complex or did we make it complicated?
-->

<!--
Clean Architecture implies Code First instead of DB first development?
	(Entity Framework)
-->

<!-- 
Monolith by architecture, or monolith by infrastructure?
https://twitter.com/alexcwatt/status/1544876135711916035

https://medium.com/qe-unit/airbnbs-microservices-architecture-journey-to-quality-engineering-d5a490e6ba4f
-->