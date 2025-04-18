---
layout: post
icon: file-text
title:  "Clean Architecture"
date:   2022-03-13 8:00:00 -0600
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

![The Great Pyramid of Giza](/media-library/software-systems-engineering/pyramid-of-giza.jpg "Credit: [Nina Aldin Thune](https://commons.wikimedia.org/w/index.php?curid=282496)")

This structure is quite imposing. Standing at 481 feet tall it remained the tallest man-made
structure for more than 3,800+ years with a weight of at least
5.75 million tons.
<sup>[[ref](https://weightofstuff.com/how-much-does-the-pyramid-of-giza-weigh/)]</sup>
Is this considered a grand architecture? No, this is a monument to brute force.
It is little better than a pile of rocks:

![A pile of rocks](/media-library/software-systems-engineering/rock-pile.png "Credit: [Wikipedia](https://en.wikipedia.org/wiki/Cairn)")

Even so we have to wait 3,800+ years until another structure could overtake it in the year 1092;
[The Lincoln Cathedral](https://en.wikipedia.org/wiki/Lincoln_Cathedral):

![The Lincoln Cathedral](/media-library/software-systems-engineering/lincoln-cathedral.jpg "Credit: [Wikipedia](https://en.wikipedia.org/wiki/Lincoln_Cathedral)")

This cathedral stood at 525 feet tall and became the tallest man-made structure for the next 238 years.
You'll notice that the form of this structure is vastly different from the that of the pyramid.
What is the fundamental difference between the two? What enabled this new scale? The answer is the discovery of the
[Arch](https://en.wikipedia.org/wiki/Arch):

![Rock Arch](/media-library/software-systems-engineering/rock-arch.jpg "Credit: [Wikipedia](https://en.wikipedia.org/wiki/Arch#/media/File:Arch_Balance_(cropped).jpg)")

This discovery enabled grander constructions with orders of magnitude less effort.
No more brute-force monuments, we obtain scale through a more powerful organization
of the same materials. Let's compare:

<table>
  <tbody>
    <tr>
        <td>
<figure>
    <img src="/media-library/software-systems-engineering/pyramid-of-giza.jpg" alt="The Great Pyramid of Giza">
<figcaption>

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
<figcaption>

The Eiffel Tower<br>
**1,063 ft**<br>
**8,047 tons**<sup>[[ref](https://en.wikipedia.org/wiki/Eiffel_Tower)]</sup><br>
Credit: [Benh LIEU SONG](https://commons.wikimedia.org/w/index.php?curid=6926930)

</figcaption>
</figure>
        </td>
    </tr>
    </tbody>
</table>

Thus the following unattributed quote becomes clear:

> "Any idiot can build a bridge that stands, but it takes an
> engineer to build a bridge that barely stands."

&mdash; Unknown

### Fighting Complexity

When architecting buildings the primary enemy is gravity. The Arch is an effective pattern that
fights against it. The question we have now is: what is the analogous enemy in Software Engineering
and what is the "Arch" in Software Architecture?

In the early days of Software Engineering there was a major concern. It was referred to as
[The Software Crisis](https://en.wikipedia.org/wiki/Software_crisis). This crisis can be
summarized by a quote from [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra):

> “The major cause of the software crisis is that the machines have become several orders of magnitude more
> powerful! To put it quite bluntly: as long as there were no machines, programming was no problem at all;
> when we had a few weak computers, programming became a mild problem, and now we have gigantic computers,
> programming has become an equally gigantic problem.”

&mdash; [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_Dijkstra)

There was a point at which the computer was the most expensive part of a project. Now it is by far
the programmer. Computing has become practically free, but the programmers have become far more expensive.
You, I, and most people now have a supercomputer in their pocket:

* **1997** - [Intel ASCI Red/9152 supercomputer](https://en.wikipedia.org/wiki/ASCI_Red): **1.338 TFLOPS**
* **2021** - [IPhone 13 Pro](https://en.wikipedia.org/wiki/IPhone_13_Pro): **1.5 TFLOPS**

So why do most software projects fail? The failure rates,
[depending on the study](https://www.zdnet.com/article/study-68-percent-of-it-projects-fail/),
range from 50% to 80% or more.

<!--
 Link to microsoft study and my previous blog post. Code complexity remains even after
 the organization complexity is resolved
-->

<!--

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
