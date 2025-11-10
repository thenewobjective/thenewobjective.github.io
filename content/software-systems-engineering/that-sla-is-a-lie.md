---
title:  That SLA is a Lie
date:   2021-01-04 12:00:00 -0600
---

With the commoditization of cloud infrastructure there have been a deluge of SaaS and PaaS offerings.
These are an inevitable consequence and have tradeoffs of their own when using them in your organization.
Usually these services are accompanied by an SLA with an availability guarantee (i.e., 99.5%). Depending
on the architecture of these services though this number can be misleading at best and result in
more downtime than expected.

## Downtime Estimates

An SLA (Service Level Agreement) generally has an uptime guarantee. These are presented as an availability percentage
such as 99%, 99.5%, 99.99%, etc. From these you can calculate downtime over a period of time. For example to calculate
the downtime for a year given a 99.9% uptime guarantee:

There are `24 x 365.2425 = ~8766` [hours in a year](https://en.wikipedia.org/wiki/Year).

`99.9% of 8766 hours = 8757 hours`

`8766 hours - 8757 hours = 9 hours` downtime per year

Downtime per month: `9 hours / 12 = 45 minutes`

Downtime per week: `45 / 4 = 11 minutes 15 seconds`

Downtime per day: `9 hours / 365.2425 = ~1 minute 29 seconds`

We can repeat this for other common SLA offerings:

| SLA Percentage | Downtime per year | Downtime per month | Downtime per week     | Downtime per day     |
|----------------|-------------------|--------------------|-----------------------|----------------------|
| 99             | 3d 15h 39m 36s    | 7h 18m 18s         | 1h 49m 35s            | 14m 24s              |
| 99.5           | 1d 19h 49m 48s    | 3h 39m 9s          | 54m 47s               |  7m 12s              |
| 99.9           | 9h 00             | 45m                | 11m 15s               | 1m 29s               |
| 99.95          | 4h 22m 58.8s      | 21m 55s            | 5m 29s                | 43s                  |
| 99.99          | 52m 35.8s         |  4m 23s            | 1m 6s                 | 8.6s                 |
| 99.999         | 5m                | 26s                | 6.6s                  | 0.86s                |

## Composite SLAs

Knowing the downtime for a particular service offering is all well and good but with many cloud offerings
that SLA is not the entire story. Many have 3rd party dependencies with their own SLAs. This practically means
that there is a composite SLA that needs to be calculated to know the reality of what your downtime may be.

Let's take as a contrived example a simplistic website consisting of an application server and a database server hosted
on your favorite cloud provider:

::content-figure{src="https://mermaid.ink/img/pako:eNpdjl1LwzAUhv9KODBQyEqTdjMJY-CYd3rjLgSbXmTLcSuapsRUnKX_3ViZF96dj-d9eAc4eIug4BhMdyL3jzrolpDbqnrCPdlh-MCw2oe1lJmc1TWZz9dkU11tN_9-cnZdAwWHwZnGJt_wo9EQT-hQg0qjNeFVg27HxPWdNRHvbBN9APVi3t6Rgumj353bA6gYerxA28akbu6Pwin08Nt6Kk-hM-2z9-4STCuoAT5B8UXGZZHnbMlyIXjJCgrndGYy4zwvF0tRFuymEGKk8DUZ2PgNoYlUGg?type=png" alt="Simple Website Architecture" caption="Simple Website Architecture"}
::

The SLA for each component is defined clearly as 99.9% for the Web Server and 99.99% for the Database Server respectively. What is the SLA for the entirety? Given that both are required for the website to function, the
SLA is the composition of both component SLAs:

`99.9% x 99.99% = 99.89%`

That's right, the composition of the SLAs is lower than each individual rating. In this case if you assumed 9 hours of
downtime in a year (99.9%) then you would be wrong as the actual time would be more than half an hour longer. This may
seem a trivial difference but for more complicated architectures you can see how this adds up.

For a more realistic example let's say I have a self-hosted CMS solution with a couple load balanced delivery servers:

::content-figure{src="https://mermaid.ink/img/pako:eNqNkM1ugzAQhF8FrRSplUgUftLEVpUDcW9waW_FOWzATVDBRo6pShHvXocI0qqX-rSz_nZ2NR1kKhdA4aixPjnxM9dcOk4cpbHC3ImwRJkJ_XjQW0IWhMz2V2DHvDTdKWmENA4TZfEhdDtSs_1E-f-gWJTeMTR4wLO4LbofPZKbRYISj6Ky5R-TOJrPt_aqX8qfjrWSRdNRP1UyCHChErrCIrdZdJcPDuZkV3GgtsxRv3PgsrdcU-doxFNeGKWBvmF5Fi5gY9RLKzOgRjdihFiBNtdqosQwlFwTH4J3oUb5qlQ1DloJtINPoF6wCFbLTRj4XugFwWYdutDatr-69AMS2rdePpDeha_BwOu_AcPujng?type=png" alt="Simple Website Architecture" caption="Simple Website Architecture"}
::

So if the load balancer or the database stop working the entire website fails. If only one of the delivery servers
fails though the site will still be available. If the Content Management Server fails the website will still function,
but changes would not be possible during the outage. What is the SLA for all functionality being available?

Before the entirety can be computed we have to understand how to evaluate this portion:

::content-figure{src="https://mermaid.ink/img/pako:eNqNkEFvgzAMhf8KstQbRaUFmkRTD5Td2GW7jfTgEW9FgwRlYRqr-O_LqKi0225-9vcs-12gNopAwJvF_hyUj9JKHQRlXpUGVZBji7ome_diD5xHnK9OV-BYxFV1NNqRdkFBbfNJdlyo1elGbf9Blfl6ffAL_6gthNCR7bBR_rrL70SCO1NHEoQvFdp3CVJPnht6hY7uVeOMBfGK7QeFgIMzT6OuQTg70AIVDfpPuxtFs-nhmsEcRQg96mdjusXoJYgLfIGIecQylrJ0wzK-YzHfhzD6drKPeJKmWbJJdhmbQvie7fH0A7-hbUE?type=png" alt="Load Balancer" caption="Load Balancer"}
::

As mentioned if one of the two delivery servers fail the website is still available so the SLA is expected to be higher
with the fallback server being an option. What are the odds of both delivery servers failing simultaneously?

`(1.0 - 0.999) x (1.0 - 0.999) = 0.001 x 0.001 = 0.000001`

Which is an SLA of 99.9999%

::content-figure{src="https://mermaid.ink/img/pako:eNqNkcFuwjAMhl8lsoS0SQU1gVJaTRxKdmsv220tB9NkUI0mKKTTGOLdl7V0ZdplN__259-WfYZSCwkxbA0ediR9KkyhCEmTPNUoSIJ7VKU0DxuzjKJJFI3WHXBsNl3HipO8rQw14pI0z1daWaks4XJfvUtz6j1G6xuO_YOTSnQBT_I7jhY3eJTDRvdXbJUNXhkq3MrahX_c0mQ8XroFfyl2teDUSZ70it2qrBXgQS1NjZVwRzt_FwqwOzeqgNiFAs1bAYW6OK45CLTyUVRWG4hfcX-UHmBj9fNJlRBb08ge4hW6c9Y_lGybsu417Yc8OKB60bruG52E-AwfEFM2oWwRhP6CBgFl_jTw4OTSfjAJp0HIwtl8Posou3jw2RrQyxeTMppi?type=png" alt="Total SLA Graph" caption="Total SLA"}
::

Now we can calculate the composition of our dependencies:

`99.99% x 99.9999% x 99.99% x 99.9% = 99.88%`

Which is more than 17.5 hours in a year; a worse availability than the simplistic website presented earlier.

## Cloud Offerings

To present a real-world scenario, if I was in the market for an enterprise content management system I would find many
offerings claiming to fulfill my needs while taking on the burden of infrastructure management and
offering attractive uptime guarantees (99.5%) to do it. With enterprise level needs though a simple WYSIWYG and workflow is not enough. This system would need to support additional functionality such as those found in a [PIM](https://en.wikipedia.org/wiki/Product_information_management),
a [DAM](https://en.wikipedia.org/wiki/Digital_asset_management), a [CRM](https://en.wikipedia.org/wiki/Customer_relationship_management), an E-Commerce system, Analytics, [Personalization](https://en.wikipedia.org/wiki/Personalization#Web_pages), and others. Some CMSes have a completeness of vision and include these listed features
and call themselves Digital Experience Platforms; others don't and offload that responsibility to what they
refer to as "best-of-breed" 3rd party integrations.

As you've seen in above these are not equivalent solutions and when the latter advertises itself
like the former and claims an SLA of 99.9%, what does that mean in reality? Is that simply the content
management server and the content delivery? Does that cover all of these 3rd party integrations required
to get the necessary functionality? As you'd guess the answer is no. We can do the math (assuming
a 99.9% SLA for all features):

- Base CMS: 99.9%
- PIM: 99.9%
- DAM: 99.9%
- CRM: 99.9%
- Analytics: 99.9%
- E-commerce: 99.9%

`99.9% * 99.9% * 99.9% * 99.9% * 99.9% * 99.9% = 99.4%`

So while the advertised promise was 9h of downtime the reality is over 52 hours of downtime annually.
Add more 3rd party dependencies and you'll see the downtime increase.

Now this isn't limited to Cloud CMS offerings of course, you can apply the same rules to other cloud offerings.
If those offerings claim an SLA level but offload core functionality to a 3rd party it's not an honest agreement.
So pay attention to what you're buying and identify those dependencies external to that system.
