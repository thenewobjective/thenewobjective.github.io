---
layout: post
icon: file-text
title:  "The Center of an Application: EF and Databases"
date:   2023-05-28 13:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/the-center-of-an-application-ef-and-databases
redirect_from:
    - /software-systems-engineering/entity-framework-and-database-projects
---

* TOC
{:toc}

## Introduction

Independently I have been asked by a number of Tech leads about the use of Entity Framework vs the use of a Database
Project for the management of Entities and their state. This has generally been done in the context of Domain Driven
Design (DDD) and Microservices. Since it has come up on six different occasions I thought it would be a good idea to
write a blog post to prevent repetition in the future.

*Structure follows strategy* so here I will provide a quick overview of the philosophy of a particular architecture and
what consequences that has for the choice of one technology over another. For
<abbr title="methods of teaching">pedagogical</abbr> purposes, assume this is in the context of C#, .NET Core, and Azure.

> I didn’t have time to write you a short letter, so I wrote you a long one.
> <cite>Mark Twain</cite>

## Control Theory and Requirements

A subset of [Systems Theory](https://en.wikipedia.org/wiki/Systems_theory) is [Control Theory](https://en.wikipedia.org/wiki/Control_theory). The basic gist is that to manage and understand a system you need a
[centralized representation](https://en.wikipedia.org/wiki/Control_system) for it. In the cars we drive that is the dashboard and
steering wheel. In our bodies that is the brain. So what is the centralized representation for software?

We could say it is obviously the code, but we also know that is too broad of an answer. An implementation is a "fact" and not a
"truth". More specifically it is an "artifact" and to [paraphrase](https://en.wikipedia.org/wiki/Is%E2%80%93ought_problem) [David Hume](https://en.wikipedia.org/wiki/David_Hume): <q>you cannot derive an ought from an is</q>, or as [Robert Pirsig](https://en.wikipedia.org/wiki/Robert_M._Pirsig) might state it: <q>For every fact there is an infinity of hypotheses</q>. So we need something more abstract than the code.

The appropriate representation of a system (Software or otherwise) is its [requirements](https://arxiv.org/ftp/arxiv/papers/1906/1906.06614.pdf). These consist of propositions (statements) about the system. For example, "The car shall not exceed 65 mph" or "The car shall not exceed 100 mph". These are the "truths" of the system. These consist of propositions (statements representing 'true' or 'false') and their relationships. An example might be the famous syllogism:

```text
R1: All Men Are Mortal
R2: Socrates Is A Man
---------------------- Modus-Ponens (Thus we can derive)
R3: Socrates Is Mortal
```

Luckily, we are not constrained to some formal logic representation nor long and boring English descriptions (unlike my writing here). We accomplish this indirectly with Mockups (like Figma), UML Diagrams, pseudo-code, and more. Each of these representations are a different view of the same system but aimed towards a different audience. Mockups are great for designers, front-end developers, and business stakeholders. A [Deployment Diagram](https://en.wikipedia.org/wiki/Deployment_diagram) is relevant to an Infrastructure Engineer or DevOps engineer. The key is that they are all representations of the requirements. They are the "truths" of the system divorced from the "facts" of the implementation. This concept of differing views into the same system has been formalized in one way called the [4+1 Architectural View Model](https://en.wikipedia.org/wiki/4%2B1_architectural_view_model).

## Domain Engineering and Domain Driven Design

Requirements Engineering is a bit pointless if you do not know the subjects you are dealing with, hence the process of [Domain Engineering](https://en.wikipedia.org/wiki/Domain_engineering). We identify the Domain of Discourse which are the entities and relationships used by a community of interest. For example, in the domain of banking we have entities like "Account", "Transaction", "Customer", "Branch", etc. These are the nouns of the domain. The relationships are the verbs. For example, "A Customer has an Account", "A Customer has a Transaction", "A Branch has a Customer", etc. These are the "truths" of the domain and therefore the requirements of the system. In larger systems this can be quite complex and challenging to understand. To manage this complexity we can decompose the domain into subdomains ([Bounded Contexts](https://martinfowler.com/bliki/BoundedContext.html)). Everything related to an E-Commerce checkout process for example could be a context called "Checkout", while everything related to the management of a customer's account could be a context called "Account Management".

With some or all of the contexts identified, the first move from theory to reality can occur. Each bounded-context corresponds (almost) 1-to-1 with the Microservice architecture in the Business Layer, the Micro frontend architecture in the Presentation Layer, and a Micro ETL architecture in the Data Layer. We can refer to these as "Features" of our application, or "Verticals".

<figure>
    <img style="width:7in" src="/media-library/software-systems-engineering/iterations.drawio.svg" alt="Monolithic vs iterative development">
    <figcaption>Monolithic vs iterative development</figcaption>
</figure>

This better enabled iterative development. We can start with a single context and build out the fully-functioning vertical. We can then add more contexts as time goes on. Contrast with the waterfall approach of building out all the features of the system at once
bottom up and strongly coupled.

## Use Case Driven Development

Domain Engineering and Design is a top-down approach that enables us to understand our
[Problem Domain](http://web.archive.org/web/20190609195231/https:/en.wikipedia.org/wiki/Problem_domain) but it's not so useful in knowing how it applies to the [Actors](https://en.wikipedia.org/wiki/Actor_(UML)) (users) of the system. In other words, what is the "Application" of the domain?

We identify and capture these relationships as [Use Cases](https://en.wikipedia.org/wiki/Use_case).
So, with the Domain and Use Cases in hand, the next question is how we realize these as an implementation. This is where the [Clean Architecture](https://crosp.net/blog/software-architecture/clean-architecture-part-2-the-clean-architecture/) and its [variants](https://medium.com/@edamtoft/onion-vs-clean-vs-hexagonal-architecture-9ad94a27da91) apply.

<figure>
    <img src="/media-library/software-systems-engineering/clean-architecture.png" alt="Clean Architecture">
    <figcaption>Clean Architecture</figcaption>
</figure>

## The Center of an Application

In Clean Architecture the Domain is at the “center” of our application and the Application layer (use cases) surrounds it. But what does that mean practically? In a more perfect world, we could just define our application diagrammatically or declaratively and generate the implementation automatically. This is referred to as [Model-Driven Engineering](https://en.wikipedia.org/wiki/Model-driven_engineering) but sadly the tools still suck. For example, Visual Studio has a [Class Designer](https://www.codemag.com/article/0409071/Visualize-Your-Code-with-the-Class-Designer) but it's pretty limited and awkward to use. You are probably also familiar with the DBMS [designer tools](https://www.mssqltips.com/sqlservertip/6269/sql-server-database-diagram-tool-in-management-studio/). In both cases they aren't abstract modeling tools focused on requirements, but instead visual representations of code you would have likely written faster by hand anyway. A weak analogy might be: a power drill compared to a screwdriver where what we actually want is to operate at the level on the blueprints.

The question remains though: where does the center of the application exist practically? Where is it stored?  To answer that, we must recall what it is we are storing: Entities, Values, and Use Cases; domain objects that are ignorant of how they are applied. Entities/values must remain ignorant of the application (Dates, Social Security numbers, NDCs, Points in 3D space, etc.). Use Cases must also remain ignorant of the implementation details (no concept of Filesystem, Database, MVC, Okta, Networking, Angular, and so on).

Focusing on the Entities/Values first, where do we put them? We must note that Entities are not just a collection of fields. They also consist of Enterprise Business Rules, such as validating that a Zip code is in the right format, or enforcing certain [contracts](https://en.wikipedia.org/wiki/Design_by_contract), and even enforcing equality/ordering constraints.

To add to the challenge, assume a Software Product Line being built must be a distributed architecture. A handful of web portals coordinated by dozens of microservices and populated by an ETL. This has the following impressionistic structure which is reminiscent of a three-tier architecture:

<figure>
    <img src="/media-library/software-systems-engineering/spl-three-tier.png" alt="three-tier topology">
    <figcaption>An impressionistic distributed application</figcaption>
</figure>

Each of these facets has their own representation of the same Entities which makes sense as the Entities are the [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) being shared. We often can’t share the exact same ones though as they may not have a common implementation language and are segregated over a network. Additionally, not all fields of an Entity may be relevant in each aspect or may have security implications (Such as the password field of a user entity on the front-end).

<figure>
    <img src="/media-library/software-systems-engineering/spl-three-tier-entities.png" alt="Common Entities">
    <figcaption>Common entities</figcaption>
</figure>

The organization of each tier (more-or-less) should follows a Clean Architecture, so we can have regularity:

<figure>
    <img src="/media-library/software-systems-engineering/spl-three-tier-clean.png" alt="Common Architecture">
    <figcaption>Common sub-architecture</figcaption>
</figure>

If you squint you can see that even the organization of the tiers themselves follow a similar Clean Architecture shape where the Services act as the Business Logic Tier and coordinates:

<figure>
    <img src="/media-library/software-systems-engineering/spl-clean-clean.png" alt="Clean Architecture Tiers">
    <figcaption>"Clean" Architecture tiers</figcaption>
</figure>

Hence the Services (Business Logic Tier) is the "Center" of the distributed application.

## Domain Entities vs Database Entities

With my painfully long setting of the stage out of the way, we can finally get to the point and tackle the core question:
In a Services project (which is the core of a distributed application), should the fundamental Entities (the core truth) be defined
as <abbr title="Plain Old Class Objects">POCOs</abbr> or should we manage them in the associated database of the service as part of the [DDL](https://en.wikipedia.org/wiki/Data_definition_language)?

Clean Architecture is not necessarily incompatible with either approach but here would be what that looks like with each:

<figure>
    <img src="/media-library/software-systems-engineering/clean-domain-compared.png" alt="Comparison of domain entities">
    <figcaption>Comparison of domain entities</figcaption>
</figure>

The middle is the most common approach (via Entity Framework), and the left is what has been sometimes suggested as an alternative.
Before we investigate how we could potentially accomplish approach on the left, can we practically? Recall that an Entity is not just a collection of fields. It also encodes enterprise business rules such as validation; for example: An SSN field for a user may have invariants such as it cannot be null and must follow a particular format. There are also derived fields whose value is a consequence of others: __Age__ derived from __Birthdate__, __FullName__ derived from __FirstName__ and __LastName__. We also have preconditions, postconditions, and invariants that must be enforced explicitly such as limiting the number of relations between entities (e.g. a user can only have 5 friends). Each of these are all possible to encode in a database, but not trivially. You have to introduce [Triggers](https://learn.microsoft.com/en-us/sql/relational-databases/triggers/ddl-triggers?view=sql-server-ver16) and potentially SQL to [encode format checking](https://stackoverflow.com/a/1345539/153209) which is far easier to accomplish in a language like C# via [Data Annotations](https://stackoverflow.com/a/8989157/153209).

We should also not forget that a Database is a Relational Model and not an Object-Oriented model. The optimal representation of data is vastly different between the two. Here is an example utilizing a family of contacts:

<figure>
    <img src="/media-library/software-systems-engineering/oop-contacts.png" alt="OOP Contacts">
    <figcaption>Object-Oriented Contacts</figcaption>
</figure>

We can represent these in C#, or any other OO language directly. To represent these in the database though we must translate our model into a relational form first. One way this is accomplished is by flattening the model into a single relationship with a discriminator column __ContactType__:

<figure>
    <img src="/media-library/software-systems-engineering/relational-contacts.png" alt="Relational Contacts">
    <figcaption>Relational Contacts</figcaption>
</figure>

But this is still not enough, we also need to introduce the trigger to enforce the default values for the Invoice Contacts depending on which variant was chosen. In more complicated models the database form can look vastly different than how you would like to represent them in your application code due to the normalization of data (i.e., [BCNF](https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form)). So, effectively by using the database as the “Truth” of entities and enterprise business rules you must introduce an additional mapping to have not only the models in the right shape for the application to use, but you also must manually recreate the validation mechanisms as well. If you avoid the latter, then you’re mixing the Data Layer and Domain layer by enforcing validation only when the entities are saved. So, the ultimate point here is that Entities are Objects (values + behavior) and not just Data (values) and are created and maintained consistent with [OOAD](https://en.wikipedia.org/wiki/Object-oriented_analysis_and_design). Database Entities should not be confused with Domain Entities, and I don’t know how you could keep them conceptually segregated (perhaps [Views](https://en.wikipedia.org/wiki/View_(SQL)) as Entities?). If you had an [OODB](https://en.wikipedia.org/wiki/Object_database) it might be a different story.

Because most people utilize a Relational Database and an Object-Oriented programming language, you often utilize an ORM library as well. I suspect few OO-developers are against that, though I know there are some varied preferences on which ORM to use ([EF vs Dapper](https://www.reddit.com/r/dotnet/comments/r733bb/comment/hmx1k6e/?utm_source=reddit&utm_medium=web2x&context=3)).

## The EF Approach

With Entity Framework we are provided with three choices:

* Model First
* Database First
* Code First

### Model First

This was a great idea but executed horribly. The idea was to graphically design your Entities and based on that you could manage and generate both the C# code as well as the database tables:

<figure>
    <img src="/media-library/software-systems-engineering/ef-model-first.png" alt="EF Model-First">
    <figcaption>EF Model-First</figcaption>
</figure>

Sadly, it was slow, buggy, and you couldn’t represent behavior and invariants. Being based on a single giant XML file you often had merge conflicts and database migrations were not possible. It’s basically been [abandoned](https://learn.microsoft.com/en-us/archive/msdn-magazine/2015/january/data-points-looking-ahead-to-entity-framework-7#dropping-edmx-but-database-first-will-continue). That leaves us with Code-First or DB-First as a strategy.

### Database First

How do you solve the problem of creating a new project when there is already a database defined and out of your hands to control and manage; some monolith with many applications hanging off it? This is where DB first comes into play. You utilize the EF CLI to general C# code based on Database Entities. Microsoft treats this not as a suggested practice, but more so a Reverse Engineering practice as evidenced by their movement of the documentation under [that title](https://learn.microsoft.com/en-us/ef/core/managing-schemas/scaffolding/?tabs=dotnet-core-cli). I’ve already mentioned [above](#domain-entities-vs-database-entities) some conceptual challenges with this approach, but an additional wrinkle here is that you effectively end up with pseudo-entities in your project that you can’t touch and probably don’t want to use directly due to <abbr title="Poorly built and overly-complex, and unpleasant.">cruftiness</abbr> which forces you to make a more convenient POCO to represent the entities you want. There is an additional maintenance overhead if you don’t control the database you’re connected to. If the schema changes you must make sure the code reflects that via running the scaffolding CLI.

Practically, this maintenance overhead isn’t a problem in a Microservice architecture as you would own the database completely and don’t have to worry about unexpected changes which raises the question: Why not a DB-First approach in an EF + Database project?
The existing criticisms still apply from [above](#domain-entities-vs-database-entities) but now you will have broken an abstraction layer and exposed significant details about the database itself to the application developer. Given that a microservice database is purposedly kept as dumb and flat as possible, I wonder what benefit making the database more explicit to the developer provides? I suspect this will add more opportunities for confusion and more challenging pull requests in the intermediate time frame as developers become accustomed to this; it can get quite complicated:

<figure>
    <img src="/media-library/software-systems-engineering/db-proj-schema-compare.png" alt="DB project Schema Comparison">
<figcaption markdown="1">
DB project Schema Comparison. Credit: [Melissa Coates](https://www.sqlchick.com/entries/2016/1/10/why-you-should-use-a-ssdt-database-project-for-your-data-warehouse)
</figcaption>
</figure>

I believe much of this is better kept hidden and segregated into the infrastructure layer where a DevOps Engineer, SRE, DBA, ETL Engineer, or someone else can manage them instead of burdening the application developer with the overhead. In my experience
application developers are becoming less and less capable of handling databases directly.

I am not against having a database project [necessarily](#database-project--code-first), but I am strongly against having the database dictate our domain entities.

### Code First

I don’t think much needs to be said about this as it's the approach most utilized today in the .NET world and the default.
Domain objects (Entities) are defined with POCOs. These are then used to generate a database with supporting tables via the creation of [Migration Classes](https://www.entityframeworktutorial.net/code-first/code-based-migration-in-code-first.aspx). Since source code is saved in version control, and migration classes represent schema changes, you obtain a version-controlled database as a bonus.

### Database Project + Code First

There may still be some value in having an explicit database project in exceptional cases. It could help avoid embedding raw SQL in migrations for defining stored procedures, views, and other uncommon tasks. There are no use-cases that come to mind for this, but the possibility remains.

<figure>
    <img src="/media-library/software-systems-engineering/ef-ugly-migration.png" alt="Ugly Migration">
    <figcaption>Ugly EF Migration</figcaption>
</figure>

## Conclusion

I am not against a Database Project in general, but I am strongly against defining Domain Entities in that project via a Database-first approach as it seems to violate Clean Architecture in a significant way. I think there might be a place for it in a Code-First approach with a peer Database project, but I don’t know the dynamics of how that would work in practice. I believe the Learning Curve will be much higher for an average development team than it would be with introducing Entity Framework. Specialized, significant knowledge in databases in general is required and I don’t think the average team has the background or skill to handle this without significant adaptive pressure. I am also concerned about the migration tax required to convert to a DB project from an existing EF project. Converting to a database project is very much a non-trivial effort and the benefits would have to dwarf what modern EF provides today. I am not seeing enough to entertain that on [brownfield](https://en.wikipedia.org/wiki/Brownfield_(software_development)) projects, and I don’t see the benefit on future [greenfield](https://en.wikipedia.org/wiki/Greenfield_project) projects. If there was an existing legacy database that was being used by many applications, I could see the value in a database project,  but I don’t see how database projects fit into a Microservice + Clean Architecture approach in general.

As always, I am open to being convinced otherwise. I think a discussion is useful not just for the current projects but future ones as well. Entity Framework has come a long way since its beginning, and Database Projects are an old reliable workhorse I and perhaps many of you have had success with in the past. If you have anything to add, it would be appreciated.
