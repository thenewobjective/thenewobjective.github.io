---
layout: post
icon: file-text
title:  "Conway and Consequences"
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

> ...the organization chart will initially reflect the first system design, which is surely not the right one.
> If the system design is to be free to change, the organization must be prepared to change.
> <cite>Frederick P. Brooks Jr., The Mythical Man-Month: Essays on Software Engineering</cite>

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
here nor were the tens of thousands of gene names. Clearly it's the organizations' processes that put them into that situation.

## The Ills

Failing to recognize the forces and relationships between products and the organizations that create and use them lead to more problems than
you might expect. Microsoft [performed a study](https://augustl.com/blog/2019/best_bug_predictor_is_organizational_complexity/) to determine
the top predictor of bugs in a codebase and discovered that the organization structure was the #1 offender by far.

There is now cognitive dissonance in the mind of a Software Engineer. One one hand the above study makes sense in light of
our knowledge of Conway's Law since the latte 1960s and yet, what is true of every bug discovered in a production system?

1. The type system didn't prevent it
2. The unit tests didn't catch it

Traditionally speaking: the product is by definition production ready and yet clearly broken. What is to be done?

Are our tools insufficient for identifying organization dysfunction? Can we change the way we work to improve the things we produce?

## Communication Structure

While this blog article isn't intended to cure all of your ills some improvements and techniques can be discussed.
We'll focus on a project and its team for exploring improvements. The reason is simple: The project is the join point between an
organization and the artifacts it produces.

If a product tends to reflect the organization's communication structure (project team in this case),
then it should seem clear that improvements in that structure would also reflect positively in the product created.
So what would such an improvement look like? You might think that more open and free communication would be the way to go.
Anyone on a project to talk to anyone else and vice-versa. The reality though is that this does not scale and can lead to quagmires. This can be demonstrated with simple Graph Theory:

<figure>
    <img src="/media-library/software-systems-engineering/complete-graph.png" alt="Complete Graph">
    <figcaption>Complete Graph. Credit: <a href="https://en.wikipedia.org/wiki/Complete_graph" target="_blank">Wikipedia</a></figcaption>
</figure>

As the number of people are added to your project or organization the number of lines of communication grow combinatorially. Four people on a team have `six` lines of communication but by adding only two more people more than doubles the lines of communication to `fifteen`!

With the above you can now understand where Brooks's Law applies:

> "...adding manpower to a late software project makes it later"
> <cite>Fred Brooks</cite>

If the truth of a project or an organization exists only in the minds of the its members then getting someone up
to speed is a daunting task if all other members have to be informed and must inform this new addition. In such an organization
you have to also be concerned about the [Bus Factor](https://en.wikipedia.org/wiki/Bus_factor). How many people can you lose and
still be able to fulfill your goals? This we mitigate with cross-training and writing things down. But writing things down
won't solve the communication problem by itself. You just simply replace the person with a piece of paper as a node in the above graph.

So free and open communication between all is not the way. Even with modern tools such as mailing lists and large group video meetings.
It's just too much information and significant time is spent trying to filter out what is important from the noise at a particular point
in time.

So what's the alternative? [The fundamental theorem of software engineering](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering)
states:

> "We can solve any problem by introducing an extra level of indirection."

So let's try that:

1. Assume that everyone on the project has to know everything everyone else does
2. Everyone writes down what they know
3. What is written down is shared in one document or the equivalent
4. everyone refers to that document instead of the other 

{...}



<!--
## Communication, Command, and Control

Allen Curve

-->


<!--
## Scrum

-->

<!--
It's not a bug it's a feature
 -->

<!--
## Feature Flags vs Feature Branches

Choosing a Branching Strategy. If you don't , you're going to deal with Conway's law anyway. Might as well make it explicit.
https://featureflags.io/feature-flags-vs-branching/
https://stackoverflow.com/questions/19434222/feature-toggles-vs-feature-branches
-->

<!--
## A Road to Maturity

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
* [Exploding Software-Engineering Myths](https://www.microsoft.com/en-us/research/blog/exploding-software-engineering-myths/)


<!-- 
If we assume (naively) that our development tools and techniques are sufficient for creating products consistent with requirements
then we can point the finger towards a potential source of our ills:

Requirements themselves.

Are they consistent? Is there a gap in their coverage? Where and how are they maintained? WHat is the traceability between them and your
verification plan?

Do the project requirements align with the expectations of your customer? Are they consistent with the goals of your larger organization?
Example: based on the project requirements you must create a chat client, but your company is a gaming company.

Environmental constraints. Memory leak bs Missile lifespan

Bus factor vs requirements document.

Allen curve and communication outside your organization.

Asian pilots who have to speak in english to avoid social conventions.

What are engineers to do though? What of the QA team? Many of these issues are not solvable by those roles.

What does extreme ownership mean here?

the role of the Solution Architect, BA, Scrum Master is what is key here?
-->