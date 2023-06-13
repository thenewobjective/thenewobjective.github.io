---
layout: post
icon: file-text
title:  "SQL Server and UUIDs"
date:   2022-08-14 11:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/sql-server-and-uuids
---

* TOC
{:toc}

## Introduction

When designing database tables to maintain the state of your objects you often have entities that do not have a
[Natural Key](https://en.wikipedia.org/wiki/Natural_key), attributes that exist on the entity itself, to uniquely
identify them over time. One example can be a Customer:

| Name     | Email                | Address           |
|----------|----------------------|-------------------|
| Jane Doe | <jane.doe@example.com> | Merrick, NY 11566 |

Any of the attributes can change. That doesn't mean that the customer becomes a different person.
If Jane Doe is married and moves to a new state, she is still the same person:

| Name       | Email                  | Address                |
|------------|------------------------|------------------------|
| Jane Smith | <jane.smith@example.com> | Philadelphia, PA 19111 |

To identify that entity over time we define a [Surrogate Key](https://en.wikipedia.org/wiki/Surrogate_key).
A proxy representing the entity.

| *ID*   | Name       | Email                  | Address                |
|--------|------------|------------------------|------------------------|
| __12__ | Jane Smith | <jane.smith@example.com> | Philadelphia, PA 19111 |

There are some practical concerns though when choosing an appropriate key. What format should it take?
Are there implementation concerns?

## Choosing a key format

A simple integer seems reasonable at first but depending on the volume of data you can have problems if it's not big enough. Database systems give you many choices in this area, and it can be easy to make the wrong one. Choosing an integer as a surrogate key (__int<sup>32</sup>__) means you're limited to __2<sup>32</sup> = ~4 billion__ records max.
Also, if you move your record to another table or another database, you can have collisions if the second database uses the same scheme.

You might recall when the social media platform Parler crashed:

<figure>
  <img src="/media-library/software-systems-engineering/parler-crash.png" alt="Parler Crash">
  <figcaption markdown="1">
Credit: [@saramehmei](https://twitter.com/sarahmei/status/1348474968527360001)
  </figcaption>
</figure>

In their case they chose a signed integer (__int<sup>31</sup>__) as a key which meant they were limited to
__2<sup>31</sup> = ~2.1 billion__ records max.

A seemingly reasonable alternative solution would be to use a UUID/GUID as the Surrogate key.

This poses two challenges though:

1. A UUID is a big key: 128 bits (16 bytes)
2. It's pseudo-random and therefore unsorted

The first point is not so bad as a problem, but the second point can be a significant one.

With an unordered key the database can’t store records on disk in a useful way. Which means if there
is a need to search for records, and they aren’t in memory, a terrible amount of work (I/O operations)
need to be done to find the appropriate records. A weak analogy: it’s easy for me to store and find the
records of everyone when I can group them by the first letter of their last name. It’s not that easy if
a random number identifies them instead.

So can we get the benefits of clustering along with the benefits of a UUIDs uniqueness? In other words:
is it possible to have a random, unique, but also ordered key?

The answer is yes, but you must choose the correct type of UUID

## Comparing UUIDs

UUIDs have the following format and you can determine the type you’re dealing with easily:

```text
   A      B     C    D       E
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
```

* M - version
* N – variant

Versions:

| Version | Description                                                                       |
|---------|-----------------------------------------------------------------------------------|
| 0       | nil UUID 00000000-0000-0000-0000-000000000000                                     |
| 1       | data-time + MAC address (utilizes a Gregorian epoch timestamp)                    |
| 2       | date-time + MAC Address + DCE Security (utilizes a Gregorian epoch timestamp)     |
| 3       | namespace name based (MD5)                                                        |
| 4       | Random                                                                            |
| 5       | namespace name based (SHA-1)                                                      |

Given the choices above which are the standard types it looks like we can’t use any
of them as the best candidates (1 and 2) rely on the MAC of the underlying machine.
If I’m on a virtual machine what does that mean? There are other implications as well...

Luckily, there is a [draft RFC](https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format)
for new versions of UUIDs:

| Version | Description                                                                                                  |
|---------|--------------------------------------------------------------------------------------------------------------|
| 6       | field-compatible version of UUID1, reordered for improved DB locality (utilizes a Gregorian epoch timestamp) |
| 7       | Time ordered based on Unix Time epoch. Should be used instead of UUID1 and UUID6 when possible               |
| 8       | Experimental and vendor-specific use cases. Uniqueness is not assumed                                        |
| F       | Max UUID FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF                                                                |

So, versions 6 and 7 provide us a key with all the attributes we desire.

## Practical Implications

What does that mean practically? Can the database systems we use generate those for us or do
we have to write an implementation ourselves in the application layer?

The answer is (mostly) yes. SQL Server provides a function called `NEWSEQUENTIALID()` which guarantees
uniqueness, does not rely on a MAC address, and provides ordering (unless the database server fails and
is restored on another machine within a short enough time period). This function does not generate
one of the (draft) standard formats, but has similar properties.

Other major database systems have similar functionality, or will shortly. I'll focus on SQL Server
only in this post as it's been in the [top 3 of rankings](https://db-engines.com/en/ranking) for years
and is well-known and commonly in use; and I only spent time looking into that implementation specifically.

A final note here of possible interest is Entity Framework. If you're using Entity Framework the
sequential UUIDs will be generated for you automatically if the following is true:

1. You are using SQL Server and don’t specify a default value
2. You leverage the Guid type
3. You specify the `.ValueGeneratedOnAdd()` method in the fluent API

<https://docs.microsoft.com/en-us/ef/core/modeling/generated-properties?tabs=data-annotations#primary-keys>

## References and Further Reading

* <https://blog.codinghorror.com/primary-keys-ids-versus-guids/>
* <https://docs.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described?view=sql-server-ver15>
* <https://en.wikipedia.org/wiki/UUID>
* <https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format>
* <https://docs.microsoft.com/en-us/sql/t-sql/functions/newsequentialid-transact-sql?view=sql-server-ver15>
* <http://web.archive.org/web/20191231152909/http://www.jorriss.net:80/2008/04/24/unraveling-the-mysteries-of-newsequentialid/>
