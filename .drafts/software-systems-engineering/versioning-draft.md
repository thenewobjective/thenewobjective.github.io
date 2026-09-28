---
title: A Version Is a Name, Not a Contract
date:   2026-09-28 12:00:00 -0600
---

## Introduction

> "Personally, I like to think of version numbers as dogtags for your software. Like dogtags,
> they're primarily designed for use in the event of an emergency."

&mdash; [Jeff Atwood](https://blog.codinghorror.com/whats-in-a-version-number-anyway/)

A version is a name; a label for a specific state of a system. That is all it is, and yet we ask
it to do enormous work. We ask the label to identify an artifact precisely enough that machines
can reproduce it. We ask it to promise that one body of code will work with another. We ask it to
announce the magnitude of a change to human beings deciding whether to care. Three jobs, one
number.

The industry's most ambitious attempt to make the number carry all of this weight is
[Semantic Versioning](https://semver.org/) (SemVer), the MAJOR.MINOR.PATCH convention that governs
most package ecosystems today. Its premise is that a version number can be genuinely *semantic*:
that the digits can tell you, mechanically, whether an upgrade is safe. This article argues that
the premise is false, that the promise was never kept, and that the recurring disasters of
versioning (Python 2 to 3, Perl 5 to 6, Firefox's rapid-release collapse) are not failures of
numbering discipline but the predictable result of asking one label to serve three masters.

The remedy is not a better numbering scheme. It is a division of labor.

## One Label, Three Jobs

A version number is asked to answer three different questions for three different audiences, and
the questions do not share an answer.

- **Identity**: which exact bytes? The audience is machines: package managers, build systems,
  reproducible builds.
- **Promise**: can my code depend on yours? The audience is integrators: every consumer of a
  library, API, or protocol.
- **Magnitude**: how much changed, and should I care? The audience is humans: users, operators,
  and executives deciding whether to set aside an afternoon.

These are not variations of one question. Identity is answered perfectly by a content hash: a git
SHA, an OCI digest, a lockfile entry. It requires no semantics at all. Magnitude is a judgment
about *significance*, which is irreducibly human and irreducibly contextual; a one-line fix to a
load-bearing function may matter more than a year of feature work. And a promise about
compatibility is a claim about the future behavior of strangers, which is precisely the kind of
claim software cannot mechanically verify in advance.

Notice that the industry already knows this. Serious products have long carried two numbers: an
*internal* one that engineers use to organize work (Microsoft Word 2003 was, internally, version
11) and an *external* one that marketing deploys. Engineering numbering must be coherent and
stable; marketing numbering must change to generate interest. The disease begins when one scheme
is asked to serve both audiences. Firefox 1.5 "appearing out of nowhere" was the sound of a
marketing event colliding with an engineering number.

SemVer is the project of collapsing all three jobs into a single integer triple. The failures
that follow are not accidents; they are the friction of three incompatible questions wearing one
label.

## The False Promise of Pain-Free Updates

SemVer's promise is that upgrades can be evaluated without thinking: declare a public API,
communicate changes to it through the digits, take every MINOR and PATCH blindly, and brace only
for MAJOR. The spec frames this as the escape from
[dependency hell](https://en.wikipedia.org/wiki/Dependency_hell), the twin miseries of version
lock (unable to upgrade) and version promiscuity (assuming too much compatibility). The promise
is false in both directions.

> "SemVer tries to compress a huge amount of information (the nature of the change, the
> percentage of users that will be affected by the change, the severity of the change) into a
> single number. And unsurprisingly, it's impossible for that single number to contain enough
> meaningful information."

&mdash; [Jeremy Ashkenas](https://gist.github.com/jashkenas/cbd2b088e20279ae2c8e),
["Why Semantic Versioning Isn't"](https://gist.github.com/jashkenas/cbd2b088e20279ae2c8e)

The compression fails in both directions. A change that breaks one percent of users and a change
that breaks all of them receive the same MAJOR bump, so the ninety-nine percent perform the
"dependency dance" for a change that never touches them. Meanwhile MINOR bumps break things
routinely, because whether a change breaks anyone is not knowable by the producer. The SemVer FAQ
responds to this with an appeal to virtue: incompatible changes "should not be introduced
lightly", and the number exists to make you think. A contract enforced by conscience is not a
contract.

The empirical record is worse than the theoretical one. The most trusted software in the
ecosystem does not practice SemVer: Node, Rails, Python, Ruby, npm itself, the Linux kernel,
TypeScript, ESLint, Next.js. Some claim to and violate it; some disclaim it while their dependents
apply SemVer constraints to them anyway. And every bug is a violation. A MINOR upgrade that ships
a regression breaks your application, and no diff of public API signatures will explain why.

The deepest failure mode is subtler than API changes. A consumer may depend on a library's
*behavior*: on a race condition resolving a particular way, on an undocumented ordering of
operations. The producer changes private internals, the API diff is empty, the number says MINOR,
and the application breaks. The producer did not violate the letter of SemVer. The consumer was
broken by it. Believing that three digits can protect an application from regressions mistakes a
summary for a proof.

[Rich Hickey](https://en.wikipedia.org/wiki/Rich_Hickey) presses this point to its foundation in
his [Spec-ulation](https://www.youtube.com/watch?v=oyLBGkS5ICk) keynote: you cannot enumerate
what your users depend on, so you cannot know at release time what will break. What follows is
uncomfortable. If breakage is unknowable in advance, the MAJOR bump is not information. It is a
license.

## A License to Break

If SemVer were merely ineffective, it would be harmless. It is worse than ineffective, because
the number does not just signal breakage; it makes breakage look responsible.

> "SemVer seems to give us a license to ignore backward and forward compatibility."

&mdash; [Rob Nagler](https://gist.github.com/jashkenas/cbd2b088e20279ae2c8e)

The license has a price, and the price has a shape. Backwards incompatibility costs N times M: N
packages, each breaking M dependents, the product propagating through the dependency graph.
Backwards compatibility costs N: each package maintains its own compatibility once. Since M is
typically orders of magnitude larger than N, the accounting is not close.

The license would be less objectionable if breaking were necessary. It mostly is not. A shell
archive published in June of 1985 still unpacks and builds today with an unmodified
[Makefile](https://en.wikipedia.org/wiki/Make_(software)); forty-year-old C and Fortran programs
still compile; the Linux kernel's first rule, in Torvalds' formulation, is that regressions are
not caused. [IPv6](https://en.wikipedia.org/wiki/IPv6) was designed to interoperate with IPv4
rather than replace it wholesale. Where the will exists, compatibility has been maintained for
decades, and the tools are old and well understood: shims, feature tests, compatibility layers,
additive APIs with sensible defaults. These are not museum pieces. They are the load-bearing
systems of the software world.

What remains is culture. "Move fast and break things" needs a mechanism for making breaking look
like diligence, and the major version number is that mechanism. It launders design failure into a
digit. If you ship growth, nothing major happened. If you take things away without growth, the
honest announcement is a new name and a migration guide, not an incremented integer. The major
bump is a ceremony at the boundary of a process, mistaken for the process itself.

## Paperwork Breakage

The case against versioning does not rest on argument alone. There is an incident where the
versioning mechanism itself, with no underlying change of any kind, broke working software at
scale.

When Firefox moved to a rapid release schedule in 2011, extensions broke in two ways. Real
breakage: an API the extension relied on changed. And what
[Jono Xia](https://jonoscript.wordpress.com/2011/07/18/its-not-about-the-version-numbers-its-about-extension-compatibility-and-long-term-support/)
called *paperwork* breakage: the extension's metadata file declared "compatible with Firefox 3.5
to 4.0", so Firefox 5 disabled it, even though nothing about the extension was wrong.

> "an extension can lose compatibility for bureaucratic reasons; its 'paperwork' isn't
> up-to-date; even if there's absolutely nothing wrong with it"

Read that again. The version check was the bug. The incompatibility was manufactured by the
compatibility mechanism itself. Users could not distinguish real breakage from paperwork
breakage, so they experienced both as unreliability, and a genuinely good process change (rapid
release) was nearly killed by the numbering attached to it. Xia's diagnosis generalizes: "under
the smoke of the version number argument there is the fire of a real problem."

The same shape of failure appeared in the design of JavaScript itself. The TC39 committee
considered and rejected opt-in version pragmas, for reasons
[Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich) summarized bluntly: "modes fork code
paths in engines & userland => bug farms". A version is a runtime *mode*: once `if (version >= 6)`
branches exist, every code path forks, the test matrix doubles, and combinatorial bugs accumulate
in the forks. The committee's escape, known as "1JS", was to make new syntax its own opt-in
gesture: ES6 modules opt their bodies into ES6, and no pragma is ever required. Ask the code a
question about capability; never ask it a question about a label.

Perl 6 and Python 3 are the same experiment conducted at language scale: a number used as the
boundary of a new world, with the old world stranded across it. Python 3 required roughly twelve
years to complete its migration. Perl 6 fractured its community for over a decade. A version
number that must break compatibility is not a signal. It is a fault line.

## A Cache in Costume

There is a more forgiving way to understand what a version number actually is, and it explains
both why we cannot live without them and why they keep failing.

Compatibility verification is expensive but sound. In principle a package manager could *compute*
compatibility: diff the public type signatures of two releases, or run a consumer's test suite
against a producer's candidate release, and report exactly what breaks. Ashkenas proposed exactly
this, and others have proposed package managers validate SemVer claims by executing the
dependency test suites they already have. Nobody does it, because it is expensive.

So we cache. The version number is the cache: a cheap, unsound, human-computed summary of an
expensive computation, invalidated by convention (a MAJOR bump flushes the cache) and trusted by
tooling (`^1.2.3` means "trust every entry below major 2"). Under this model, every famous
versioning disaster is a cache-coherence failure. NumPy 1.25 silently overrides the builtins
`min` and `max` for `import *` users; the cache said "minor, safe"; the entry was stale. Firefox
disables working extensions; the cache keyed on the wrong metadata entirely. A library changes
private behavior a consumer implicitly depended on; the producer honestly reported "compatible"
because the API diff was empty. No stricter specification can prevent a stale cache entry, any
more than a stricter comment format prevents stale comments.

The sound version of the computation exists. It is simply expensive, and the industry has decided,
mostly without admitting it, to pay in outages instead.

Two functions of the number do survive scrutiny.

First, **total ordering**. "Later than" is the one meaning a version number can still be trusted
to carry, and Nagler states it as the whole truth: "the only thing enforceable by any package
manager is that version numbers increase over time." When a browser accumulates version numbers
into the hundreds and the number degrades into a monotone clock, that is not a scandal. It is the
last honest function left.

Second, **identity**, if we let machines own it. Hashes already do this work: lockfiles, digests,
SHAs. The corollary is that identity does not belong in the source tree. A version file inside a
codebase means every release requires a code change, so the history fills with commits that
distinguish nothing from real changes; this is why Docker and Go forbid versions in source
entirely. Version the artifact your consumer touches, derive the number at build time, and keep
identity out of the repository. CoreOS, for its part, promoted the *same compiled artifact*
bit-for-bit across alpha, beta, and stable channels: identity by artifact, promise by channel.
The version number was never the load-bearing part.

## Ask What It Can Do, Not What It Is

If the number's remaining honest jobs are ordering and identity, then the mature alternative to
version-gated code is not a better number. It is detection.

Nagler again, naming the trap:

> "Version testing is using the version number to drive the way the software behaves."

His remedy is old, boring, and works: feature tests and shims. Ask whether the capability exists;
neither know nor care which version introduced it. The web platform settled the same question the
same way: feature detection rather than user-agent sniffing, capability rather than label. The
direction of the coupling is the whole argument. Version-gating couples your code to a claim
someone else made about their software. Capability-gating couples your code to reality.

One versioning scheme deserves admiration for a different reason: TeX, whose version number
asymptotically approaches pi, adding a digit with each defect found. The scheme encodes the one
thing version numbers usually hide: the maintainer's intent. pi approaching says the design is
finished and only defects will be fixed. Knuth turned the version number into a statement of
authorship. It communicates nothing to a package manager and everything to a person. That it
could not scale to a million-package ecosystem is not a refutation. It is a reminder of what
version numbers were for in the first place: talking to people.

## In Defense of the Number

The strongest defense of SemVer comes from its author, revisiting his own invention, and it
deserves a fair hearing.

Tom Preston-Werner's 2022 retrospective,
["Major Version Numbers are Not Sacred"](https://tom.preston-werner.com/2022/05/23/major-version-numbers-are-not-sacred.html),
is not a defense of the status quo; it is an attack on SemVer *practice* from the inside. His
prescriptions: any breaking change ships in a MAJOR release, period, no excuses; majors should be
frequent and small rather than rare and enormous; and the marketing meaning that major versions
used to carry must move somewhere else, in his case to epoch *names* (RedwoodJS's "Arapaho
Forest"). His operational evidence is serious: at GitHub, hoarding a Rails upgrade into one
giant major produced a branch so divergent from main that it had to be thrown away. Small,
frequent, well-documented, automated migrations beat rare whoppers.

There is real wisdom here, and it concedes more than it asserts. If the major number can carry
only the breakage signal, while magnitude, story, and identity must move to names, release notes,
and codemods, then the number was never the contract. The contract is the migration tooling and
the changelog. Preston-Werner's own design proves it.

Practitioners who run strict SemVer report that it can work, and their reports are credible. One
team maintained, by its account, years of liberal MAJOR bumps, `@internal` annotations, mandatory
changelogs explaining and repairing every break, and a culture where "breaking or non-breaking is
not a think/hope situation". No breaking MINOR in memory. But observe what actually did the work:
not the digits. The discipline, the annotations, the changelog, the tests, the diff review before
release. The number was the summary, not the source of truth. Remove those practices and the
identical number constrains nothing, as the violator list above demonstrates.

So the concession is genuine: among disciplined teams, a SemVer number is a better rough signal
than no signal, and it is cheap. The boundary of this essay's claim is correspondingly precise.
It is not that versions should be deleted. It is that a number cannot carry a promise, and any
tooling that treats it as one will eventually pay for the confusion.

## What to Do Instead

The argument converts into a short list of practices, each coupled to a claim above.

- **Version the artifact, not the source.** Identity belongs to hashes; derive release numbers at
  build time; never let a release require a version-bump commit in the codebase.
- **Publish migrations, not promises.** If a breaking change is unavoidable, ship a codemod or an
  executable upgrade guide with it. The automation is the contract; the digit is only the
  ceremony.
- **Gate on capability, not on version.** Feature tests and shims in code, feature detection on
  the web, and never branch behavior on a label you do not control.
- **Treat the changelog as the contract.** A human-curated changelog communicates behavior change
  better than three digits. Read it on MINOR upgrades, not only on MAJOR ones.
- **Keep three clocks.** A revision, expressing the state of the codebase for developers; a
  version, expressing magnitude of change for users; a release, expressing cadence and support
  for operations. Iterations organize work; versions organize releases; one number cannot do
  both.
- **When compatibility must break, break as a process.** Deprecate, overlap, parallel-ship,
  migrate, then remove. Perl 6 and Python 3 are what happens when a number is substituted for the
  process.

## Conclusion: Dogtags

Return to the epigraph. Atwood compared version numbers to dogtags: primarily for use in the event
of an emergency. He was right, and more right than he intended, because dogtags identify the
fallen. They do not keep anyone alive.

The number's honest jobs are narrow: which came first, and, loosely and socially, how big a
change. Everything else we have piled onto it (machine identity, compatibility promises,
magnitude, narrative) belongs to other instruments: hashes, contracts, tests, changelogs, names.
SemVer is a headline pretending to be a contract, and the disasters of versioning are what happens
when readers mistake it for the latter.

A version is a name. Give the name to humans. The machines, and the promises, deserve better
instruments.

## References and Further Reading

- [Semantic Versioning 2.0.0](https://semver.org/)
- [Why Semantic Versioning Isn't](https://gist.github.com/jashkenas/cbd2b088e20279ae2c8e), by
  Jeremy Ashkenas, with extensive discussion
- [Major Version Numbers are Not Sacred](https://tom.preston-werner.com/2022/05/23/major-version-numbers-are-not-sacred.html),
  by Tom Preston-Werner
- [Major Release Syndrome: A Case for Chronological Versioning](https://www.robnagler.com/2015/04/11/Major-Release-Syndrome.html),
  by Rob Nagler
- [It's Not About The Version Numbers](https://jonoscript.wordpress.com/2011/07/18/its-not-about-the-version-numbers-its-about-extension-compatibility-and-long-term-support/),
  by Jono Xia
- [The Seven Deadly Sins of Versioning (Part 3): Versions in the Code](https://liquidsoftware.com/blog/the-seven-deadly-sins-of-versioning-part-3-versions-in-the-code/),
  by Fred Simon
- [What's In a Version Number, Anyway?](https://blog.codinghorror.com/whats-in-a-version-number-anyway/),
  by Jeff Atwood
- [Spec-ulation](https://www.youtube.com/watch?v=oyLBGkS5ICk), keynote by Rich Hickey
- [Software versioning](https://en.wikipedia.org/wiki/Software_versioning), Wikipedia
- [DevOps Concept Workshop](https://bertrandmeyer.com/2017/12/12/devops-concept-workshop-announcement/),
  by Bertrand Meyer
