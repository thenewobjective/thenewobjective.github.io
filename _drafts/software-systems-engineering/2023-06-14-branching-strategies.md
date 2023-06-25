---
layout: post
icon: file-text
title:  "Branching Strategies"
date:   2023-06-25 13:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/branching-strategies
---

* TOC
{:toc}

## Introduction

<!-- // TODO -->

## The Limitations of Human Processes

<!--
"SRE is what you get when you treat operations as if it’s a software problem."

If it matters enough to be careful it matters enough to build a system
 -->

[![Evolution of the Programming Systems Product](https://mermaid.ink/img/pako:eNptkDFPAzEMhf-K5YGpN0CZbmCBCjEgVeqaxTq7bcQlAZ-DelT97ySUo-JASpTI-d7zi4_YJRZs8S0TK0W735OaiwDmrRdYvac-m08R0hZsL7DWtFMKwccdbMbBJAy1xrn7Uh0aOvgBHNbVNHflOFPwFE2Ksno5rOg4oY8SRan3H8JwBc_ko5Ut_OMAZ8EUsbkuhb85ZtDNBZq9LGfyKf5v6vbfJpfPIi4wiAbyXMZ3rFqHZUJBHLblyqQv1fJUuPzKZLJib0mx3VI_yAIpW9qMscPWNMsEPXiqLb-p0yeRH49J?type=png)](https://mermaid.live/edit#pako:eNptkDFPAzEMhf-K5YGpN0CZbmCBCjEgVeqaxTq7bcQlAZ-DelT97ySUo-JASpTI-d7zi4_YJRZs8S0TK0W735OaiwDmrRdYvac-m08R0hZsL7DWtFMKwccdbMbBJAy1xrn7Uh0aOvgBHNbVNHflOFPwFE2Ksno5rOg4oY8SRan3H8JwBc_ko5Ut_OMAZ8EUsbkuhb85ZtDNBZq9LGfyKf5v6vbfJpfPIi4wiAbyXMZ3rFqHZUJBHLblyqQv1fJUuPzKZLJib0mx3VI_yAIpW9qMscPWNMsEPXiqLb-p0yeRH49J)

## Why A Branching Strategy?

### Branching Strategy Defined

### The One Man Show

<!-- Below is a variation that avoids the need for cherry-picking and long-running release branches. -->

<!-- {Should be consistent with Methodology}
{Not all are created equal}
{You are going to find yourself contending with Conway's Law anyway, you might as well make it explicit} -->

<!-- Goals
* Enable a separation of labor
* Minimize Merge Conflicts
* [Avoid Cherry Picking](https://devblogs.microsoft.com/oldnewthing/?p=98215)
* Provide a clear versioning scheme
* Enable CI/CD 

CI: Continuous Integration
    constant running of the regression test suite to make sure that any
    breaking change is detected and corrected right away
    Every integration point needs gates
-->

## Version Control Systems (VCS)

### Centralized Version Control Systems (CVCS)

Examples:

* Subversion (SVN)
* Team Foundation Version Control (TFVC)

Criticisms:

* Branches are expensive
* Branches are slow
* Branches are hard to merge

### Distributed Version Control Systems (DVCS)

Examples:

* Git
* Mercurial (Hg)

### Versioning

<!-- <https://semver.org/> -->
<!-- <https://blog.codinghorror.com/whats-in-a-version-number-anyway/> -->
<!-- <https://www.infoq.com/articles/roy-fielding-on-versioning/> -->
<!-- versioning vs multiple people editing an NPM package (DEV environment) -->
<!-- <https://medium.com/swlh/how-to-automatically-bump-npm-package-version-feee0e4dde6f> -->
<!-- <https://softwareengineering.stackexchange.com/questions/253306/why-is-build-number-an-abuse-of-semantic-versioning> -->
<!-- <https://stackoverflow.com/questions/52312672/vsts-azure-devops-auto-increment-package-version> -->

## Branching Strategies

<!-- Avoid long-running branches -->

<!-- SCM: VCS: A Branching Strategy for Staggered and Long Term Releases -->

<!-- Creating a branch doesn't mean you have a strategy. -->

<!-- [![](https://mermaid.ink/img/pako:eNrNWG1P40YQ_isjS6deDxIg5dq7qKINJHBIQLgQ7lqJL2t746xwdn276wBF_PfOrF_iJE4I1YkeH5BZz8zOyzPPjHn0AhVyr-0Z_i3lMuBdwSLNJjcS8Cdh2opAJExaGB5fwTkzlusbWf-22_uSvWCBVRqgE4uAz50cKr9OudPtLyp3useF5OxiaDQODgrpNggprGAx-JrJYFwvnPtVLyyV5aCmXM9s4i8QppAW__AQRlpNcpvN3319cKSkZUKSkOWYK4sylESwY2bBT0UcGpIzaRBwY0ZpHD8AkyGGbAw3kKJtsNxY48y9e_duOKYrDVz0h2hJSh6QTavQIncR-Cy4jVWEoouOl_H9r46vc7rpvJ5Vhxyl0mxl-GjnFWlDarg2O4wOd0ac2VTzxl7rQ70uImlR01f-jp9Gjf3fChV3gVNozBJ1iWHBgNBu7LOXXiwn-nIAJ5i6NqWgAUeUv0lq8vxlh9dlorJXlL-KuOZTwe8waZMk5mj_7YUCw-NR_uJnEu1cD_vnneHpUefs7G8IeRKrhyy9lAMup0IrOeHS5pFm-F3AfIRuJBjucgJngM9kzHhFvNszyROUvHqQAbnn0LaAIsJBrGTmZa7lQskefzLU1A5PXT7tJwYzhAlAfQNMc5IMVCIy9ZJOVpZhutvca-42fG4ZqQ5ZFAkZgdUiirCkecooQzDofb7uXQ3J7udONXekeM70Ld7JDByiKXjrLLoSHGdwgGDMZETwNymjjhAy0NwZPj-96A8A3TJCSfLor6pHeW9MmEQ9uhy11R1giiLQqZTOXQcSfFeAgTQpRSPkQGokEqBwUGTMphwYGMv8mC-GcXl4SpcdxcpgNHdjLinWrHHpfZbHGiDMCHO-NaoJrhShXxSh1Hm2HVZ2gxMePNMMBQSw4Tfp5CoJrG_gkiResXXWo3mvxE5Rg64DcQZcOj9MIxiJ-1owXnaGR5-qYEQ45tV7cdn35hTXFr4upEIkt6UdZRRdGJYxXQ07Jz3ozQO5I6vQzvoA_XLNQmOK3-OCgIFrbvgEGwHJAxKtwjSwFPdiW3CNFrAFcQ5QW50pFpb2AibB55BkMjysZ5v5YOojuRz0u1vd3nm_Go2pQ9gWkeDSzAtH5fD58OtsfCFdZpAvgVQ7vOq1L5aXm7mSvS7ua7eztSvAWFmEemO_9ctqFG4XBj45YQRDZqm6-sCfEOMDWJwQSI15g7gNBk3mCgQHp0PRElVPlaCxJkdo38KdsGP4qvQtnEq41CpC9JnmizaTcrl4v_sfKK1Gez4fP0Z9a3zCtmlVpmJBM2GF2QrtN2-wjndwp9IYm5TGp09zDpsz4OEfizfklXdt2VrLnBAKzYk0SAD_LPqfuKXinltgiCnimIfN5R1ygf02QKtagdarW5Ek5EF1jUJQVhiLVpIRoRf97SRIcFMWfx8-bhV8vJQpx8cbkGCrXp34b4uYcP36vSZxPyKwVw_sVs3AroP1xnO39b3m7pfM1kZ1XqLkFfyV1-n97lqAO-XTEUYVc2Y4HOHQFSG6CyMmYvrypP01oj0WDYr7bEHGNTAWt3joo8E1fL14s7vNJW5DApjn3RUN_cJo55r59FWbubXUzOELm7m1cTPXDasXpOzZzfuZtWj_48f5pWjznahUXb0RedvehOOaKEKv7T2S9I2HX18TfuO18THEb8Qbbzs7DxCdhs4f828qD688Z_dfRWjHdD5isXGVe7qRT2g5TagBeqGwSntt93bbY6lVRDDlQSaV__ctP336FxQlRLg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#pako:eNrNWG1P40YQ_isjS6deDxIg5dq7qKINJHBIQLgQ7lqJL2t746xwdn276wBF_PfOrF_iJE4I1YkeH5BZz8zOyzPPjHn0AhVyr-0Z_i3lMuBdwSLNJjcS8Cdh2opAJExaGB5fwTkzlusbWf-22_uSvWCBVRqgE4uAz50cKr9OudPtLyp3useF5OxiaDQODgrpNggprGAx-JrJYFwvnPtVLyyV5aCmXM9s4i8QppAW__AQRlpNcpvN3319cKSkZUKSkOWYK4sylESwY2bBT0UcGpIzaRBwY0ZpHD8AkyGGbAw3kKJtsNxY48y9e_duOKYrDVz0h2hJSh6QTavQIncR-Cy4jVWEoouOl_H9r46vc7rpvJ5Vhxyl0mxl-GjnFWlDarg2O4wOd0ac2VTzxl7rQ70uImlR01f-jp9Gjf3fChV3gVNozBJ1iWHBgNBu7LOXXiwn-nIAJ5i6NqWgAUeUv0lq8vxlh9dlorJXlL-KuOZTwe8waZMk5mj_7YUCw-NR_uJnEu1cD_vnneHpUefs7G8IeRKrhyy9lAMup0IrOeHS5pFm-F3AfIRuJBjucgJngM9kzHhFvNszyROUvHqQAbnn0LaAIsJBrGTmZa7lQskefzLU1A5PXT7tJwYzhAlAfQNMc5IMVCIy9ZJOVpZhutvca-42fG4ZqQ5ZFAkZgdUiirCkecooQzDofb7uXQ3J7udONXekeM70Ld7JDByiKXjrLLoSHGdwgGDMZETwNymjjhAy0NwZPj-96A8A3TJCSfLor6pHeW9MmEQ9uhy11R1giiLQqZTOXQcSfFeAgTQpRSPkQGokEqBwUGTMphwYGMv8mC-GcXl4SpcdxcpgNHdjLinWrHHpfZbHGiDMCHO-NaoJrhShXxSh1Hm2HVZ2gxMePNMMBQSw4Tfp5CoJrG_gkiResXXWo3mvxE5Rg64DcQZcOj9MIxiJ-1owXnaGR5-qYEQ45tV7cdn35hTXFr4upEIkt6UdZRRdGJYxXQ07Jz3ozQO5I6vQzvoA_XLNQmOK3-OCgIFrbvgEGwHJAxKtwjSwFPdiW3CNFrAFcQ5QW50pFpb2AibB55BkMjysZ5v5YOojuRz0u1vd3nm_Go2pQ9gWkeDSzAtH5fD58OtsfCFdZpAvgVQ7vOq1L5aXm7mSvS7ua7eztSvAWFmEemO_9ctqFG4XBj45YQRDZqm6-sCfEOMDWJwQSI15g7gNBk3mCgQHp0PRElVPlaCxJkdo38KdsGP4qvQtnEq41CpC9JnmizaTcrl4v_sfKK1Gez4fP0Z9a3zCtmlVpmJBM2GF2QrtN2-wjndwp9IYm5TGp09zDpsz4OEfizfklXdt2VrLnBAKzYk0SAD_LPqfuKXinltgiCnimIfN5R1ygf02QKtagdarW5Ek5EF1jUJQVhiLVpIRoRf97SRIcFMWfx8-bhV8vJQpx8cbkGCrXp34b4uYcP36vSZxPyKwVw_sVs3AroP1xnO39b3m7pfM1kZ1XqLkFfyV1-n97lqAO-XTEUYVc2Y4HOHQFSG6CyMmYvrypP01oj0WDYr7bEHGNTAWt3joo8E1fL14s7vNJW5DApjn3RUN_cJo55r59FWbubXUzOELm7m1cTPXDasXpOzZzfuZtWj_48f5pWjznahUXb0RedvehOOaKEKv7T2S9I2HX18TfuO18THEb8Qbbzs7DxCdhs4f828qD688Z_dfRWjHdD5isXGVe7qRT2g5TagBeqGwSntt93bbY6lVRDDlQSaV__ctP336FxQlRLg) -->

 <!-- prevent branching from master? -->

<!-- " The disaster I see with having one branch is either every commit has 
to be final and non breaking or the single branch is filled with unfinished 
features, bugs and breaking code." 
Which can be mitigated somewhat by feature flags.
-->

<!-- 
For example, how many developers are actively working on the project? 
Are all developers on the team highly trusted? What regression testing is in place?

team consists of a handful of very experienced people who have been working together
for many years on this project, with the benefit of very mature automated integration 
testing. Such a team is ideal for working in one master branch (or “trunk”, in 
Subversion-speak). But imagine if there were thirty developers on the team … or if 
half the team were complete novices … or what if there were no unit tests or contracts
… what would happen then? I think the core developers would quickly realise that they 
needed to take tighter control of the project by some means or other; and one tried 
and proven way to do this is by moving to a DVCS such as git.
-->

<!--
uncontrolled and unmanaged branching is guaranteed to fail.
-->

## Single Branch

* [Trunk Based Development](https://trunkbaseddevelopment.com/)

### Feature Flags vs Feature Branching

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

Choosing a Branching Strategy. If you don't , you're going to deal with Conway's law anyway. Might as well make it explicit.
https://featureflags.io/feature-flags-vs-branching/
https://stackoverflow.com/questions/19434222/feature-toggles-vs-feature-branches
https://www.youtube.com/watch?v=JOr4QeIjyW4

compare with Versioning strategy

https://dev.to/shubhamjain/the-case-against-pull-requests-and-how-to-fix-it-533g
https://bertrandmeyer.com/2013/09/30/the-laws-of-branching-part-1/
https://bertrandmeyer.com/2013/10/03/the-laws-of-branching-part-2-tichy-and-joy/
https://trunkbaseddevelopment.com/
https://jamesmckay.net/2017/01/martin-fowler-and-feature-branches-revisited/

-->

### Release Tags vs Release Branches

<!-- {Why tag a release instead of branch} -->

<!-- <https://stackoverflow.com/questions/9810050/why-should-i-use-tags-vs-release-beta-branches-for-versioning/9810336> --> -->

<!-- release notes -->

#### References

* <https://jamesmckay.net/2017/01/martin-fowler-and-feature-branches-revisited/>
* <https://martinfowler.com/articles/feature-toggles.html>

### Branch Folders

<https://docs.microsoft.com/en-us/azure/devops/repos/git/require-branch-folders?view=azure-devops&tabs=browser>

## Versioning

<!-- Figure out how to do versioning

during iteration planning
 choose feature(s) that can be completed in that iteration
  What iteration is chosen if reintroduced? When it starts? when it finishes?
  
 create a feature branch for each selected feature
  branch under features/feature-43
  
<https://news.ycombinator.com/item?id=7350432>
<https://web.archive.org/web/20160310192046/http://www.stucharlton.com/blog/archives/000589.html>

<https://saebamini.com/how-to-version-your-net-nuget-packages-libraries-and-assemblies-azure-yaml-pipelines-example-using-net-core-cli/>

Software Configuration Management (SCM)
    <https://en.wikipedia.org/wiki/Software_configuration_management>

<!-- ## Staggering

<https://nkdagility.com/a-better-way-than-staggered-iterations-for-delivery/>

Staggered releases

How to hotfix deploy?
Say February release branch is deployed to prod
March is in progress and has been merged to master and currently in UAT
Need a hotfix on current february release.

Can't go to master due to subsequent changes? -->

<!-- ## Hotfix management

<https://stackoverflow.com/questions/16386323/following-git-flow-how-should-you-handle-a-hotfix-of-an-earlier-release>
<https://reallifeprogramming.com/git-process-that-works-say-no-to-gitflow-50bf2038ccf7> -->

## References and Further Reading

* [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
  * [Git Flow Considered Harmful](https://www.endoflineblog.com/gitflow-considered-harmful)
* [Release Flow](http://releaseflow.org/)
* [Microsoft Release Flow](https://web.archive.org/web/20191016072552/https:/docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow)
  * [Criticism](https://github.com/MicrosoftDocs/devops-resource-center/issues/22)
* [Adopt a Branching Strategy](https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops&viewFallbackFrom=vsts)
* [Stop Cherry-Picking, start merging](https://devblogs.microsoft.com/oldnewthing/20180312-00/?p=98215)
* [Tags vs Release Branches](https://github.com/MicrosoftDocs/azure-devops-docs/issues/1109)
* [Semantic Versioning](https://semver.org/)
* [The laws of branching (part 1)](https://bertrandmeyer.com/2013/09/30/the-laws-of-branching-part-1/)

## Notes

### Uncategorized

Auto creating a dev server for branches?

 <https://blogs.msdn.microsoft.com/devops/2018/04/19/release-flow-how-we-do-branching-on-the-vsts-team/>

 <https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=vsts#why-not-use-tags-for-releases>
 <https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/use-git-microsoft>
 <https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow>
<https://stackoverflow.com/questions/7726949/remove-tracking-branches-no-longer-on-remote>
<https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow>
<https://blogs.msdn.microsoft.com/devops/2018/04/19/release-flow-how-we-do-branching-on-the-vsts-team/>
 <https://stackoverflow.com/questions/3184555/cleaning-up-old-remote-git-branches#3184742>
<https://stackoverflow.com/questions/13064613/how-to-prune-local-tracking-branches-that-do-not-exist-on-remote-anymore#17029936>
<https://blogs.msdn.microsoft.com/devops/2018/04/19/release-flow-how-we-do-branching-on-the-vsts-team/>
 <https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=vsts#why-not-use-tags-for-releases>
 <https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/use-git-microsoft>
 <https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow>
<https://stackoverflow.com/questions/7726949/remove-tracking-branches-no-longer-on-remote>
<https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow>
 <https://stackoverflow.com/questions/3184555/cleaning-up-old-remote-git-branches#3184742>
 <https://stackoverflow.com/questions/13064613/how-to-prune-local-tracking-branches-that-do-not-exist-on-remote-anymore#17029936>
 <https://blogs.msdn.microsoft.com/devops/2018/04/19/release-flow-how-we-do-branching-on-the-vsts-team/>

<https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/branching-strategies-with-tfvc?view=azure-devops&viewFallbackFrom=vsts>

<https://nvie.com/posts/a-successful-git-branching-model/>

<https://www.cloudbees.com/blog/branching-strategy>

<https://devblogs.microsoft.com/devops/release-flow-how-we-do-branching-on-the-vsts-team/>

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
Branching strategy as a one-man show?
Partial classed introduced in C# and VB.Net partially due to
the check-out/check-in mindset and Perforce?

* Depending on who you ask, Microsoft uses [Trunk Based Development](https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow), or [Release Flow](https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/use-git-microsoft), or [something else](https://blogs.msdn.microsoft.com/oldnewthing/20180312-00/?p=98215) entirely.
Microsoft: [Adopt a Git Branching Strategy](https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops&viewFallbackFrom=vsts)

<https://learn.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops&viewFallbackFrom=vsts>

<https://railsware.com/blog/git-clean-up-in-local-and-remote-branches/>

 • Integration Branches
 • <https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops>
 • <https://devblogs.microsoft.com/oldnewthing/20180323-01/?p=98325>
<https://stackoverflow.com/questions/56024285/how-to-set-default-branch-policies-for-future-branches-in-azure-devops>

Azure devops manage git behind vpn
High rate of feature versions
Uat tag triggers

staggered releases? Staggered iterations?

rough git-flow

* There is one release deployed to a production server (Release A)
* There is one release in progress (Release B)

```text
+--------+                         1.0.0      1.1.0                           2.0.0                        2.0.1                 2.1.0
|        |
| Master +-------------+-------------^----------^--------+----------------------^----------------------------^------+--------------^------------------------------------------->
|        |             |             |          |        |                      |                            |      |              |
+--------+             |             |          |        |                      |                            |      |              |
                       |             |          |        |                      |                            |      |              |
+-------------+        |             |          |        |                      |                   1.1.1    |      |              |
|             |        |             |          |        |                      |                            |      |              |
| Release 1.x +--------v--+-------^--+--+-----^-+-----------------------------------------------+-----^------+      |              |
|             |           |       |     |     |          |                      |               |     |             |              |
+-------------+           |       |     |     |          |                      | +----------+  |     |             |              |
                          |       |     |     |          |                      | |          |  |     |             |              |
         +-----------+    |       |     |     |          |                      | | Hotfix 1 +--v-----+             |              |
         |           |    |       |     |     |          |                      | |          |                      |              |
         | Feature A +----v-------^     |     |          |                      | +----------+                      |              |
         |           |                  |     |          |                      |                                   |              |
         +-----------+                  |     |          |                      |                                   |              |
                                        |     |          |                      |                                   |              |
                      +-----------+     |     |          |                      |                                   |              |
                      |           |     |     |          |                      |                                   |              |
                      | Feature B +-----v-----+          |                      |                                   |              |
                      |           |                      |                      |                                   |              |
                      +-----------+                      |                      |                                   |              |
                                                         |                      |                                   |              |
                                         +-------------+ |                      |                                   |              |
                                         |             | |                      |                                   |              |
                                         | Release 2.x +-v--------+--------^----+-----------------------------------v---+------^---+------------------------------------->
                                         |             |          |        |                                            |      |
                                         +-------------+          |        |                                            |      |
                                                                  |        |                                            |      |
                                                 +-----------+    |        |                          +-----------+     |      |
                                                 |           |    |        |                          |           |     |      |
                                                 | Feature C +----v--------+                          | Feature D +-----v------+
                                                 |           |                                        |           |
                                                 +-----------+                                        +-----------+
```
