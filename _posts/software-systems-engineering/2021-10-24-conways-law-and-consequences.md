---
layout: post
icon: file-text
title:  "Conway's Law and Consequences"
date:   2021-10-24 12:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/conways-law-and-consequences
---

* TOC
{:toc}

## Introduction

Over time as you become more experienced in the implementation of solutions and the processes that support them, you might notice that it becomes
progressively harder to enact changes as more ambitious endeavors are pursued. These challenges often are not due to the intrinsic difficulty of the tasks
at hand but the operational constraints that surround them. Sometimes you can't change a product unless you change the people; and dually sometimes you can't
reorganize a team or company if the tools won't support it. This phenomenon has been known for decades and has been summarized most famously with
Melvin Conway's <abbr title="A traditional saying that embodies common knowledge">adage</abbr>: ["Conway's Law"](https://en.wikipedia.org/wiki/Conway%27s_law).
To be effective in creating solutions you have to be able to engage across levels of the organization: Tactical, Operational, Strategic, and beyond.

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
When I login to the dashboard I can see the balance of all my accounts in one place, but to perform actions against my retirement account I am redirected to another website with a different theme and
structure organized around retirement and investments specifically. This new dashboard is complete with features redundant with the original dashboard I was just using.
As you might imagine this is due to the bank having different teams focused on different aspects of banking. This is irrelevant to me as an end user, but the bank
practically delivered to me their company's organization chart along with the product itself.

> ...the organization chart will initially reflect the first system design, which is surely not the right one.
> If the system design is to be free to change, the organization must be prepared to change.
> <cite>Frederick P. Brooks Jr., The Mythical Man-Month: Essays on Software Engineering</cite>

## The Inverse

If we accept that an organization is reflected in the products it creates then we should consider that the converse might also be true.
In other words, the system you're using can pressure your organization to adapt as that might be easier than
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

Many times, when I've worked with larger clients, I notice they have multiple departments and individuals whose only job
is facilitate challenges in one or more systems being used and catch things that fall through the cracks.

