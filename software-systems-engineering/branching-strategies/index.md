---
title:  Branching Strategies
date:   2023-07-05 22:00:00 -0600
category: Software Systems Engineering
---

![Branching Stragegies](/media-library/software-systems-engineering/branching-strategies-hero.png)

## 1. Introduction

Some programs are ephemeral; they are run once and then discarded. Examples include CLI scripts and one-off report
generators. These are often referred to as throw-away since we can recreate them on-demand with little effort.
Other programs are longer-lived; they are run multiple times, are maintained, enhanced, and collaboratively
developed. This code and its associated operations require coordination, communication, and care. Since these
operations matter enough to be careful, they matter enough to use a system. The system we use is called a
[Version Control System (VCS)](https://en.wikipedia.org/wiki/Version_control) which is a subtype
of a [Software Configuration Management (SCM)](https://en.wikipedia.org/wiki/Software_configuration_management) system.

Adopting a VCS is not enough though. We must also establish a strategy for using it. Just like buying a car does not
automatically get you to work, using a VCS does not automatically get you a working operational system. You must also
have a strategy for using it. Not all strategies are created equal, and some are better than others. In this post,
will explore the various strategies and their trade-offs.

## 2. Version Control Systems (VCS)

Before we can discuss branching strategies, we must first understand the VCS landscape. There are two main types of VCS:

* Centralized Version Control Systems (CVCS)
* Distributed Version Control Systems (DVCS)

### 2.1 Centralized Version Control Systems (CVCS)

CVCSs are the older of the two types. They are characterized by a single, central repository that is shared by all
developers. This repository is the source of truth, and all changes must be pushed to it. Examples include Subversion
(SVN) and Team Foundation Version Control (TFVC). These systems were criticized for being slow and a single
point of failure. Branching was also expensive and slow with merges being even more so. This expensiveness of branching
and merging (via the reverse [Conway's Law](/software-systems-engineering/conways-law-and-consequences/#the-inverse))
led to developers avoiding doing either. This avoidance led to ad-hoc human processes for managing changes
which led to errors and frustration. There was a shining light in the darkness, however, and that was
[Perforce](https://www.perforce.com/) which supported cheap branching and merging.

### 2.2 Distributed Version Control Systems (DVCS)

DVCSs are the newer of the two types. Unlike CVCSs, DVCSs do not have a single, central repository. Instead, each
developer has their own. This repository is a complete copy of the entire project and its history which
allows developers to work offline and commit changes locally. When ready, the changes can be pushed to a remote
repository. In practice, however, a particular repository is often designated as the source of truth
[often aligned](/software-systems-engineering/conways-law-and-consequences/#the-law) with an organization's workflow.

It might be more accurate to refer to these as Change Control Systems (CCS) instead of Version Control
Systems as versioning implies a single source of truth which may not be the case.
The most popular DVCSs are Git and Mercurial. For the remainder of this post, we will focus on Git.

## 3. Why A Branching Strategy?

> Turning and turning in the widening gyre<br>
> The falcon cannot hear the falconer;<br>
> Things fall apart; the centre cannot hold;<br>
> Mere anarchy is loosed upon the world...

&mdash; [W. B. Yeats](https://en.wikipedia.org/wiki/W._B._Yeats). ["The Second Coming"](https://en.wikipedia.org/wiki/The_Second_Coming_(poem))

Having a versioning system in hand is not enough; it would just be a glorified backup system. The problems that
remain are how to manage simultaneous development, experimental changes, and their subsequent integration. Branching
is the answer to these problems. Creating branches is like creating a parallel universe. All that happens within
is contained and isolated from others.

The challenge is when we want to share something between branches. This sharing is referred to as merging. Back to our
analogy: while our universes were parallel, they are now converging and problems can arise since any
inconsistencies between them will be revealed.

![Mirror Dimension from Dr Strange](/media-library/software-systems-engineering/mirror-dimension-dr-strange.webp "[The Mirror Dimension](https://marvel.fandom.com/wiki/Mirror_Dimension) from [Doctor Strange (film)](https://en.wikipedia.org/wiki/Doctor_Strange_(2016_film))")

As one might expect, the longer the branches exist, the more likely they are to diverge and more difficult it
will be to merge them.

This is why we need a strategy for coordinating these branches and their merges. The strategy should be designed to
minimize conflicts as well as the number of branches and merges required to keep cognitive load low.

## 4. Branching Strategies

The two primary forces that drive the design of a branching strategy are the two sides of
[Conway's Law](/software-systems-engineering/conways-law-and-consequences/):

* The communication structure of the organization (How your team is organized)
* The technical structure of the implementation (How your code is organized)

If these two are not aligned, then the strategy will be suboptimal, awkward, and even harmful. For example, if the
organization is arranged into teams that are responsible for various parts of the codebase, then the strategy
should reflect that. Another example is if the implementation has multiple long-running releases to be maintained,
then the strategy should reflect that. The strategy is also a workflow; it has a set of rules that govern how
changes are made and how they are integrated.

### 4.1 Single Branch

![Single Branch](https://mermaid.ink/img/pako:eNq9j0EKwjAURK8isw7F2hqTrBVXrtxJNp8mtkHTlJiCWnp3a0WP4G7m8x78GVAFY6FQu7SP1DU66naxqIL3Lv0zg8Hb6MmZ6ZnhfddIjfVWQ03RULxo6HacuL4zlOzOuBQi1JmuN8tAfQrHR1tBpdjbL7R1VEfyP8rO0uEzeV7O0FF7CsF_xalCDbhDyXUmZVGuZF5wwVeC4QFVFHm2lHKTCy6E5OWSjwzP2c_HF2Zdbsc?type=png "Single Branch Strategy")

The simplest strategy is to have a single branch. The idea is that all changes are made directly, and no other branches
are created. This approach is simple and easy to understand. It is a non-strategy that gives you version
control and little else.

This strategy is appropriate for small projects and tightly-knit teams: a wiki, a personal website, a small library, etc.
This can also be usable for larger projects when the codebase is simple and modularized with defined areas of responsibility.
The idea is that if you make slight changes, then at worst you should only break a small part of the system which should then
be easy to fix. An example of this is the [EiffelStudio](https://bertrandmeyer.com/2013/09/30/the-laws-of-branching-part-1/)
project.

If the codebase is not modularized/simple, then chaos can ensue. A seemingly small change can have
[far-reaching consequences](https://en.wikipedia.org/wiki/Butterfly_effect) and potentially break the entire system
in a way that is difficult to fix. Assuming that the codebase **is** modularized/simple, then this strategy is still
risky when the team is large and/or inexperienced. The reason is that as the team grows, the number of changes
increases, and the likelihood of overlap and breakages increases. This is especially true for inexperienced developers
who are more likely to make mistakes. This can be mitigated somewhat by code reviews, pair programming,
[Continuous Integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration), and other human processes.

#### 4.1.1 Feature Flags

It is tempting to want to hold on to this strategy as long as possible since it is the simplest and easiest to understand.
But as the team grows and the codebase becomes more complex, there is a tendency to introduce
[feature flags](https://en.wikipedia.org/wiki/Feature_toggle) to hide unfinished or broken code. This can be a useful
technique, but it can also be abused and lead to significant technical debt. Feature flags used in this way are little
more than an attempt to simulate branching and merging without actually doing it. You end up releasing code into
production that you know is not ready. This is a dangerous practice that can lead to
[catastrophic results](https://dougseven.com/2014/04/17/knightmare-a-devops-cautionary-tale/) if not managed properly.
Additionally, the code will be [littered with branching logic](https://web.archive.org/web/20030716230644/http://www.chris-lott.org/resources/cstyle/ifdefs.pdf)
to support the feature flags which can lead to a combinatorial explosion of testing permutations.

![Complete Graph](/media-library/software-systems-engineering/complete-graph.png "Complete Graph. Credit: [Wikipedia](https://en.wikipedia.org/wiki/Complete_graph)")

If you find yourself in this situation, then it is time to move on to a more sophisticated strategy such as Feature Branching.
The key difference between Feature Branching and Feature Flags is that when a feature branch goes wrong, it only goes wrong
in the development environment or integration branch. When a feature flag goes wrong, it goes wrong in production.

#### 4.1.2 Methodologies

From the above, you might notice that this strategy corresponds and couples well with the
[Extreme Programming (XP)](https://en.wikipedia.org/wiki/Extreme_programming) methodology which emphasizes
simplicity, tight communication in a team, and incremental development with frequent releases. The basic
idea (as described by [Bertrand Meyer](https://www.amazon.com/Agile-Good-Hype-Bertrand-Meyer/dp/3319051547/ref=sr_1_1?crid=O7JHT1XXCOOB))
is *"Increment then Simplify"*. You define a set of tests that represent the requirements of the new functionality.
The tests fail because the implementation does not exist yet. You then write the code to make the tests pass. This is
called [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development). Once the tests pass,
you [refactor](https://en.wikipedia.org/wiki/Code_refactoring) to make it simpler and more maintainable. Rinse and
repeat. The [Crystal Clear](https://activecollab.com/blog/project-management/crystal-methods) methodology would also
work well with this strategy.

When interpreted as a methodology, DevOps is also a good fit for this strategy due to its emphasis on automation and
short feedback loops.

![Single Branch with release version tags](https://mermaid.ink/img/pako:eNqdkLFOwzAURX8lurOJ4rqpa89FTEzdkJdHbBKrdRwZB7VE-XfSoLKxdHtXOufq6U5oonXQaH1-STR0Jpm-KJoYgs__3UWmVhcGX7ysyuqJzkNHBg-Y7y4_JBqAIbgUyNvl9-nGGeTOBWdwwyyl01Lczws3Dpaye7Y-xwT9QedPx0Bjjsdr30DnNLo7dPDUJgp_lFul19-F1qEYBurfYgx3cYnQEy7Qqi6VEvWWc6VqwaViuEILocrdlsv9Xu4qKeqNnBm-1wI-_wBqwnrU?type=png "Single Branch with release version tags")

Release management is straightforward with this strategy. You could simply deploy the latest commit to production,
or you could tag a commit with a release version and deploy that. The latter is more disciplined and is often used
in conjunction with the [Semantic Versioning](https://semver.org/) scheme. A Continuous Delivery (CD) pipeline
can be configured to automatically deploy the latest commit to a production environment, or it can be configured to
wait for a specific tag and deploy the associated commit to the appropriate environment(s).

Here is one tagging scheme that can be used:

| Tag | Description |
| --- | ----------- |
| `v#.#.#` | Production (PROD) |
| `v#.#.#-rc.#` | Release Candidate (<abbr title="User Acceptance Testing">UAT</abbr>) |
| `v#.#.#-beta.#` | Beta (Internal Testing - QA / TEST) |
| `v#.#.#-alpha.#` | Alpha (Development - DEV) |

Depending on the project, you may not need all these tags. For example, you may not need a `beta` tag if you
do not have a QA environment nor an `alpha` tag if you do not have a DEV environment. If the latest commit is always
deployed and history is not important, then you may not need any tags at all.

### 4.2 Task Branching

![Task Branching](https://mermaid.ink/img/pako:eNqVUr1uwjAQfpXo5hBiEwx4btWpU7fKy5GYJE1sR45dlSLevQ6UilBA7Xb2fX93uh3kppDAoazdk8WuElbo3ChVu6FaW9R5FQnwvbRT1VboN3LqsG8mhM4EjNFnVSXzxngXKaz18KGkLeVtnchhyUP7PU1Ikk6w7So8qo8T9KUxhUI9Xftywr79L73GFPem6rYdisGNzRd3Uv_Of8_3bwpXN3Al1NkKaFjBWjq8mO-_We4muFQZ2RMBEEPAB2oRjmMndBR6rpJKChhgBdomWOt9wPmuQCcfi9oZC3yDbS9jQO_My1bnwJ318gR6qLG0qH5Q8kB6Pp7g4RJj6FC_GqNOxPAEvoMP4JSyZMlWS7pKCWVLRmYxbIFnWZaQFUlTkpHZglE638fweVAg-y8gtADG?type=png "Task Branching Strategy")

This strategy is sometimes referred to as "feature branching", but I prefer the term "task branching" because it is
more accurate in its association with a task in an issue tracking system and the scope of the changes it includes.
The idea is to have a single branch, but to create a new branch for each task. This augments the Single
Branch strategy by encoding (and potentially automating) some "communication" and "coordination" aspects of a
team's process into the VCS in a form that is enforceable and time invariant as individuals come and go. In other
words, this enables trust by reducing the need for constant communication and coordination.

Another benefit of this strategy is that it can eliminate the need for a developer to check in code before it is
reviewed. This is a widespread practice in teams and methodologies that use the Single Branch strategy.
The idea instead is that the developer creates a branch for a task, makes changes, and then creates a pull request
to merge the changes into `main`. The pull request can be used to review the changes and run automated
tests against it instead of waiting until those changes are merged into `main`. This can help to
eliminate the risk of breaking the build and reduce the time it takes to fix it.

This strategy is not without its own wrinkles of course. If there are many developers working on many tasks,
then the number of branches can grow quickly. This can be mitigated by deleting branches after they are merged
into the `main` branch but <abbr title="In my Experience">IME</abbr> this is not always done and not
because of laziness. Sometimes it is useful to keep a branch around for a while after it is merged in case there
is a need to revert the changes. This is especially true if the changes are large and/or complex. In this case
the branch can be used to help isolate the changes and to help with debugging.

In the above diagram you will notice that each task branch name is prefixed with a "folder" name
`user/<username>/task-<task-id>`. This is a convention that can be used to organize the branches
in the repository and mitigate the problem of branch pollution.

To configure and enforce branch folders in Azure DevOps you can use the following
guide: "[Require branches to be created in folders](https://learn.microsoft.com/en-us/azure/devops/repos/git/require-branch-folders?view=azure-devops&tabs=browser)".
Git also supports a "hook" concept for [enforcement](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e)
of conventions like this.

You will also notice the branch names include an ID number. This convention correlates the branch to the task
in an issue tracking system. You may be fortunate enough to have an issue tracking system that can be integrated
with your VCS that automatically links the two together; if not, this convention fills the gap. In my experience
this is helpful when you have a team member who was working on a task and then left the team or is on extended leave.
Coupled with the folder convention, it makes it easy to find the branch and task in the repository.

As mentioned above, when it comes time to integrate the task branch back into `main`, a pull request
is used. This ensures that the changes are consistent with the team's standards and conventions. It often consists of
"gates" such as code review, automated testing, build, and code analysis. Most Git hosting services provide a user
interface to configure these gates. For example:

* [GitHub article](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
* [Azure DevOps article](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser)

While the pull request is pending, the developer can continue to work on other tasks in parallel. After the pull request
is approved and the gates are passed, the task branch can be merged into `main`. This usually happens automatically
with your chosen Git hosting service.

Tasks, being generally small in scope, often do not require a lot of time to complete nor changes to the code base.
This means that the task branch will usually be merged into `main` without conflicts. If there are conflicts,
they should also be straightforward to resolve.

Merging introduces another wrinkle. There are different [strategies](https://www.atlassian.com/git/tutorials/using-branches/merge-strategy)
for merging and each has its own pros and cons when it comes to the history of the repository and conflict resolution. In the
context of the Task Branching strategy, we know that the task branch will be limited in scope and only exist for a brief
period. As a work abstraction, it is irrelevant in detail to the rest of the team. This means that the history of
the task branch is not important and can be discarded/collapsed. Therefore, the
["squash merge"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits)
strategy is a good fit. This will create a single commit on the `main` branch that contains all changes from the task
branch. This keeps the history of the `main` branch clean and easy to understand.

After the merge, the task branch should be deleted. If it is not deleted, it will continue to exist in the repository
and pollute the branch list (hence the folder convention mentioned above). Git hosting services usually provide a way
to delete these branches with a single click or do it automatically after the merge.

#### 4.2.1 Methodologies

The development methodologies compatible with this strategy are [Scrum](https://www.scrum.org/resources/what-is-scrum),
[XP](https://www.extremeprogramming.org/), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development),
[Lean](https://en.wikipedia.org/wiki/Lean_software_development), [Kanban](https://en.wikipedia.org/wiki/Kanban_(development)),
and any other methodology that has an explicit concept of a "task" or "story" that is worked on for a short period of time.

Release versioning here works the same as the Single Branch strategy. Choose a particular commit on the `main` branch
and tag it with a version number which can then be used to build and release an artifact.

### 4.3 Integration Branching

Task branching is a great way to organize the work of a single developer, but what happens when multiple developers
need to work on closely related tasks? How do you know the **runtime** behavior of the integrated code will be correct?
By integrating code from multiple developers into `main`, you run the risk of breaking that branch
and making it unusable for others. Since it is desirable to always have the `main` branch in a "release-ready" state,
this is a problem. Another problem is that CI/CD processes are not instantaneous. If these
take a long time to run, it can slow down the team's operational tempo as the number of changes
increases.

By applying the [Fundamental Theorem of Software Engineering](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering),
we can see how the Integration Branching strategy applies. It extends the Task Branching strategy by
introducing a new branch called the "integration branch". This is used to integrate multiple sub-branches
together instead of integrating them directly into `main`. This allows `main` to remain in a "release-ready" state
and enables the CI/CD process to run in parallel to the day-to-day development process.
The integration branch can also have a reduced set of gates compared to `main` which can increase team velocity
(i.e., sanity checks instead of a full testing suite). The most common integration branch used in practice is called
"dev" or "develop".

![Integration Branching Strategy](https://mermaid.ink/img/pako:eNqVU01zgjAQ_SvOnhEJFtSc2-mpp946uawkApUkTkicWsf_3kDVKhVLT9nM-9iXzeweMs0FUMhL-2xwUzDDVKalLG1TLQ2qrBgx4GLLoAdztTATWRXoVmJisV6PSTw9sguRrbWzf7DOnhfVj_LcWwqTi36rkcWcenhLwiiMxkthsZNCYqkujVrna1lH0TB-vbXOteYS1WTp8nE6RGHfZVlVTdGkTZPZnYffGkF_22EOx1BXA7yR6WIUZMgEvW1HYrLbHz84-73EXZOr3uT_cQkDCMBjnsb9DuyZGnnMFkIKBg2No1l7S3XwPLfhaMUTL602QFdY1SIAdFa_7lQG1BonTqTHEnOD8swSrejle9PahQtgg-pNa3kS-ivQPXwAJWkSPiwSQpIkmc79EcAOaEziMJ5Fi3QRkXQ-S8khgM9WTw5fuZVQ5A?type=png "Integration Branching Strategy")

The integration branch (`dev`) is created from `main` branch at the beginning of the project and then
never deleted. Since `dev` was created from `main`, and all task branches must be created from
and integrated back into `dev`, there is no need to ever merge `main` into `dev` again (forward merging).

#### 4.3.1 Tagging and Release Versioning

Often merges to `dev` automatically trigger a CI/CD process that builds and deploys the software to a
development environment. This allows the team to quickly see the results of their work and catch any obvious
problems not caught by the automated checks. If the velocity of the team is high enough, this can be done
manually or on a schedule instead, reducing the number of deployments to some acceptable level for
environment stability. It would be hard to get any work done if the development environment were constantly
changing as you were trying to sanity-check your work. If a tag is used to trigger the deployment, the `-alpha`
suffix would be appropriate.

Since commits to the `dev` branch and deployments to the associated development environment can occur multiple
times a day, it becomes challenging to perform longer running and manual tests. A stable testing/QA environment
is desirable. The deployment to this environment can be triggered manually or on a longer term schedule
(e.g., nightly). In the above diagram, this is represented by the tag with a `-beta` suffix for the manually triggered
use case. Note that this tag is added to the `dev` branch and not the `main` branch reflecting the fact that
it is a work-in-progress.

Assuming QA is satisfied, the `dev` branch can then be merged into `main` from that tag.
A question is raised again: how should the merge be done? When you look at the history of `main`
what do you want to see? My suggestion is a single event for every `dev` merge therefore a
["squash merge"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits)
like what is done with Task Branches. As a reminder, this will create a single commit on the `main` branch
that contains all the changes from `dev` since the last merge. This also provides an opportunity
to define release notes for the sum of work done on `dev` branch for this iteration.

With `dev` merged into `main`, the `dev` branch is NOT deleted. It is kept around for the next iteration
of development. This new point in time on `main` can now be considered a release candidate. You could
deploy to production from this point, but it is probably a good idea to do some final testing in a
production-like environment (e.g., UAT and/or staging). Depending on your organization, this may be
a manual process or an automated one. If it is manual, then a tag with the `-rc` suffix would be appropriate.
Note that this tag is added to the `main` branch and not the `dev` branch.

If the release candidate is stable enough (it passes UAT) then by definition it should be ready for
production. This can be triggered by tagging the version without a suffix (`v1.2.3`), making it official.
The release notes associated with this tag/commit can be generated via several methods. Here are a few
options:

* <https://blogs.sap.com/2018/06/22/generating-release-notes-from-git-commit-messages-using-basic-shell-commands-gitgrep/>
* <https://semantic-release.gitbook.io/semantic-release/>
* <https://github.blog/2021-10-04-beta-github-releases-improving-release-experience/>

#### 4.3.2 Hotfixes

We have formalized and introduced several organizational processes to support the development of new features
and the release of new versions of our software. But what happens when something goes wrong in production that
needs to be fixed immediately (hotfixed)? What if the fix is so simple that it can be done in a few minutes? Do we really
need to go through the entire process of creating a task branch, merging it into `dev`, merging `dev` into `main`,
and then deploying to production? In Single Branching and Task Branching strategies, this is a moot point but once
you introduce an integration branch, it becomes a valid question.

The challenge is, where do we make the fix? If we create a task branch from `dev` there is other work in progress
that we do not want to deploy to production prematurely. We also do not want to dig through the commit history
of `dev` to find the commit that introduced the bug. So, we are left with two options:

1. Create a task branch from `main` and [cherry-pick](https://stackoverflow.com/a/9339460/153209) the fix into `dev` and `main`
2. Create a task branch from the tag that represents the last release and merge it into `main` and `dev`

Cherry Picking in general I find to be a bad idea as it leads to merge conflicts and hidden problems that can
bite you hard later. Raymond Chen of Microsoft has an excellent article describing the pitfalls of cherry-picking:
[Stop cherry-picking, start merging](https://devblogs.microsoft.com/oldnewthing/20180323-01/?p=98325).

So that leaves us with option two.

![Hotfix branch](https://mermaid.ink/img/pako:eNqlk81ygjAUhV_FuWtEAhYk63a66qq7DpsriZBKEicER-v47g20UsWf2unuMvecL-dkyA5yzThQKIR9NrgqM5OpXEspbDvNDaq8HGXA-DqDK7um5mYiqxKbBZ9YrJdjEkbf6pLnS93YX1Q982j6cfZnS24Kfh01slhQt14TP_CD8ZxbHKSQKNQxqCMPbCY_i94HOK1cF1ozieoQYfqPNhdYR7nI7Tqnsey7FFXlhlLbhdg42MPlYCfFyT33dZ0_YJ1dYtv6ryByTygHHljas8EDt3ZK5n7tXaZGbm1LLnkGrZKhWTqq2jtds2Jo-RMTVhugC6xq7gE2Vr9uVQ7UmoYfRI8CC4OyV_HO9PL1gLp35MEK1ZvW8mB0n0B3sAEaBqkfTsPUtQzSMIlnkQdboGQW-mk8CxISRHEcJFGy9-CjI5D9J_QtPLg?type=png "Hotfix branch")

We choose the tag that represents the release with the bug and create a task branch from it.
Note that this release tag is a common ancestor of both `main` and `dev` branches. Next the fix is made and
the option of tagging the commit with a `-beta` suffix is available if we want to evaluate the fix in DEV
before promoting to a higher environment. Note that normal development continues on `dev` for the next release
while the hotfix is being worked on.  Once the fix is ready, the task branch is merged into `main` and
then tagged as appropriate for release (e.g., `v1.0.1` or `v1.0.0-rc` if additional testing is required).

You now have a new release that contains the fix, but what about `dev`? They were working on the next release
but still contained the bug. The fix needs to be merged into `dev` as well. As was mentioned earlier, the hotfix
branch was created from a tag that is a common ancestor of both branches, so the merge should be
straightforward. If it is not for some reason, you have the luxury of time to figure it out since the fix is
already in production. Once the fix is merged into `dev` life goes on as normal. Note that when the hotfix
branch is deleted any tags referencing commits on that branch
[persist](https://stackoverflow.com/questions/61568292/do-git-tags-persist-after-a-branch-is-deleted), so you
do not have to worry about losing the tag.

#### 4.3.3 Methodologies

If we want to associate a methodology with this workflow, it seems clear that it is not XP due
to the extra indirection involved. This workflow aligns more closely with the Scrum methodology.
Scrum's most important feature is the "closed-window" rule that aims to freeze requirements for a
sprint once it has started. So, there is a stable and identifiable increment of work that can be released
at least every sprint. Since the increment of work is identifiable, it can be named with a tag.
Any other methodology that rhymes with this aspect of Scrum would also be a good fit.

### 4.4 Feature Branching

Not all tasks are considered equal and independent. A collection of tasks may be required to implement a
more ambitious piece of work before integration. This is where Feature Branching comes in.
A feature branch can be thought of as an integration branch specialized for a logically related set of tasks.
This is sometimes referred to as "task branching" or "topic branching", and sometimes even
"component branching". The term "feature" is more appropriate and general in my opinion and should be used
to describe such a larger body of work.

![Feature Branching](https://mermaid.ink/img/pako:eNqdU01zgjAQ_SvOnhFJwIKc2-mpp946XFZYgZEkTAhOreN_b7TQWgSn9ZRk9n1sXrIHSFVGEENemmeNdZHoRKZKiNKcdmuNMi1mCWS0S2CitiE0raZFt86ZPwltG9ILURXYbmhhsNnOGb9CX-wKSreqNTdMBOmcppVnBvPYlneey1xvjlVdoMu-qL-7wkrtqMK0ZwfLG33d3eGYy2iPvHPv9U8PcCE2ZjbQWZPBgYjAUv6oWMkBRafjrtNPHVyFdCOQYCz3JlcqEyi7QJbBfd8hGAl7RPriwnz4H_6c9bXOP7PmXdbggC1bZGYn8JDImS2bggQlcEJmqLdWVR4trq0zNPSUlUZpiDdYNeQAtka97mUKsdEt9aDHEnON4htFZ9LL15yfx92BGuWbUqIn2iPEB3iHmEXcjaKVH0VhyL0HHjiwhzhauWwZen7AQ-az6OjAx5nNjp_1ynhQ?type=png "Feature Branching")

Feature Branching is an extension of Integration Branching as it is still desirable to integrate multiple
features before promotion to `main`. Tagging and build/release automation works the same as well
except that now we have multiple features that may require independent runtime environments for testing
integrated task work. You might notice a hierarchy of branches being formed here from `main` to `dev` to
`feature` to `task`. You will also notice that the feature branches are consolidated under the `feature/` folder.
This convention complements the existing `user/` folder.

#### 4.4.1 Environment contention

Numerous features in development may require independent runtime environments for
testing integrated task work as multiple may be in progress at the same time. In the diagram you can
see `-alpha` tags being used to denote the deployment of these branches. These can of course be elided
if automation is in place to deploy to a specific environment based on the branch name or another
implicit identifier. Feasibility of this approach depends on the infrastructure and tooling available
to you.

Heroku has a concept of [review apps](https://devcenter.heroku.com/articles/github-integration-review-apps)
which can be used to create a separate environment for each feature branch. Gitlab has a similar
concept under the same [name](https://docs.gitlab.com/ee/ci/review_apps/). If you utilize
Docker, a parameterized docker-compose file can be used to create a separate environment
for each feature branch.

It is a valid concern to wonder if there is too much tagging going on here in general to support
deployments. The answer is that it depends on the size of your team and the number of features being
worked on simultaneously. Also, context is king. If each feature branch was tightly coupled to
a specific environment and the latest commit was always deployed to that environment, then the tagging
gains you nothing. Similarly, in the `dev` branch, if you are always deploying the latest commit to
a test environment, then `-beta` tags are redundant, etc. However, if the team size grows
significantly, and you have multiple features being worked on simultaneously, then the tagging
becomes more useful to identify what is currently deployed.

#### 4.4.2 Feature Branches vs Feature Flags

As mentioned under the [Single Branch](#411-feature-flags) section,
[Feature Flags](https://en.wikipedia.org/wiki/Feature_toggle) are a runtime mechanism for enabling or
disabling features. They have many legitimate use cases and are a great way to decouple deployment
from release. An example of this is the Azure DevOps "Preview Features" option which allows you to
enable or disable features in the UI:

![Azure DevOps Preview Features](/media-library/software-systems-engineering/ado-feature-flags.png "Azure DevOps Preview Features")

However, they are often abused as a mechanism hiding incomplete work and emulating feature branches.
This latter use case is an antipattern and should be avoided.

#### 4.4.3 Methodologies

Feature Branching is compatible with Scrum only if the features can be completed within a single sprint.
Otherwise, Scrum will have challenges due to its narrow incrementalism and
[greedy algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm) for maximizing short-term subjective
["value"](https://www.scrum.org/resources/blog/five-types-value).

A more appropriate methodology for Feature Branching is [Feature Driven Development](https://en.wikipedia.org/wiki/Feature-driven_development)
which has a direct and explicit focus on features. This methodology can lean towards a waterfall approach
or an agile approach depending on how the features are identified and prioritized (up-front or incremental respectively).

Other compatible methodologies include:

* [Rational Unified Process](https://en.wikipedia.org/wiki/Rational_Unified_Process)
* [CMMI](https://en.wikipedia.org/wiki/Capability_Maturity_Model_Integration)
* [V-Model](https://en.wikipedia.org/wiki/V-Model_(software_development))

This is of course not an exhaustive list.

### 4.5 Release Branching

The strategies discussed so far have all assumed a single production deployment. However, in some
cases, you may have multiple deployed versions of your software. This is common in
enterprises where you may have multiple customers on different versions of your software.
Microsoft Office (before the subscription model) is a good example of this, so is Windows. These
products are not simply fire-and-forget. They require ongoing maintenance and support. This is
especially true for enterprise software where you have a service level agreement (SLA) with
your customers. In this case, you may have a "current" version of your software that is deployed
to new customers, and a "legacy" version of your software that is deployed to existing customers.
This is where Release Branching comes in.

![Release Branching](https://mermaid.ink/img/pako:eNq1k11LwzAUhv9KOFB2U-uSbmuXSz_wRvHCO-lN1h7bsDUZWarO0v9umq2TiQMVRgj5eN_z8CYkLeS6QOAQBC2RSlpOWjIqpb0zYl2N_GpT6bdrXdfS3osFrtzmi1htMCSjWkh1ZYTKq0dToHFKTLq-BUFmMtX3AdXPcw_pZwtfRDIwuEKxwcv9eEEz-HISK0ruTK80Gru2k7xcYb7UjSV9gGPyQTrJrtGU6CuP-PRX-JPB2Y_BWR98r_wrMzuZmUV0QJ_nSs6Op98u5q-nd_UQghOdUrgn3GaKOM1WWGMGva0QZukQqnO-Zl0Ii7eFtNoA371gEI3VT1uVA7emwcF0I0VpRH1woS962H0U_19CWAv1rHU9FLol8BbegdM0jpI4ZYyOpzMas0kcwha4G6N0Mp9NknmaThNGWRfChyfQ7hMvOzX0?type=png "Release Branching")

Each branch represents a different version of the software. You will notice the release branches are prefixed
with `release/` for consistency with the earlier mentioned conventions `feature/` and `user/`.

The "master" branch is the current version of the software that may or may not be deployed yet.

If independent releases start to diverge significantly and add new features completely unique to each release, then
you may want to consider splitting the codebase into separate repositories and projects as they are becoming
different products. The common features can be shifted to common libraries or packages (e.g., NuGet, NPM, etc.)

There is a common degenerate case of Release Branching where there is only a single release branch.
[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
and [Azure Data Factory (ADF)](https://praveenkumarsreeram.com/2020/06/27/azure-data-factory-all-about-publish-branch-adf_publish/)
are examples of this. They utilize this as an alternative to tagging.

This strategy is an extension of any other strategy discussed thus far. It is not mutually exclusive.
As you might have guessed this would also be compatible with any of the mentioned software methodologies as well.

## 5. Conclusion

This is far from a complete discussion of branching strategies. There are many other strategies that
have been proposed and used such as "Component Branching", and "environment branching". There are also
many variations of the strategies discussed here. The goal of this article is to provide a starting
point for discussion and to provide a framework for evaluating branching strategies. Feel free to
share your thoughts in the comments below.

## 6. References and Further Reading

* [Trunk Based Development](https://trunkbaseddevelopment.com/)
* [Adopt a Branching Strategy](https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops&viewFallbackFrom=vsts)
* [Stop Cherry-Picking, start merging](https://devblogs.microsoft.com/oldnewthing/20180312-00/?p=98215)
* [Release Flow](http://releaseflow.org/)
* [Release Flow: How We Do Branching on the VSTS Team](https://blogs.msdn.microsoft.com/devops/2018/04/19/release-flow-how-we-do-branching-on-the-vsts-team/)
  * [Criticisms of Release Flow](https://github.com/MicrosoftDocs/devops-resource-center/issues/22)
* [Tags vs Release Branches](https://github.com/MicrosoftDocs/azure-devops-docs/issues/1109)
* [Semantic Versioning](https://semver.org/)
* [Check-in before code review is an antipattern](https://jamesmckay.net/2015/07/check-in-before-code-review-is-an-antipattern/)
* [Martin Fowler and feature branches revisited](https://jamesmckay.net/2017/01/martin-fowler-and-feature-branches-revisited/)
* [Software Branching and Parallel Universes](https://blog.codinghorror.com/software-branching-and-parallel-universes/)
* [On the Evilness of Feature Branching - The Problems](https://thinkinglabs.io/articles/2022/05/30/on-the-evilness-of-feature-branching-the-problems.html)
* [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
  * [Git Flow Considered Harmful](https://www.endoflineblog.com/gitflow-considered-harmful)
* [Feature Driven Development [FDD]](https://activecollab.com/blog/project-management/feature-driven-development-fdd)
