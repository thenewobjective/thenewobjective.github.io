---
layout: post
icon: file-text
title:  "A Perspective On DevOps"
date:   2021-01-24 12:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/a-perspective-on-devops
commentThreadId: -1
---

* TOC
{:toc}

## Introduction

"DevOps" is a [portmanteau](https://en.wiktionary.org/wiki/portmanteau_word) of the words "Development" and "Operations".
While on the face of it the implied meaning seems obvious: unifying Software Development and Operations, in practice explanations
seem to fall into a number of categories when describing it: Some take the top-down approach of combining traditional
Development and Operations departments and simply calling it the "DevOps" department; Others[^1] focus on a set of bottom-up practices
and tools and refer to that aggregate as "DevOps"; and some refer to it as a methodology or even a culture or some vaguely defined
extension of the Agile movement. The goal of this article is to connect these disparate perspectives by taking an orthogonal
point-of-view to derive a more appropriate definition.

## The Inverse of Conway's Law {TODO}

You may have heard of Conway's Law. 

## References and Further Reading

[^1]: Mike Loukides. [What is DevOps?](http://radar.oreilly.com/2012/06/what-is-devops.html). June 7, 2012
[^2]: Floris Erich. [DevOps is Simply Interaction Between Development and Operations](https://www.researchgate.net/publication/330477403_DevOps_is_Simply_Interaction_Between_Development_and_Operations_First_International_Workshop_DEVOPS_2018_Chateau_de_Villebrumier_France_March_5-6_2018_Revised_Selected_Papers). January 2019

## Notes

* Site Reliability Engineering
  * vs devops

* https://sre.google/sre-book/table-of-contents/
* https://www.rackspace.com/blog/quantifying-devops-capability-its-important-to-keep-calms/


ALM Team

<!--
===========================================
===========================================

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
-->