How many organizations are using Excel spreadsheets for something it was not intended for? How many have subsequently become so reliant upon
this for their work and their paycheck that it would be catastrophic if the underlying original problem was fixed? We can see a clear example
of this in the field of Genetics. Last year (2020) a number of human genes were renamed to stop Microsoft Excel from
[misinterpreting them as dates](https://www.theverge.com/2020/8/6/21355674/human-genes-rename-microsoft-excel-misreading-dates)[^1].

Microsoft Excel [wasn't the problem](https://support.microsoft.com/en-us/office/format-numbers-as-text-583160db-936b-4e52-bdff-6f1863518ba4)
here nor were the tens of thousands of gene names. Clearly, it's the organizations' processes that put them into that situation.

## The Ills

Failing to recognize the forces and relationships between products and the organizations that create and use them lead to more problems than
you might expect. Microsoft [performed a study](https://augustl.com/blog/2019/best_bug_predictor_is_organizational_complexity/) to determine
the top predictor of bugs in a codebase and discovered that the organization structure was the #1 offender by far.

There is now cognitive dissonance in the mind of a Software Engineer. On one hand the above study makes sense considering
our knowledge of Conway's Law since the late 1960s and yet, what is true of every bug discovered in a production system?

1. The type system didn't prevent it
2. The unit tests didn't catch it

Traditionally speaking: the product is by definition production ready and yet clearly broken. What is to be done?

Are our tools insufficient for identifying organization dysfunction? Can we change the way we work to improve the things we produce?

## Communication Structure

While this blog article isn't intended to cure all your ills some improvements and techniques can be discussed.
We'll focus on a project and its team for exploring improvements. The reason is simple: The project is the join point between an
organization and the artifacts it produces.

If a product tends to reflect the organization's communication structure (project team in this case),
then it should seem clear that improvements in that structure would also reflect positively in the product created.
So, what would such an improvement look like? You might think that more open and free communication would be the way to go.
Anyone on a project to talk to anyone else and vice-versa. The reality though is that this does not scale and can lead to quagmires. This can be demonstrated with simple Graph Theory:

<figure>
    <img src="/media-library/software-systems-engineering/complete-graph.png" alt="Complete Graph">
    <figcaption>Complete Graph. Credit: <a href="https://en.wikipedia.org/wiki/Complete_graph" target="_blank">Wikipedia</a></figcaption>
</figure>

As the number of people are added to your project or organization the number of lines of communication grow combinatorially. Four people on a team have `six` lines of communication but by adding only two more people more than doubles the lines of communication to `fifteen`!

With the above you can now understand where Brooks's Law applies:

> "...adding manpower to a late software project makes it later"
> <cite>Fred Brooks</cite>

As well as the motivation behind [Gordon Bell's](https://en.wikipedia.org/wiki/Gordon_Bell) comment:

> "I’ve never seen a job being done by a five-hundred-person
> team that couldn’t be done better by fifty people."
> <cite>Chester Gordon Bell</cite>

If the truth of a project or an organization exists only in the minds of its members, then getting someone up
to speed is a daunting task if all other members must be informed and must inform this new addition. In such an organization
you must also be concerned about the [Bus Factor](https://en.wikipedia.org/wiki/Bus_factor). How many people can you lose and
still be able to fulfill your goals? This we mitigate with cross-training and writing things down. But writing things down
won't solve the communication problem by itself. You just simply replace the person with a piece of paper as a node in the above graph.

So free and open communication between all is not the way. Even with modern tools such as mailing lists and large group chat rooms and video meetings.
It's just too much information and significant time is spent trying to filter out what is important from the noise at a particular point
in time.

So what's the alternative? [The Fundamental Theorem of Software Engineering](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering)
states:

> "We can solve any problem by introducing an extra level of indirection."

So let's try that as a guideline for the use-case of [requirements management](https://en.wikipedia.org/wiki/Requirements_management) for a project:

1. Assume that everyone on the project must know everything everyone else does
2. Everyone writes down what they know (Bus Factor)
3. What is written down is shared in one document, location, or tool
4. Everyone refers to that centralized location instead of the entire group

The resulting graph now looks like the following where the green node is the centralized documentation:

<figure>
    <img src="/media-library/software-systems-engineering/star-graph.png" alt="Star Graph">
    <figcaption>Star Graph</figcaption>
</figure>

You can see that the complexity of communication is now linear in growth. The trade-off being that the centralized node can be more complex to manage and coordinate.

## The Rule of Seven

Not all communications are created equal. We can't reduce everything to a centralized repository of documentation in which all knowledge is referenced and managed.
There are still many places where we must maintain the human element. The question is: can we simply replace that central node in the previous example with a person
and maintain the scaling benefits? The answer is 'yes' and no; there are limits at scale.

There is a concept in psychology referred to sometimes as ["Miller's Law"](https://en.wikipedia.org/wiki/Miller%27s_law)
or more commonly as [The Rule of 7 &#177; 2](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two). It basically says human beings can only manage
about seven objects/ideas in our [active memory](https://en.wikipedia.org/wiki/Short-term_memory) at a time. Additionally, we on average work ~8 hours a day. While those exact numbers
vary between individuals the larger takeaway here is that a person cannot operate on an order-of-magnitude more than these numbers. We don't keep dozens of objects in active memory nor
work more than 24 hours in a day.

The consequence of these human limitations is that we use tricks like [chunking](https://en.wikipedia.org/wiki/Chunking_(psychology)) to try and abstract the details. If we use the example
of human management: how many meetings can we practically hold in a day with them being useful? 4-6? 10-20? How many direct reports? At what number do these begin to be less useful or become a hindrance?
When do you become the bottleneck of communication and coordination? It doesn't matter what that number is exactly to understand the concept. What's more important is to see how the topology of our communication
structure can change as it scales given the new constraints:

<figure>
    <img src="/media-library/software-systems-engineering/banana-tree.png" alt="Banana Tree (Graph)">
    <figcaption><a href="https://mathworld.wolfram.com/BananaTree.html" target="_blank">Banana Tree (Graph)</a></figcaption>
</figure>

If you squint you might see the CEO in the middle as the red node, some managers as the purple nodes, the employees as the blue nodes, and maybe the green nodes as project documentation for each group.
Again, it doesn't matter what they represent so much as the topology that is forming. Here is a slight variation where the edge nodes (teams?) are free to communicate
with one another (and perhaps re-introducing the Bus Factor as mentioned earlier):

<figure>
    <img src="/media-library/software-systems-engineering/banana-tree-and-complete.png" alt="Banana Graph + Complete Graph">
    <figcaption>Banana Graph + Complete Graph Edges</figcaption>
</figure>

Can you think of other variations in these communication graphs? Perhaps you have other examples you've seen in practice. One example can be found in [Nexus](https://www.scrum.org/resources/scaling-scrum), also referred to as the Scaled Scrum framework. Notice the key components mentioned in their documentation:

1. A centralized backlog
2. 3-9 Scrum Teams
3. Each Scrum team is 3-9 individuals in size

While some in that community think this was some profound insight, you know from the above lessons that it was more-so a (re-)discovery of the constraints that nature and the universe have placed upon us.

## Free to Choose but no Free Lunch

If you recognize and honor the constraints when scaling your communication structures, you are free to choose within them as shown in the last two example figures. There is no free lunch though and there are issues
even at larger scales that may not be clear. Recall the guideline we followed earlier:

> “We can solve any problem by introducing an extra level of indirection.”
> <cite>The Fundamental Theorem of Software Engineering</cite>

What was not mentioned though is that this was extended later on with the phrase:

> …except for the problem of too many levels of indirection.
> <cite>David Wheeler</cite>

So, what does that mean? If you were looking at the previous graphs as an analogy of, say, scrum teams, then you might overlook the scenarios of needing to communicate between them:

<figure>
    <img src="/media-library/software-systems-engineering/banana-tree-and-complete-cross-talk.png" alt="Distant Communication in Graph">
    <figcaption>Distant Communication</figcaption>
</figure>

By avoiding the size/volume of the communication we've increased the distance of it. This is another instance of Duality; paired concepts that mirror one another like Yin and Yang.

If nodes (people?) need to communicate with each other often, then they should be close to one another. The more communication that needs to occur the closer they need to be. Note that the challenge
is how to accomplish this while maintaining constraints (like The Rule of 7 &#177; 2).

[Professor Thomas J. Allen](https://en.wikipedia.org/wiki/Thomas_J._Allen) in the late 1970s saw this problem in practice when studying how geographic distance was related to frequency of communication
between engineers. As you might expect, when the distance increased the frequency of communication decreased. The result of this research is referred to as [The Allen Curve](https://en.wikipedia.org/wiki/Allen_curve).

With modern technology you might think that this problem goes away. With phones, email, video conferencing, and more the physical distance should be more irrelevant, correct? In the above graph you see that there is no
mention of geographic distance; it's a logical distance. Even today we'd be safe to assume that people on the same team are likely to be in the same geographic location, the same building, perhaps even the same room.
Geographic constraints, or convenience, tend to map logical communication to them. If an individual node (person) has a goal of optimizing communication by minimizing it, there should be no surprise in
seeing the amount of communication falling off exponentially over longer distances. Example: Would you rather work with someone on your team in the same room with an 80% chance of success, or would you rather submit
a support request to another team in another time zone for a 95% chance of success?

This isn't just a hypothetical claim. Another [study from Microsoft](https://www.microsoft.com/en-us/research/blog/exploding-software-engineering-myths/) in 2009 shows the same. To quote:

> In order to verify results, the team also conducted an anonymous survey with researchers Sriram Rajamani and Ganesan Ramalingam in Microsoft Research India,
> asking engineers who they would talk to if they ran into problems. Most people preferred to talk to someone from their own organization 4,000 miles away
> rather than someone only five doors down the hall but from a different organization. Organizational cohesiveness played a bigger role than geographical distance.

## Summary

Much more can be said on the topic of Conway's Law, the consequences, and other implications. To keep this article from becoming excessive in length I'll end it here and pursue additional aspects in
their own respective articles. What I hope was provided in this article at least is a sufficient overview and introduction to a subtle topic and how it influences your work and everyday life.
For those who are engaged in consulting or contracting for clients, I hope this can additionally help change your mindset into how to deliver effective solutions. One can't focus on a product
nor a strategic deficiency in a vacuum. An organization is a duality of the tools and the people who use them, and they must be engaged in their entirety as the conjoined twins that they are.

> “We become what we behold. We shape our tools and then our tools shape us”
> <cite><a href="https://en.wikipedia.org/wiki/John_M._Culkin" target="_blank">John M. Culkin</a></cite>

A parting cartoon by [Manu Cornet](https://en.wikipedia.org/wiki/Manu_Cornet):

<figure>
    <img src="/media-library/software-systems-engineering/org-charts-manu-cornet.png" alt="Org charts by Manu Cornet">
    <figcaption>
        "Org charts" - <a href="https://en.wikipedia.org/wiki/Manu_Cornet" target="_blank">Manu Cornet</a>
    </figcaption>
</figure>

## Further Reading

* [Systemantics. The Systems Bible](https://www.amazon.com/SYSTEMANTICS-SYSTEMS-BIBLE-John-Gall-ebook/dp/B00AK1BIDM) by John Gall
* [The Mythical Man-Month](https://www.amazon.com/Mythical-Man-Month-Anniversary-Software-Engineering-ebook/dp/B00B8USS14) by Frederick P. Brooks Jr.
* [Exploding Software-Engineering Myths](https://www.microsoft.com/en-us/research/blog/exploding-software-engineering-myths/)
* [Team Topologies](https://www.amazon.com/Team-Topologies-Organizing-Business-Technology/dp/1942788819/ref=sr_1_1) by Matthew Skelton and Manual Pais

## Footnotes

[^1]: Microsoft released a feature to mitigate this problem in October 2023: <https://www.theverge.com/2023/10/21/23926585/microsoft-excel-misreading-dates-human-genes-conversion-fixed>s
