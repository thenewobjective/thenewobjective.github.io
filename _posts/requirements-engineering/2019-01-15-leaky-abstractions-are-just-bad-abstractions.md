---
layout: post
icon: file-text
title:  "Leaky Abstractions Are Just Bad Abstractions"
date:   2019-01-15 12:00:00 -0600
category: Requirements Engineering
permalink: /requirements-engineering/leaky-abstractions-are-just-bad-abstractions
redirect_from:
    - /leaky-abstractions-are-just-bad-abstractions/
commentThreadId: 17
---

## Introduction

In 2002 Joel Spolsky [argued](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) that **“All non-trivial abstractions, to some degree, are leaky”**.  As a result, there have been numerous programmers who have used this as an excuse to throw away numerous abstractions in favor of lower-level alternatives. The original argument though is a [straw man](https://en.wikipedia.org/wiki/Straw_man) and the perpetuation of it is actively harmful to the industry.

## The Straw Men Cometh

Joel’s examples and the numerous other examples I’ve seen subsequently by proponents all fall into the same categorical error, namely: ascribing an expectation or requirement on an abstraction or model that was never there to begin with. To counter some of the specific claims:

1. TCP never specified that it would guarantee successful delivery of all data in all situations, nor did it guarantee a speed for delivery. It is very clear in what it means with the terms “reliable” as well as the rules about when and how a 0. connection will timeout and be closed: <https://tools.ietf.org/html/std7#section-2.6> . Oversimplifying this by assuming guaranteed transmission and speed is simply incorrect. Recall [L Peter Deutsch's](https://en.wikipedia.org/wiki/L._Peter_Deutsch) [Fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing):
    * The network is reliable;
    * Latency is zero;
    * Bandwidth is infinite;
    * The network is secure;
    * Topology doesn't change;
    * There is one administrator;
    * Transport cost is zero;
    * The network is homogeneous.

2. Iteration strategy over a two-dimensional array + Page Faults: There is no programming language in common use today that makes a guarantee about such iteration performance. Assuming one is not the fault of the language that didn’t specify one. The abstractions did not fail nor leak in these cases either.
3. Complaints about SQL performance: Again, the same problem as #2. Running two semantically equivalent queries will give you the same result, but there was no performance guarantee. Assuming one is again not the fault of the abstraction but with the expectation
4. And so on and so on...

## Expectations Meet Reality

Expectations of reality and reality itself are two different things. If an abstraction/model does not explicitly make claims about some aspect of interest it does not mean that it has leaked or failed, it’s simply the wrong one for what you’re concerned with.  Build a better model or use one which claims to fulfill your requirements (and can demonstrate it).
