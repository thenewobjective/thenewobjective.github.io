---
layout: post
icon: file-text
title:  "Data, Models, and Entities"
date:   2022-01-16 12:00:00 -0600
category: Software Systems Engineering
permalink: /software-systems-engineering/data-models-and-entities
---

* TOC
{:toc}

In common speech and in common usage we use the follow terms as if they were synonyms:
Data, Entity, Model, and Data Structure.

## Notes

* Who owns the relations between two models/entities? Another one?
* A model is a set of one or more properties and an optional number of relations the relations are represented by an object as well and categorized by type such as one-to-many, one-to-one, and many-to-many
* Adding a method to a model turns it into a data structure due to state
* Examples:
  * A Stack is a Data Structure
  * A Cartesian Point is Model/Data
    * What about calculated fields?
* Relationship to database normalization?
  * [A Relational Model of Data for Large Shared Data Banks](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf)
    E.F. Codd
    * "... users of large data banks must be protected from having to know how the data is organized..."
  * You don't know how data will be queried, so it should be normalized
* Domain Driven Design
  * Definitions:
    * Domain
      * As in [Domain of Discourse](https://en.wikipedia.org/wiki/Domain_of_discourse)
      * A sphere of knowledge (ontology), influence, or activity. The subject area to
        which the user applies a program is the domain of the software.
      * A system of abstractions that describes selected aspects of a domain and can be
        used to solve problems related to that domain.
    * Model
    * Entity
* Clean Architecture
  * Entity
    * An object that represents a set of Business Rules operating on Business Data.
    * Encapsulates enterprise-wise Critical Business Rules.
    * Can be an object with methods or can be a set of data structures and functions.
* Ivar Jacobson's book "Object Oriented Software Engineering"
  * Coined the term "Entity"
* William Cook's work:
  * [Object-Oriented Programming versus Abstract Data Types](https://www.cs.utexas.edu/users/wcook/papers/OOPvsADT/CookOOPvsADT90.pdf)
  * <https://stackoverflow.com/questions/8743995/what-is-difference-between-a-model-and-an-entity>
* The number 17 is neither a model nor an entity.
  * Same with a Complex Number? It has a real part and an imaginary part...
