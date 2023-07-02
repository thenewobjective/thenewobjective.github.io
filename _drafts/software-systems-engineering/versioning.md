# Versioning

A version is a name; a label for a specific state of a system.

## SemVer

- <https://semver.org/> (2009?)
- SemVer is incompatible with staggered releases?
- Anti Semantic versioning: <https://gist.github.com/jashkenas/cbd2b088e20279ae2c8e>
- <https://tom.preston-werner.com/2022/05/23/major-version-numbers-are-not-sacred.html>
- Is SemVer defined in terms of the API compatibility?
- What does SemVer mean for an end-user?
- WHat about Versioning run-away?
- Is SemVer a good balance between humans and machines?
- Version automation:
  - <https://soshace.com/setting-up-automated-semantic-versioning-for-your-nodejs-project/>
  - <https://semantic-release.gitbook.io/semantic-release/>
  - <https://medium.com/swlh/how-to-automatically-bump-npm-package-version-feee0e4dde6f>
  - <https://stackoverflow.com/questions/52312672/vsts-azure-devops-auto-increment-package-version>
  - This seems to imply a particular workflow. What if there is a different workflow? Scrum and Sprint versioning?
    - <https://medium.com/the-liberators/myth-in-scrum-new-features-are-delivered-only-at-the-end-of-the-sprint-3981fcdf198>

## NodeJS

NodeJS uses a syntax similar to SemVer, but with a different meaning. Instead,
an even/odd versioning scheme is used. Even versions are stable, odd versions are unstable.

## TeX

TeX uses an asymptotic versioning scheme. The version number asymptotically approaches pi.

## Chronological Versioning

- <https://www.robnagler.com/2015/04/11/Major-Release-Syndrome.html>

## Versioning is an anti-pattern

"Versioning is an anti-pattern" - Brendan Eich

"""
We on TC39 rejected opt-in versioning via a pragma, because:

1. modes fork code paths in engines & userland => bug farms;
2. shared heap means shared object semantics;
3. users copy/paste/concat all the damn time;
4. "now you have 2 problems" (rinse & repeat for next-gen quirks).
"""

"""
We also rightly decided not to impose opt-in versioning then, or ever after (1JS FTW).
"""

"""
Number-locked versioning and related protocols such as content-negotiation
via the Accept: header have failed hard on the Web, over and over.
"""

"""
The bigger problem is that engine implementors *and* language users do not want runtime
 "modes". The costs multiply and refract through the semantics. You can end up with a
 big explosion of cases, extra bug habitat, user confusion, code that should port from
 old to new mode but doesn't for obscure reasons found only if test coverage is perfect,
 etc.
"""

"""
To avoid further runtime explosion of cases, V8 folks asked for "no more modes" after ES5.
 Mozilla's Dave Herman later posted about what became known as "1JS" (more a slogan than a
  specific idea, apart from Dave's original proposal).

1JS as a general slogan is about how new syntax is its own opt-in gesture. In Dave's
original proposal, ES6 modules would opt their bodies into all new ES6 features. No need
for "use version 6" or `<script type="application/javascript;version=6">`. Experience with
opt-in has been bad to terrible in other languages. As Hixie (I think) said, "versioning
is an anti-pattern on the Web."
"""

"""
Backward compatibility is what binds us most. It is deeply engrained in the Web, and in
the Internet (see Postel's Law and my corollary). If someone could get past it and spin
up a new Web, they would soon enough face the same problems we face, perhaps with a bit
better up-front design helping them get a bit farther toward one idea of "perfection".

But the evolutionary system doesn't care about "perfect", it cares only about "better and
backward-compatible enough to hop to".
"""

- Web browser style release numbers become pointless. Formerly were milestones.
Now what are they?

- Perl 5 vs Perl 6
- Python 2 vs Python 3

But some changes have to be backwards incompatible. How do we handle those?
Security updates, etc.

<https://jonoscript.wordpress.com/2011/07/18/its-not-about-the-version-numbers-its-about-extension-compatibility-and-long-term-support/>

## Code Versioning vs Release Versioning

<https://liquidsoftware.com/blog/the-seven-deadly-sins-of-versioning-part-3-versions-in-the-code/>

## Work Iterations versioning

Iterations and versions are not the same thing. Iterations are a way of organizing
work. Versions are a way of organizing releases.

## Further Reading

<https://en.wikipedia.org/wiki/Software_versioning>

Notes

- Versions vs Revisions
- Hashcode as version?
  ○ Am I versioning for the user, or for the machine?
- Bertrand Meyer
  ○ <https://bertrandmeyer.com/2017/12/12/devops-concept-workshop-announcement/>
  ○ <https://bertrandmeyer.com/2010/10/24/the-cloud-and-its-risks/>
- If I change a UI or grossly update documentation, is that a Major version bump in SemVer if the API is the code is unchanged?
- What if the build system changes? WebPack => ParcelJS?
  ○ The compiled source could be equivalent, but the source code is different. Hence version vs revision are different
  ○ Release vs Version vs Revision?
- Licensing number vs version.

<https://en.wikipedia.org/wiki/Version_control>
 semantics control?

Spec-ulation Keynote - Rich Hickey
 <https://www.youtube.com/watch?v=oyLBGkS5ICk>

Semantic granularity.

<https://agilecoach.typepad.com/agile-coaching/2014/02/sprint-vs-iteration.html>

<!-- <https://www.infoq.com/articles/roy-fielding-on-versioning/> -->
<!-- versioning vs multiple people editing an NPM package (DEV environment) -->
<!-- <https://softwareengineering.stackexchange.com/questions/253306/why-is-build-number-an-abuse-of-semantic-versioning> -->

<!-- {Versioning is a form of naming} -->

<!-- What value is there in versioning if the strategy is to never roll back? -->

Long delays between releases can be considered just as harmful as long lived branches.
The longer the delay, the more likely that the changes will be incompatible with the current
state of the codebase as well as the expectations of the users.
Note Perl 5 vs Perl 6 and Python 2 vs Python 3.

Internal vs External versioning
<https://discourse.codinghorror.com/t/whats-in-a-version-number-anyway/620/21>
<https://discourse.codinghorror.com/t/whats-in-a-version-number-anyway/620/47>

For users the external version is important for expressing a magnitude of change.
For developers the internal version is important for expressing the state of the codebase.
