---
layout: post
icon: file-text
title:  "Design by Contract"
date:   2021-10-28 12:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/design-by-contract
---

<!--
* TOC
{:toc}
-->

Here are two classes:

```typescript
class A<T> {
    add(item: T): void
    isEmpty(): boolean
    isFull(): boolean
    remove(): T
    size(): number
}

class B<T> {
    add(item: T): void
    isEmpty(): boolean
    isFull(): boolean
    remove(): T
    size(): number
}
```

Are they the same? If you saw these two classes in your codebase, would you work to refactor
them into a single class?

I will now rename the two classes and ask the same questions:

```typescript
class Stack<T> {
    add(item: T): void
    isEmpty(): boolean
    isFull(): boolean
    remove(): T
    size(): number
}

class Queue<T> {
    add(item: T): void
    isEmpty(): boolean
    isFull(): boolean
    remove(): T
    size(): number
}
```

Did you change your answer?

From the above you can see that the semantics of a class is not reflected in its name
nor its interface. You are often forced to
look at the implementation instead of being able to rely on a higher level of abstraction.

Here's another example

## Further Reading

- <http://se.ethz.ch/~meyer/publications/computer/contract.pdf>

## Notes

- <https://web.archive.org/web/20151205005155/https://blog.mozilla.org/dherman/2011/08/29/contracts-coffee/>
- <https://web.archive.org/web/20151002033716/http://c2.com/cgi/wiki?DesignByContract>
- <https://en.wikipedia.org/wiki/Code_contract>
- <https://web.archive.org/web/20150905075048/http://users.eecs.northwestern.edu/~robby/pubs/papers/ho-contracts-techreport.pdf>
- <https://cstheory.stackexchange.com/questions/5228/relationship-between-contracts-and-dependent-typing?newreg=666f3092f1644974935c5ca8436097c4>
- <http://homepages.inf.ed.ac.uk/wadler/topics/blame.html>
- <http://www.drdobbs.com/architecture-and-design/ada-2012-ada-with-contracts/240150569>
- <https://web.archive.org/web/20150905075048/http://users.eecs.northwestern.edu/~robby/pubs/papers/ho-contracts-techreport.pdf>
- <https://www.eiffel.org/doc/solutions/Design_by_Contract_and_Assertions>
- <https://www.eiffel.com/values/design-by-contract/introduction/>

"A class is not simply an interface. ":
Stack vs Queue interface

 ==============

Strengthening/weakening in contract subtypes:

"""
The notions of “stronger” and “weaker” are formally defined from logic: P1 is said to be
stronger than P2, and P2 weaker than P1, if P1 implies P2 and they are not equal. As every
proposition implies True, and False implies every proposition, it is indeed legitimate to
speak of True as the weakest and False as the strongest of all possible assertions.
""" -- meyer p. 358

in LSP:
"""
Preconditions cannot be strengthened in a subtype.
Postconditions cannot be weakened in a subtype.
Invariants of the supertype must be preserved in a subtype.
 <https://softwareengineering.stackexchange.com/questions/364713/liskov-principle-subclasses-can-have-stronger-invariants-how-could-it-work>
History constraint (the "history rule"). Objects are regarded as being
 modifiable only through their methods (encapsulation). Because subtypes may
 introduce methods that are not present in the supertype, the introduction
 of these methods may allow state changes in the subtype that are not
 permissible in the supertype. The history constraint prohibits this. It
 was the novel element introduced by Liskov and Wing. A violation of this
 constraint can be exemplified by defining a mutable point as a subtype of
 an immutable point. This is a violation of the history constraint, because
 in the history of the immutable point, the state is always the same after
 creation, so it cannot include the history of a mutable point in general.
 Fields added to the subtype may however be safely modified because they are
 not observable through the supertype methods. Thus, one can derive a circle
 with fixed center but mutable radius from immutable point without violating LSP.
"""
How to enforce? @invariant proxy should be able to catch this...

<https://en.wikipedia.org/wiki/Liskov_substitution_principle>

Russian Doll Pattern vs N-version programming (page 426 of OOSC 2nd Ed.)

===================

Object-oriented Software Construction
 page 121
 """
 It is not the job of a stack module to deal with error messages,
 which are a user interface issue. Stack modules should deal with the
 efficient implementation of stack operations. To keep the body of top
 simple and convincing, the precondition not empty must be assumed
 """

======

===============
Document difference from Eiffel
<https://stackoverflow.com/questions/57694623/is-the-rescue-clause-being-called-on-descendent-redefinition>

=======
<https://wiki.c2.com/?DesignByContract>
<https://en.wikipedia.org/wiki/Design_by_contract>
<https://en.wikipedia.org/wiki/Exception_handling#Exception_handling_based_on_design_by_contract>
<https://www.eiffel.com/values/design-by-contract/introduction/>

=========
<https://www2.cs.duke.edu/courses/fall07/cps108/papers/ocp.pdf>

<https://stackoverflow.com/questions/8155850/how-to-test-whether-a-set-is-reflexive-symmetric-anti-symmetric-and-or-transit?rq=1>
<https://math.stackexchange.com/questions/2164422/how-to-find-binary-representation-of-sets>

======

Relationship between specification and verification?

====

compare with boost contract library
<https://www.boost.org/doc/libs/develop/libs/contract/doc/html/boost_contract/contract_programming_overview.html>

=======

<https://www.microsoft.com/en-us/research/project/code-contracts/?from=http%3A%2F%2Fresearch.microsoft.com%2Fen-us%2Fprojects%2Fcontracts%2Ffaq.aspx>
<https://docs.microsoft.com/en-us/archive/blogs/francesco/faq-1-what-is-the-difference-between-assert-and-assume>
<https://github.com/dotnet/csharplang/issues/105>

=========

<https://www.eiffel.org/doc/eiffel/ET-_Design_by_Contract_%28tm%29%2C_Assertions_and_Exceptions>

==========
<https://web.archive.org/web/20151220045527/http://disnetdev.com/contracts.coffee>
<https://web.archive.org/web/20151002175109/http://eschertech.com/papers/safe_oo_software.pdf>
==========

<https://docs.microsoft.com/en-us/dotnet/framework/debug-trace-profile/code-contracts>
<https://www.dotnetcurry.com/csharp/1172/code-contracts-csharp-static-runtime-checks>
<https://en.wikipedia.org/wiki/Design_by_contract>
<https://en.wikipedia.org/wiki/Invariant_(mathematics)#cite_ref-4>
are invariants == axioms?

Research paper:
 Object-Oriented First-Order Logic by Eyal Amir
 Association with Requirements

=========

<https://dry-rb.org/gems/dry-schema/1.5/>
<https://www.microsoft.com/en-us/research/project/code-contracts/?from=http%3A%2F%2Fresearch.microsoft.com%2Fen-us%2Fprojects%2Fcontracts%2Ffaq.aspx>

<https://www.pixelated-noise.com/blog/2020/09/10/what-spec-is/>
<https://increment.com/testing/in-praise-of-property-based-testing/>
<https://specflow.org/>

<https://github.com/microsoft/TypeScript/blob/master/CONTRIBUTING.md>

<https://www.eiffel.com/values/design-by-contract/introduction/>
<https://www.eiffel.com/resources/presentations/>
