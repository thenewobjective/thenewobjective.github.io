---
layout: post
icon: file-text
title:  "Branching Strategies"
date:   2023-06-26 13:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/branching-strategies
---

* TOC
{:toc}

## Introduction

Some programs are ephemeral; they are run once and then discarded. Examples include CLI scripts and one-off report
generators. These are often referred to as throw-away since we can recreate them on-demand with little effort.
Other programs are longer-lived; they are run multiple times, maintained, enhanced, and often collaboratively
developed. This code and its associated operations require coordination, communication and care. Since these
operations matter enough to be careful, they matter enough to build/use a system. As you likely know, the system
we use is called a [Version Control System (VCS)](https://en.wikipedia.org/wiki/Version_control) which is a subtype
of a [Software Configuration Management (SCM)](https://en.wikipedia.org/wiki/Software_configuration_management) system.

Adopting a VCS is not enough. We must also establish a strategy for using it. Just like buying a car doesn't automatically
get you to work, buying a VCS doesn't automatically get you a working system. You must also have a strategy for using it.
Not all strategies are created equal and some are better than others. In this post, we will explore the various strategies
and their trade-offs.

## Version Control Systems (VCS)

Before we can discuss branching strategies, we must first understand the VCS landscape. There are two main types of VCS:

* Centralized Version Control Systems (CVCS)
* Distributed Version Control Systems (DVCS)

### Centralized Version Control Systems (CVCS)

CVCSs are the older of the two types. They are characterized by a single, central repository that is shared by all
developers. This repository is the source of truth and all changes must be pushed to it. Examples include Subversion
(SVN) and Team Foundation Version Control (TFVC). These systems were criticized for being slow and for being a single
point of failure. Branching was also expensive and slow with merges being even more so. This expensiveness of branching
and merging (via the reverse [Conway's Law](/software-systems-engineering/conways-law-and-consequences#the-inverse))
led to developers avoiding branching and merging. This avoidance led to ad-hoc human processes for managing changes
which led to errors and frustration. There was a shining light in the darkness, however, and that was Perforce which
supported cheap branching and merging.

### Distributed Version Control Systems (DVCS)

DVCSs are the newer of the two types. Unlike CVCSs, DVCSs do not have a single, central repository. Instead, each
developer has their own repository. This repository is a complete copy of the entire project and its history. This
allows developers to work offline and to commit changes locally. When ready, the changes can be pushed to a remote
repository. It might be more accurate to refer to these as Change Control Systems (CCS) instead of Version Control
Systems as versioning implies a single source of truth which may not be the case.  In practice, however, a particular
repository is often designated as the source of truth
[often aligned](/software-systems-engineering/conways-law-and-consequences#the-law) with an organization's workflow.
The most popular DVCSs are Git and Mercurial. For the remainder of this post, we will focus on Git.

## Why A Branching Strategy?

> Turning and turning in the widening gyre<br>
> The falcon cannot hear the falconer;<br>
> Things fall apart; the centre cannot hold;<br>
> Mere anarchy is loosed upon the world...<br>
> <cite markdown="1">[W. B. Yeats](https://en.wikipedia.org/wiki/W._B._Yeats). ["The Second Coming"](https://en.wikipedia.org/wiki/The_Second_Coming_(poem))</cite>

Having a versioning system in hand is not enough; it would just be a glorified backup system. The problems that
remain are how to manage simultaneous development, experimental changes, and their subsequent integration. Branching
is the answer to these problems. Creating branches is like creating a parallel universe. All that happens within
is contained and isolated from others.

The challenge is when we want to share something between branches which is accomplished via merging. Back to our
analogy: while our universes were parallel they are now converging and problems can arise since any
inconsistencies between them will be revealed.

<figure>
  <img src="../../media-library/software-systems-engineering/mirror-dimension-dr-strange.webp" alt="Mirror Dimension from Dr Strange">
  <figcaption markdown="1">
[The Mirror Dimension](https://marvel.fandom.com/wiki/Mirror_Dimension) from [Doctor Strange (film)](https://en.wikipedia.org/wiki/Doctor_Strange_(2016_film))
  </figcaption>
</figure>

As one might expect, the longer the branches exist, the more likely they are to diverge and the more difficult it
is to merge them.

This is why we need a strategy for coordinating branches and their merges. The strategy should be designed to
minimize the number of conflicts as well as the number of branches and merges required to keep cognitive load low.

## Branching Strategies

The two primary forces that drive the design of a branching strategy are the two sides of
[Conway's Law](/software-systems-engineering/conways-law-and-consequences):

* The communication structure of the organization (How your team is organized)
* The technical structure of the implementation (How your code is organized)

If these two are not aligned, then the strategy will be suboptimal, awkward, and even harmful. For example, if the
organization is arranged into teams that are responsible for different parts of the codebase, then the strategy
should reflect that. Another example is if the implementation has multiple long-running releases to be maintained,
then the strategy should reflect that. The strategy is also a workflow; it has a set of rules that govern how
changes are made and how they are integrated.

### Single Branch

<!-- Definition, Pros, Cons, Team and Code Structure, Relationship to methodology, Versioning and Releases -->

<figure markdown="1">

[![Single Branch](https://mermaid.ink/img/pako:eNq9j0EKwjAURK8isw7F2hqTrBVXrtxJNp8mtkHTlJiCWnp3a0WP4G7m8x78GVAFY6FQu7SP1DU66naxqIL3Lv0zg8Hb6MmZ6ZnhfddIjfVWQ03RULxo6HacuL4zlOzOuBQi1JmuN8tAfQrHR1tBpdjbL7R1VEfyP8rO0uEzeV7O0FF7CsF_xalCDbhDyXUmZVGuZF5wwVeC4QFVFHm2lHKTCy6E5OWSjwzP2c_HF2Zdbsc?type=png)](https://mermaid.live/edit#pako:eNq9j0EKwjAURK8isw7F2hqTrBVXrtxJNp8mtkHTlJiCWnp3a0WP4G7m8x78GVAFY6FQu7SP1DU66naxqIL3Lv0zg8Hb6MmZ6ZnhfddIjfVWQ03RULxo6HacuL4zlOzOuBQi1JmuN8tAfQrHR1tBpdjbL7R1VEfyP8rO0uEzeV7O0FF7CsF_xalCDbhDyXUmZVGuZF5wwVeC4QFVFHm2lHKTCy6E5OWSjwzP2c_HF2Zdbsc)

<figcaption>Single Branch</figcaption>
</figure>

The simplest strategy is to have a single branch. The idea is that all changes are made directly, and no other branches
are created. This approach is simple and easy to understand. It's basically a non-strategy that gives you version
control and little else.

This strategy is appropriate for small projects and tightly-knit teams: a wiki, a personal website, a small library, etc.
This can also be usable for larger projects when the codebase is simple and modularized with defined areas of responsibility.
The idea is that if you make small changes, then at worst you should only break a small part of the system which should then
be easy to fix. An example of this is the [EiffelStudio](https://bertrandmeyer.com/2013/09/30/the-laws-of-branching-part-1/)
project.

If the codebase is not modularized/simple, then chaos can ensue. A seemingly small change can have
[far-reaching consequences](https://en.wikipedia.org/wiki/Butterfly_effect) and potentially break the entire system
in a way that is difficult to fix. Assuming that the codebase **is** modularized/simple, then this strategy is still
risky when the team is large and/or inexperienced. The reason is that as the team grows, the number of changes
increases, and the likelihood of overlap and breakages increases. This is especially true for inexperienced developers
who are more likely to make mistakes. This can be mitigated somewhat by code reviews, pair programming,
[Continuous Integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration), and other human processes.

From the above, you might notice that this strategy corresponds and couples well with the
[Extreme Programming (XP)](https://en.wikipedia.org/wiki/Extreme_programming) methodology which emphasizes
simplicity, tight communication in a team, and incremental development with frequent releases. The basic
idea (as described by [Bertrand Meyer](https://www.amazon.com/Agile-Good-Hype-Bertrand-Meyer/dp/3319051547/ref=sr_1_1?crid=O7JHT1XXCOOB))
is *"Increment then Simplify"*. You define a set of tests that represent the requirements of the new functionality.
The tests fail because the implementation doesn't exist yet. You then write the code to make the tests pass. This is
called [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development). Once the tests pass,
you [refactor](https://en.wikipedia.org/wiki/Code_refactoring) to make it simpler and more maintainable. Rinse and
repeat.

Release management is straightforward with this strategy. You could simply deploy the latest commit to production,
or you could tag a commit with a release version and deploy that. The latter is more disciplined and is often used
in conjunction with the [Semantic Versioning](https://semver.org/) scheme. A Continuous Delivery (CD) pipeline
can be configured to automatically deploy the latest commit to a production environment, or it can be configured to
wait for a specific tag and deploy the associated commit to the appropriate environment(s).

<figure markdown="1">

[![Single Branch with release version tags](https://mermaid.ink/img/pako:eNqdkLFOwzAURX8lurOJ4rqpa89FTEzdkJdHbBKrdRwZB7VE-XfSoLKxdHtXOufq6U5oonXQaH1-STR0Jpm-KJoYgs__3UWmVhcGX7ysyuqJzkNHBg-Y7y4_JBqAIbgUyNvl9-nGGeTOBWdwwyyl01Lczws3Dpaye7Y-xwT9QedPx0Bjjsdr30DnNLo7dPDUJgp_lFul19-F1qEYBurfYgx3cYnQEy7Qqi6VEvWWc6VqwaViuEILocrdlsv9Xu4qKeqNnBm-1wI-_wBqwnrU?type=png)](https://mermaid.live/edit#pako:eNqdkLFOwzAURX8lurOJ4rqpa89FTEzdkJdHbBKrdRwZB7VE-XfSoLKxdHtXOufq6U5oonXQaH1-STR0Jpm-KJoYgs__3UWmVhcGX7ysyuqJzkNHBg-Y7y4_JBqAIbgUyNvl9-nGGeTOBWdwwyyl01Lczws3Dpaye7Y-xwT9QedPx0Bjjsdr30DnNLo7dPDUJgp_lFul19-F1qEYBurfYgx3cYnQEy7Qqi6VEvWWc6VqwaViuEILocrdlsv9Xu4qKeqNnBm-1wI-_wBqwnrU)

<figcaption>Single Branch with release version tags</figcaption>
</figure>

<!--
https://thinkinglabs.io/articles/2022/05/30/on-the-evilness-of-feature-branching-the-problems.html
 -->

<!--
When a branch is created at abstracts and hides the work in progress this is a problem if parallel work is being done
that overlaps.

No concept of Hotfix?

A Hotfix is a change that is made directly to the release branch. If there is only one branch, then it's a moot point.
-->

<!-- Release Tags vs Release Branches -->

<!-- release notes -->

<!-- A Branching Strategy for Staggered and Long Term Releases -->

### Task Branching

[![Task Branching](https://mermaid.ink/img/pako:eNqdkkFPwzAMhf9K5XO7tdnWrjkiECdOcEK9eK3XhjbJlCYSY9p_Jy0bYgMqxO3Ffv6eI_kApa4IOERRVJhCWWE74sET9m1wY1CVjVD10Dj1a2HvDe6aQZdaSmEHtRmdQQGuJzOXXYNuS3PrIVHCFgVcur-ohspWOxtIFGooSDI1TXMus_pa60qimm9cHaWnpGvq5Yh9kaLrBjFw01U2sd_3Tady_0b48a-_LfXf2MmwawqE4PveWvlDOBQq8EbbkKQCuJcVmtZHqaP3uV2Flu4qYbUBvsWupxDQWf24VyVwaxydTbcCa4Py00Xj0MPHuY1XF8IO1bPW8jzon8AP8AqcxfEsj5N8uczYarHIcxbC3pfZesbSFUvXWbxO0iTNjiG8jYTk-A6nL_4X?type=png)](https://mermaid.live/edit#pako:eNqdkkFPwzAMhf9K5XO7tdnWrjkiECdOcEK9eK3XhjbJlCYSY9p_Jy0bYgMqxO3Ffv6eI_kApa4IOERRVJhCWWE74sET9m1wY1CVjVD10Dj1a2HvDe6aQZdaSmEHtRmdQQGuJzOXXYNuS3PrIVHCFgVcur-ohspWOxtIFGooSDI1TXMus_pa60qimm9cHaWnpGvq5Yh9kaLrBjFw01U2sd_3Tady_0b48a-_LfXf2MmwawqE4PveWvlDOBQq8EbbkKQCuJcVmtZHqaP3uV2Flu4qYbUBvsWupxDQWf24VyVwaxydTbcCa4Py00Xj0MPHuY1XF8IO1bPW8jzon8AP8AqcxfEsj5N8uczYarHIcxbC3pfZesbSFUvXWbxO0iTNjiG8jYTk-A6nL_4X)

This strategy is sometimes referred to as "feature branching", but I prefer the term "task branching" because it's
more accurate in its association with a task in an issue tracking system and the scope of the changes it includes.
The idea is to have a single branch, but to create a new branch for each task. This augments the single
branch strategy by providing a way to isolate changes that are slightly more complex to complete or time-consuming while
enabling the team to continue to work on other tasks in parallel that might have overlapping changes. You can think of
this as an encoding of the "trust" and "communication" aspects of the single branch strategy that only exists in the
minds of the team members.

In the above diagram you'll notice that each task branch name is prefixed with a "folder" name
`user/<username>/task-<task-id>`. This is a convention that can be used to help organize the branches
in the repository especially if there are many developers working on many tasks. In my experience there is a tendency
for older branches not to be deleted which pollutes the branch list. The folder convention can help to mitigate this problem.
To configure and enforce branch folders in Azure DevOps you can use the following guide: "[Require branches to be created in folders](https://learn.microsoft.com/en-us/azure/devops/repos/git/require-branch-folders?view=azure-devops&tabs=browser)".
Git also supports a "hook" concept for [enforcement](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e)
of conventions like this.

You'll also notice the branch names also include an ID number. This is a convention that can be used to help
correlate the branch to the task in an issue tracking system. You may be fortunate enough to have an issue tracking
system that can be integrated with your source control system that automatically links the two together. If not,
this convention can help to manually correlate the two. In my experience this is helpful when you have a team
member who was working on a task and then left the team or is on extended leave. Coupled with the polluting
branches problem mentioned above, this can make it far easier to locate the task in progress.

When it comes time to integrate the task branch back into the main branch (merging), the team should utilize a pull request
(merge request) to ensure that the changes are consistent with the team's standards and conventions. This often consists of
a code review, automated testing, build, and code analysis often referred to as a "gate". Most Git hosting services
provide this functionality and provide a user interface to configure:

* [GitHub article](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
* [Azure DevOps article](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser)

While the Pull Request is pending, the developer can continue to work on other tasks in parallel. After the pull request
is approved and the gates are passed, the task branch can be merged into the main branch. This usually happens automatically
by your chosen Git hosting service.

Tasks, being generally small in scope, often do not require a lot of time to complete and do not require a lot of
changes to the code base. This means that the task branch will often be merged into the main branch without any
conflicts. If there are conflicts, they should also be relatively straightforward to resolve.

After the merge, the task branch should be deleted. If it is not deleted, it will continue to exist in the repository
and will continue to pollute the branch list (hence the need for the folder convention mentioned above). Git hosting
services usually provide a way to delete these branches with a single click or do it automatically after the merge.

<!-- Relationship to Scrum/XP -->

Any methodology that utilizes a task-based approach to development can benefit from this strategy. This includes
Scrum, XP, and Kanban. In fact, this strategy is often used in conjunction with the single branch strategy in

### Feature Branching

Feature branching is sometimes used as a synonym for task branching, which is unfortunate. The term "feature" is
often used to describe a larger body of work that is too complex to be completed in a single task.

<!-- No Longer XP? Solidly Scrum?
CMMI?
 -->

<!-- Feature Flags vs Feature Branching -->

<!--
"""
if you’re using feature toggles solely as a substitute for branching and merging,
you are releasing code into production that you know for a fact to be immature,
untested, buggy, unstable and not fit for purpose. Your feature toggles are
supposed to isolate this code of course, but there is always a risk that the
isolation could be incomplete, or that the toggle could be flipped prematurely
by mistake. When feature branches go wrong, they only go wrong in your development
environment, and the damage is relatively limited. When feature toggles go wrong,
on the other hand, they go wrong in production—sometimes with catastrophic results.
"""

Feature flags as a Strangler Pattern?
-->

<!-- " The disaster I see with having one branch is either every commit has
to be final and non breaking or the single branch is filled with unfinished
features, bugs and breaking code."
Which can be mitigated somewhat by feature flags.
-->

<!-- ******************************************************* -->
<!-- ******************************************************* -->
<!-- ******************************************************* -->

<!-- Goals
* [Avoid Cherry Picking](https://devblogs.microsoft.com/oldnewthing/?p=98215)
* Provide a clear versioning scheme
-->

<!-- Deployment branches vs Release branches

Deployemnt branches are used to deploy to environments
Release branches are used to create releases

THe problem with Deployment branches is that they can have subtle merge issues?
 -->

<!-- Merging in one direction

Back Merging
 -->
<!--

during iteration planning
 choose feature(s) that can be completed in that iteration
  What iteration is chosen if reintroduced? When it starts? when it finishes?

 create a feature branch for each selected feature
  branch under features/feature-43

<https://news.ycombinator.com/item?id=7350432>
<https://web.archive.org/web/20160310192046/http://www.stucharlton.com/blog/archives/000589.html>

<!-- ## Staggering

<https://nkdagility.com/a-better-way-than-staggered-iterations-for-delivery/>

Staggered releases

How to hotfix deploy?
Say February release branch is deployed to prod
March is in progress and has been merged to master and currently in UAT
Need a hotfix on current february release.

Can't go to master due to subsequent changes? -->

## References and Further Reading

* [Trunk Based Development](https://trunkbaseddevelopment.com/)
* [Adopt a Branching Strategy](https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops&viewFallbackFrom=vsts)
* [Stop Cherry-Picking, start merging](https://devblogs.microsoft.com/oldnewthing/20180312-00/?p=98215)
* [Tags vs Release Branches](https://github.com/MicrosoftDocs/azure-devops-docs/issues/1109)
* [Semantic Versioning](https://semver.org/)
* <https://jamesmckay.net/2017/01/martin-fowler-and-feature-branches-revisited/>
* <https://martinfowler.com/articles/feature-toggles.html>
* <https://blog.codinghorror.com/software-branching-and-parallel-universes/>

<!--
Integration Branches

Just because code will build and pass tests on a developer's machine does not mean that it will build and pass tests
on another developer's machine. Addiitonally, the runtime behavior of the combined code may not be what is expected.

Just because a set of code can build and pass tests does not mean that it is ready to be accepted into the main branch.
There is a lot more to consider such as code quality, performance, security, runtime behavior,and so on.
This is where integration branches come in. Integration branches are branches that are used to integrate code from
-->

<!--
Auto creating a dev server for branches?

<https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/branching-strategies-with-tfvc?view=azure-devops&viewFallbackFrom=vsts>
<https://xkcd.com/1597/>

Case sensitivity in git
<https://github.com/tawman/git-unite>

feature flags vs feature branches
 how is versioning impacted?
  WHat does versioning mean?
  The capability of doing certain flagging and not the state of them?
  There is no version?
   requires live programming though?
   There is only the production version
  If there is no versioning and no "deployment"
  What is left of DevOps as a field?
feature branches as deployment options
 backing out?
 retesting?
 etc
 multiple interacting projects?
 what gets versioned together gets deployed together

* Depending on who you ask, Microsoft uses
  [Trunk Based Development](https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow),
  or [Release Flow](https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/use-git-microsoft),
  or [something else](https://blogs.msdn.microsoft.com/oldnewthing/20180312-00/?p=98215) entirely.

 • Integration Branches
 • <https://devblogs.microsoft.com/oldnewthing/20180323-01/?p=98325>
<https://stackoverflow.com/questions/56024285/how-to-set-default-branch-policies-for-future-branches-in-azure-devops>

High rate of feature versions
Uat tag triggers

staggered releases? Staggered iterations?

https://www.perforce.com/blog/vcs/best-branching-strategies-high-velocity-development

rough git-flow

* There is one release deployed to a production server (Release A)
* There is one release in progress (Release B)

-->

<!-- Throw away code

https://craftofcoding.wordpress.com/2020/02/19/what-is-throw-away-code/
"Build a throw-away prototype as soon as possible, then throw it away and build the real thing."
https://corgibytes.com/blog/2016/11/01/throwaway-code/
-->

<!-- Don't roll-back -->

## Notes

### Navitus Strategy

[![](https://mermaid.ink/img/pako:eNrNWG1P40YQ_isjS6deDxIg5dq7qKINJHBIQLgQ7lqJL2t746xwdn276wBF_PfOrF_iJE4I1YkeH5BZz8zOyzPPjHn0AhVyr-0Z_i3lMuBdwSLNJjcS8Cdh2opAJExaGB5fwTkzlusbWf-22_uSvWCBVRqgE4uAz50cKr9OudPtLyp3useF5OxiaDQODgrpNggprGAx-JrJYFwvnPtVLyyV5aCmXM9s4i8QppAW__AQRlpNcpvN3319cKSkZUKSkOWYK4sylESwY2bBT0UcGpIzaRBwY0ZpHD8AkyGGbAw3kKJtsNxY48y9e_duOKYrDVz0h2hJSh6QTavQIncR-Cy4jVWEoouOl_H9r46vc7rpvJ5Vhxyl0mxl-GjnFWlDarg2O4wOd0ac2VTzxl7rQ70uImlR01f-jp9Gjf3fChV3gVNozBJ1iWHBgNBu7LOXXiwn-nIAJ5i6NqWgAUeUv0lq8vxlh9dlorJXlL-KuOZTwe8waZMk5mj_7YUCw-NR_uJnEu1cD_vnneHpUefs7G8IeRKrhyy9lAMup0IrOeHS5pFm-F3AfIRuJBjucgJngM9kzHhFvNszyROUvHqQAbnn0LaAIsJBrGTmZa7lQskefzLU1A5PXT7tJwYzhAlAfQNMc5IMVCIy9ZJOVpZhutvca-42fG4ZqQ5ZFAkZgdUiirCkecooQzDofb7uXQ3J7udONXekeM70Ld7JDByiKXjrLLoSHGdwgGDMZETwNymjjhAy0NwZPj-96A8A3TJCSfLor6pHeW9MmEQ9uhy11R1giiLQqZTOXQcSfFeAgTQpRSPkQGokEqBwUGTMphwYGMv8mC-GcXl4SpcdxcpgNHdjLinWrHHpfZbHGiDMCHO-NaoJrhShXxSh1Hm2HVZ2gxMePNMMBQSw4Tfp5CoJrG_gkiResXXWo3mvxE5Rg64DcQZcOj9MIxiJ-1owXnaGR5-qYEQ45tV7cdn35hTXFr4upEIkt6UdZRRdGJYxXQ07Jz3ozQO5I6vQzvoA_XLNQmOK3-OCgIFrbvgEGwHJAxKtwjSwFPdiW3CNFrAFcQ5QW50pFpb2AibB55BkMjysZ5v5YOojuRz0u1vd3nm_Go2pQ9gWkeDSzAtH5fD58OtsfCFdZpAvgVQ7vOq1L5aXm7mSvS7ua7eztSvAWFmEemO_9ctqFG4XBj45YQRDZqm6-sCfEOMDWJwQSI15g7gNBk3mCgQHp0PRElVPlaCxJkdo38KdsGP4qvQtnEq41CpC9JnmizaTcrl4v_sfKK1Gez4fP0Z9a3zCtmlVpmJBM2GF2QrtN2-wjndwp9IYm5TGp09zDpsz4OEfizfklXdt2VrLnBAKzYk0SAD_LPqfuKXinltgiCnimIfN5R1ygf02QKtagdarW5Ek5EF1jUJQVhiLVpIRoRf97SRIcFMWfx8-bhV8vJQpx8cbkGCrXp34b4uYcP36vSZxPyKwVw_sVs3AroP1xnO39b3m7pfM1kZ1XqLkFfyV1-n97lqAO-XTEUYVc2Y4HOHQFSG6CyMmYvrypP01oj0WDYr7bEHGNTAWt3joo8E1fL14s7vNJW5DApjn3RUN_cJo55r59FWbubXUzOELm7m1cTPXDasXpOzZzfuZtWj_48f5pWjznahUXb0RedvehOOaKEKv7T2S9I2HX18TfuO18THEb8Qbbzs7DxCdhs4f828qD688Z_dfRWjHdD5isXGVe7qRT2g5TagBeqGwSntt93bbY6lVRDDlQSaV__ctP336FxQlRLg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#pako:eNrNWG1P40YQ_isjS6deDxIg5dq7qKINJHBIQLgQ7lqJL2t746xwdn276wBF_PfOrF_iJE4I1YkeH5BZz8zOyzPPjHn0AhVyr-0Z_i3lMuBdwSLNJjcS8Cdh2opAJExaGB5fwTkzlusbWf-22_uSvWCBVRqgE4uAz50cKr9OudPtLyp3useF5OxiaDQODgrpNggprGAx-JrJYFwvnPtVLyyV5aCmXM9s4i8QppAW__AQRlpNcpvN3319cKSkZUKSkOWYK4sylESwY2bBT0UcGpIzaRBwY0ZpHD8AkyGGbAw3kKJtsNxY48y9e_duOKYrDVz0h2hJSh6QTavQIncR-Cy4jVWEoouOl_H9r46vc7rpvJ5Vhxyl0mxl-GjnFWlDarg2O4wOd0ac2VTzxl7rQ70uImlR01f-jp9Gjf3fChV3gVNozBJ1iWHBgNBu7LOXXiwn-nIAJ5i6NqWgAUeUv0lq8vxlh9dlorJXlL-KuOZTwe8waZMk5mj_7YUCw-NR_uJnEu1cD_vnneHpUefs7G8IeRKrhyy9lAMup0IrOeHS5pFm-F3AfIRuJBjucgJngM9kzHhFvNszyROUvHqQAbnn0LaAIsJBrGTmZa7lQskefzLU1A5PXT7tJwYzhAlAfQNMc5IMVCIy9ZJOVpZhutvca-42fG4ZqQ5ZFAkZgdUiirCkecooQzDofb7uXQ3J7udONXekeM70Ld7JDByiKXjrLLoSHGdwgGDMZETwNymjjhAy0NwZPj-96A8A3TJCSfLor6pHeW9MmEQ9uhy11R1giiLQqZTOXQcSfFeAgTQpRSPkQGokEqBwUGTMphwYGMv8mC-GcXl4SpcdxcpgNHdjLinWrHHpfZbHGiDMCHO-NaoJrhShXxSh1Hm2HVZ2gxMePNMMBQSw4Tfp5CoJrG_gkiResXXWo3mvxE5Rg64DcQZcOj9MIxiJ-1owXnaGR5-qYEQ45tV7cdn35hTXFr4upEIkt6UdZRRdGJYxXQ07Jz3ozQO5I6vQzvoA_XLNQmOK3-OCgIFrbvgEGwHJAxKtwjSwFPdiW3CNFrAFcQ5QW50pFpb2AibB55BkMjysZ5v5YOojuRz0u1vd3nm_Go2pQ9gWkeDSzAtH5fD58OtsfCFdZpAvgVQ7vOq1L5aXm7mSvS7ua7eztSvAWFmEemO_9ctqFG4XBj45YQRDZqm6-sCfEOMDWJwQSI15g7gNBk3mCgQHp0PRElVPlaCxJkdo38KdsGP4qvQtnEq41CpC9JnmizaTcrl4v_sfKK1Gez4fP0Z9a3zCtmlVpmJBM2GF2QrtN2-wjndwp9IYm5TGp09zDpsz4OEfizfklXdt2VrLnBAKzYk0SAD_LPqfuKXinltgiCnimIfN5R1ygf02QKtagdarW5Ek5EF1jUJQVhiLVpIRoRf97SRIcFMWfx8-bhV8vJQpx8cbkGCrXp34b4uYcP36vSZxPyKwVw_sVs3AroP1xnO39b3m7pfM1kZ1XqLkFfyV1-n97lqAO-XTEUYVc2Y4HOHQFSG6CyMmYvrypP01oj0WDYr7bEHGNTAWt3joo8E1fL14s7vNJW5DApjn3RUN_cJo55r59FWbubXUzOELm7m1cTPXDasXpOzZzfuZtWj_48f5pWjznahUXb0RedvehOOaKEKv7T2S9I2HX18TfuO18THEb8Qbbzs7DxCdhs4f828qD688Z_dfRWjHdD5isXGVe7qRT2g5TagBeqGwSntt93bbY6lVRDDlQSaV__ctP336FxQlRLg)

### Git Flow

* <https://stackoverflow.com/questions/16386323/following-git-flow-how-should-you-handle-a-hotfix-of-an-earlier-release>
* <https://reallifeprogramming.com/git-process-that-works-say-no-to-gitflow-50bf2038ccf7>
* [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
  * [Git Flow Considered Harmful](https://www.endoflineblog.com/gitflow-considered-harmful) -->

### GitHub Flow

### Release Flow

* <https://blogs.msdn.microsoft.com/devops/2018/04/19/release-flow-how-we-do-branching-on-the-vsts-team/>
* <https://devblogs.microsoft.com/devops/release-flow-how-we-do-branching-on-the-vsts-team/>
* <https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow>
* [Release Flow](http://releaseflow.org/)
* [Microsoft Release Flow](https://web.archive.org/web/20191016072552/https:/docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow)
  * [Criticism](https://github.com/MicrosoftDocs/devops-resource-center/issues/22)

### Nexus and Safe

* Is there any direct relationship between branching strategies and Nexus/Safe?
