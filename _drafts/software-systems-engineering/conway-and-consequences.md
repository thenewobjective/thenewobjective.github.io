---
layout: post
icon: file-text
title:  "Conway And Consequences"
date:   2021-10-17 12:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/conway-and-consequences
commentThreadId: -1
---

* TOC
{:toc}

## Introduction

Over time as you become more experienced in the implementation of solutions and the processes that support them, you might notice that it becomes
progressively harder to enact changes as more ambitious endeavors are pursued. These challenges often are not due to the intrinsic difficulty of the tasks
at hand but the operational constraints that surround them. Sometimes you can't change a product unless you change the people; and dually sometimes you can't
reorganize a team or company if the tools won't support it. This phenomenon has been known for decades and has been summarized most famously with
Melvin Conway's <abbr title="A traditional saying that embodies common knowledge">adage</abbr>: ["Conway's Law"](https://en.wikipedia.org/wiki/Conway%27s_law).
In order to be effective in creating solutions you have to be able to engage across levels of the organization: Tactical, Operational, Strategic, and beyond.

## The Law

Conway's Law is often expressed as:

> Any organization that designs a system (defined broadly) will produce a design
> whose structure is a copy of the organization's communication structure.
> <cite><a href="https://en.wikipedia.org/wiki/Melvin_Conway" target="_blank">Melvin E. Conway</a></cite>

More simply as:

> The structure of any system designed by an organization is isomorphic to the structure of the organization.
> <cite><a href="https://en.wikipedia.org/wiki/Edward_Yourdon" target="_blank">Yourdon, Edward</a>; <a href="https://en.wikipedia.org/wiki/Larry_Constantine" target="_blank">Constantine, Larry L.</a></cite>

In Software Engineering:

> Your code reflects your organization

There are many examples of this you could uncover with a little thought towards the products you use. A personal example is how my bank's website is organized.
When I login to the dashboard I can see the balance of all of my accounts in one place, but to perform actions against my retirement account I am redirected to another website with a different theme and
structure organized around retirement and investments specifically. This new dashboard is complete with features redundant with the original dashboard I was just using.
As you might imagine this is due to the bank having different teams focused on different aspects of banking. This is irrelevant to me as an end user, but the bank
practically delivered to me their company's organization chart along with the product itself.

## The Inverse

If we accept that an organization is reflected in the products it creates then we should consider that the converse might also be true.
In other words the system you're using can pressure your organization to adapt as that might be easier than
changing the system itself. This tendency has been noticed by others:

> But Systems and people are related in another, subtler way. A <em>selective process</em> goes on,
> whereby Systems attract and keep those people whose attributes are such as to adapt them to life
> in that System.
> <cite><a href="https://en.wikipedia.org/wiki/Systemantics" target="_blank">Gall, John. Systemantics</a>. Chapter 10</cite>

> Men have become the tools of their tools
> <cite><a href="https://en.wikiquote.org/wiki/Walden" target="_blank">Walden</a> by <a href="https://en.wikiquote.org/wiki/Henry_David_Thoreau" target="_blank">Henry David Thoreau</a></cite>

> It is easier to change the specification to fit the program than vice versa
> <cite><a href="http://www.cs.yale.edu/homes/perlis-alan/quotes.html" target="_blank">Perlisism #57</a> by <a href="https://en.wikipedia.org/wiki/Alan_Perlis" target="_blank">Alan Perlis</a></cite>

Over time this adaptation can become permanent; a cage built into the essence of the organization.

Have you asked yourself why a company has a certain process that clearly seems ridiculous even when they should know better?
There is good chance that a [sunk cost](https://www.wired.com/2015/02/air-traffic-control/) is to blame.

Many times when I've worked with larger clients I notice they have multiple departments and individuals whose only job
is facilitate challenges in one or more systems being used and catch things that fall through the cracks.

How many organizations are using Excel spreadsheets for something it was not intended for? How many have subsequently become so reliant upon
this for their work and their paycheck that it would be catastrophic if the underlying original problem was fixed? We can see a clear example
of this in the field of Genetics. Last year (2020) a number of human genes were renamed to stop Microsoft Excel from
[misinterpreting them as dates](https://www.theverge.com/2020/8/6/21355674/human-genes-rename-microsoft-excel-misreading-dates).

Microsoft Excel [wasn't the problem](https://support.microsoft.com/en-us/office/format-numbers-as-text-583160db-936b-4e52-bdff-6f1863518ba4)
here nor were the tens of thousands of gene names; clearly it's the organization's processes that put them into that situation.

## The Source of Many Ills

Failing to recognize the forces and relationships between products and the organizations that create and use them lead to more problems than
you might expect. Microsoft [performed a study](https://augustl.com/blog/2019/best_bug_predictor_is_organizational_complexity/) to determine
the top predictor of bugs in a codebase and discovered that the organization structure was the #1 offender by far.

<!--
While having more hard data is excellent, there are common sense reasons to see why this is the case as well

https://twitter.com/Carnage4Life/status/1207411078658842624
https://www.microsoft.com/en-us/research/blog/exploding-software-engineering-myths/
-->

<!--
Thus you can conclude that the organization is part of The System and with that knowledge we can begin to evaluate how
"DevOps" has come into being. Not so much as a choice, but as a consequence of an evolving system.
-->

## Communication & Control

<!--
The Mythical Man Month

Combinatorial communication growth
-->



## Scrum

## Feature Flags vs Feature Branches

<!--
Choosing a Branching Strategy. If you don't , you're going to deal with Conway's law anyway. Might as well make it explicit.
https://featureflags.io/feature-flags-vs-branching/
https://stackoverflow.com/questions/19434222/feature-toggles-vs-feature-branches
-->

## A Road to Maturity

<!--
How can you be successful at application modernization in light of Conway's Law?

If your implementation reflects the organization of your company, are you not constrained? 

If my company was a matrix organization and all teams are siloed, then application 
modernization would require company modernization would it not? So are successful 
Application Modernization engagements always strategic engagements? Can you be successful 
in a more constrained manner?

-->

## Summary

<!--
Thus to be more impactful, one should strive to engage above the 
tactical level of implementation end instead work to effect change 
at the Operational or Strategic level for a business. 
-->

## Further Reading

* [Systemantics. The Systems Bible](https://www.amazon.com/SYSTEMANTICS-SYSTEMS-BIBLE-John-Gall-ebook/dp/B00AK1BIDM) by John Gall
* [The Mythical Man-Month](https://www.amazon.com/Mythical-Man-Month-Anniversary-Software-Engineering-ebook/dp/B00B8USS14) by Frederick P. Brooks Jr.
