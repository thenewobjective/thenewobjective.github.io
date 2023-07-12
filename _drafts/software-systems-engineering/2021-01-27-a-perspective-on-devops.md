---
layout: post
icon: file-text
title:  "A Perspective On DevOps"
date:   2021-01-27 12:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/a-perspective-on-devops
---

* TOC
{:toc}

## Introduction

"DevOps" is a [portmanteau](https://en.wiktionary.org/wiki/portmanteau_word) of the words "Development" and "Operations".
While on the face of it the implied meaning seems obvious: unifying Software Development and Operations, in practice explanations
seem to fall into a number of categories when describing it: some take the top-down approach of combining traditional
Development and Operations departments and simply calling it the "DevOps" department; Others[^1] focus on a set of bottom-up practices
and tools and refer to that aggregate as "DevOps"; and some refer to it as a methodology, a culture, or some vaguely defined
extension of the Agile movement. The goal of this article is to connect these disparate perspectives by taking an orthogonal
point-of-view to derive a more appropriate definition.

## Converse Conway's Law

To approach a new definition we should change our perspective to thinking in terms of systems. You may have heard of
[Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law):

> Any organization that designs a system (defined broadly) will produce a design
> whose structure is a copy of the organization's communication structure.
> <cite><a href="https://en.wikipedia.org/wiki/Melvin_Conway" target="_blank">Melvin E. Conway</a></cite>

Perhaps even its variant:

> The structure of any system designed by an organization is isomorphic to the structure of the organization.
> <cite><a href="https://en.wikipedia.org/wiki/Edward_Yourdon" target="_blank">Yourdon, Edward</a>; <a href="https://en.wikipedia.org/wiki/Larry_Constantine" target="_blank">Constantine, Larry L.</a></cite>

If an organization is reflected in the system it creates then we should consider that the converse might also be true.
In other words the system you're using can pressure your organization to adapt as that might be easier than
changing the system itself. This tendency has been noticed others:

> But Systems and people are related in another, subtler way. A <em>selective process</em> goes on,
> whereby Systems attract and keep those people whose attributes are such as to adapt them to life
> in that System.
> <cite><a href="https://en.wikipedia.org/wiki/Systemantics" target="_blank">Gall, John. Systemantics</a>. Chapter 10</cite>

Thus you can conclude that the organization is part of The System and with that knowledge we can begin to evaluate how
"DevOps" has come into being. Not so much as a choice, but as a consequence of an evolving system.

## The Methodology of The Mainframe {TODO}

From the 1960s to the early 1970s computer programming was primarily accomplished via punched-cards[^2]. The methodology
was very much constrained by how these cards were processed. The development workflow was basically:

<figure markdown="1">

![](https://mermaid.ink/img/pako:eNpNjssKwjAURH-lzDpKQ1ubRhB87XSjO8kmmKhF05SYglr678b6wN25lzPDtNhbpcFxdLI-RavNWDhRRdF0MJjMPzwLvPjw_I9fzmwMAqOdkaUKLe3rL-BP2mgBHlBJdxYQVRe8plbS66UqvXXgB3m5agLZeLu9V3tw7xr9lRalDIvMz9J9aP3e2k8mqGW1s9Z8g-EEb3EDT9IhK0Z0FMe0yLMsZSnBHZzlwySJc1qwlBZZlrOO4NEX0O4J84BPuw?type=png)

</figure>

{TODO}

## References

[^1]: Mike Loukides. [What is DevOps?](http://radar.oreilly.com/2012/06/what-is-devops.html). June 7, 2012
[^2]: [Computer Programming in the punched card era](https://en.wikipedia.org/wiki/Computer_programming_in_the_punched_card_era)

## Additional Information

* [Punch Card Programming - Computerphile](https://www.youtube.com/watch?t=545&v=KG2M4ttzBnY)
* [Mainframes and the Unix Revolution - Computerphile](https://www.youtube.com/watch?v=-rPPqm44xLs)

<!--
===========================================
===========================================

Crockford History: <https://www.youtube.com/watch?v=JxAXlJEmNMg>

http://www.columbia.edu/cu/computinghistory/fisk.pdf
http://museum.ipsj.or.jp/en/computer/device/paper/words.html
https://github.com/jasonbellamy/jekyll-mermaid/issues
https://mermaid-js.github.io/mermaid/#/

[^2]: Floris Erich. [DevOps is Simply Interaction Between Development and Operations](https://www.researchgate.net/publication/330477403_DevOps_is_Simply_Interaction_Between_Development_and_Operations_First_International_Workshop_DEVOPS_2018_Chateau_de_Villebrumier_France_March_5-6_2018_Revised_Selected_Papers). January 2019
https://www.researchgate.net/profile/Floris-Erich-2/publication/330477403_DevOps_is_Simply_Interaction_Between_Development_and_Operations_First_International_Workshop_DEVOPS_2018_Chateau_de_Villebrumier_France_March_5-6_2018_Revised_Selected_Papers/links/5cd4c9ba92851c4eab911562/DevOps-is-Simply-Interaction-Between-Development-and-Operations-First-International-Workshop-DEVOPS-2018-Chateau-de-Villebrumier-France-March-5-6-2018-Revised-Selected-Papers.pdf

## Further Reading

## Notes

* Site Reliability Engineering
  * vs devops

* https://sre.google/sre-book/table-of-contents/
* https://www.rackspace.com/blog/quantifying-devops-capability-its-important-to-keep-calms/

ALM Team

## Levels of Organization {TODO}

Software comes in many forms as we know, from throw away command line tasks to monolithic operating systems and beyond.
As these evolve and scale, different aspects begin to develop that each require increasing amounts of energy to maintain.
What these aspects consist of is secondary to the fact that specialized roles also develop to manage them. The development
of software at scale is no longer a challenge of simply organizing code, it also becomes one of organizing roles.

As the number of roles in your organization increase there is a higher-order specialization that becomes apparent. Some
roles deal with the tactical day-to-day execution of tasks, some roles are operational and manage/support the execution
and structuring of these tasks, and some are dedicated to the strategic planning and prioritization of goals. These
specialized roles in the organization can be architected as a vertical abstraction based on where they are interdependent:

<figure>
  <img src="/media-library/software-systems-engineering/levels-of-organization.jpg" alt="Levels of Organization">
  <figcaption>Levels of Organization</figcaption>
</figure>

* Those with a military background or education should recognize these level of organization from their respective educations. Those without are invited to read ...
* The purpose of this organization is optimization of execution towards a particular goal

### Tactics {TODO}

{Where the rubber meets the road...}

### Strategy {TODO}

{TODO}

### Operations {TODO}

{The backbone of the organization}

## Whither DevOps? {TODO}

{you will notice that up to this point I have avoided conflating the term "people" and "roles".}

{incidental and accidental complexities also scale. What becomes apparent rather quickly is that these complexities do not scale at the same rate. Building scale dog house analogy. Analogies are lies that tell the truth}

{a collection of birds may be called a flock, but a collection of developers is called a merge conflict}

DevOps is often presented as the intersection of QA, Operations, and Development:

<figure>
  <img src="/media-library/software-systems-engineering/devops-intersection.png" alt="DevOps Intersection">
  <figcaption>DevOps Venn Diagram</figcaption>
</figure>

## Conclusion {TODO}

In summary, my perspective is that DevOps should not be treated as merely the Venn-Diagram intersection of QA, Software Development, and Operations.  DevOps should be approached as the Operational layer of Delivery, where the intersections are instead

## Notes {TODO}

* Devops as a methodology
  * publishing multiple changes in a day
  * "The best testing is on production"

* Bertrand Meyer
  * <https://bertrandmeyer.com/2017/12/12/devops-concept-workshop-announcement/>
  * <https://bertrandmeyer.com/2010/10/24/the-cloud-and-its-risks/>
  * <https://bertrandmeyer.com/?s=devops>

* <https://octopus.com/blog/on-the-naming-of-devops-engineers>
* <https://en.wikipedia.org/wiki/Talk:DevOps>

* DevOps as Orchestration? -mlhaufe
* alignment of updates between services and clients that depend on them
* <https://docs.microsoft.com/en-us/azure/devops/learn/>

* Donovan Brown
  * "DevOps is the union of people, process, and products to enable continuous delivery of value to our end users."

* Features
  * Security
    * SSL (Mozilla Observatory)
  * Hosting
  * Continuous Integration
    * Unit Testing
      * <https://www.c-sharpcorner.com/article/selenium-automation-test-cases-for-the-net-web-application/>
    * Screaming Frog
  * Continuous Delivery
    * <https://docs.microsoft.com/en-us/iis/install/installing-publishing-technologies/installing-and-configuring-web-deploy-on-iis-80-or-later>
  * Monitoring
    * Availability Testing (Application Insights)
    * Analytics
    * Security
  * Maintenance
    * DB backups
* Continuous Deployment

* What gets released together gets versioned together
* Infrastructure as Code

* From the HDI meetup:
  * "AntiFragility"

* Cost Accounting
* Inventorying resources (including people) to see how much they cost
* Alternatively: Activity Accounting
* What are people spending their time doing?

* An entire DevOps ecosystem to fill in the gaps of language shortcomings?
* <http://www.clausewitz.com/readings/Dunn.htm>

DevOps as a culture is insufficient
    think of conway's law and the reverse conway's law.
    A change of organization leading to a change in implementation.
  Can there be a culture with 1 person?

https://www.youtube.com/watch?v=-rPPqm44xLs
https://en.wikipedia.org/wiki/Mainframe_computer
https://en.wikipedia.org/wiki/Computer_programming_in_the_punched_card_era
http://radar.oreilly.com/2012/06/what-is-devops.html
https://standards.ieee.org/project/2675.html
https://runnable.com/blog/conway-s-law-in-reverse-how-app-architecture-influences-org-structure
https://devops.com/the-origins-of-devops-whats-in-a-name/

https://www.devops-research.com/research.html
-->
