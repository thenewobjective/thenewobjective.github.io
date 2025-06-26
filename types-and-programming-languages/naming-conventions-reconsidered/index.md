---
title: Naming Conventions Reconsidered
date: 2025-06-26 10:00:00 -0600
category: Types and Programming Languages
---

## Introduction

Ancient wisdom teaches us that knowing the [true name](https://en.wikipedia.org/wiki/True_name) of something grants
power over it. In programming, this principle manifests in the art of naming, an often underappreciated yet profoundly
impactful aspect of software design. Names are not just labels; when ideally distilled they are the foundation of
a [language of discourse](https://en.wikipedia.org/wiki/Domain_of_discourse#Universe_of_discourse), which is the
[material of thought](software-systems-engineering/managing-complexity/#language-the-material-of-thought) that shapes
our understanding of a system.

However, naming conventions have often been muddied by practices like Hungarian Notation and its relatives, which
emphasize mechanical encoding over semantic clarity. These conventions, while once seen as helpful, have
become relics of a bygone era, often leading to confusion and clutter rather than clarity and insight.

This article critically re-evaluates Hungarian Notation and its relatives, exploring their historical motivations,
theoretical flaws, and practical consequences. We contrast these conventions with a more modern approach to naming
that prioritizes semantic clarity and architectural thinking. By focusing on naming that serves meaning rather than
machinery, we align our practices with scalable, maintainable design principles.

## The Origins of Hungarian Notation

Hungarian Notation was developed by [Charles Simonyi](https://en.wikipedia.org/wiki/Charles_Simonyi) at Microsoft. Its
purpose was to provide visual cues about a variable's role or type in the absence of compiler-enforced type information.

This approach aimed to improve code readability and maintainability by making implicit information explicit through
naming. There are three main variants:

- **Systems Hungarian**: Encodes the variable's *type or storage location* (e.g., `strName` for a string, `iCount` for
  an integer).
- **Apps Hungarian**: Encodes the variable's *semantic purpose* (e.g., `usName` for an unsafe string, `rwPosition` for a
  read-write cursor).
- **Access Hungarian**: Encodes the variable's *scope or access level* (e.g., `m_value` for member variables, `g_config`
  for global variables, `myVar` for instance variables, `_foo` for private variables).

Systems Hungarian became the most widespread in practice, particularly in C/C++ codebases and other languages with weak
or dynamic typing. Apps Hungarian found use in contexts where semantic distinctions were critical, such as
security-sensitive code or data validation layers. Access Hungarian emerged as teams sought to manage variable
visibility in large codebases with complex scoping.

Each variant represented an attempt to encode different kinds of information directly into variable names, serving as a
form of inline documentation in environments where such information wasn't readily available through other means.

## The Problem with Hungarian Notation

Hungarian Notation, while well-intentioned, has several fundamental flaws that undermine its original goals:

1. **Redundancy**: In statically typed languages, the type system already provides rich information about variable
   types and roles. Hungarian Notation duplicates this knowledge in names, leading to unnecessary redundancy and
   potential mismatch.
2. **Obscured Intent**: By focusing on mechanical details like type or scope, Hungarian Notation obscures the semantic
   intent of names. Good names should reveal *what* a variable represents in the domain, not *how* it is stored or
   accessed.
3. **Coupling to Representation**: Hungarian Notation ties variable names too closely to their representation in code,
   making it difficult to change the underlying implementation without also changing the names. This can lead to
   a lack of flexibility and increased maintenance burden.
4. **Cognitive Overhead**: The prefixes and encodings used in Hungarian Notation add cognitive load, requiring
   developers to mentally parse and interpret names rather than focusing on their semantic meaning. This can slow
   down understanding and increase the likelihood of errors.
5. **Lossy Encoding**: Trying to represent rich, compositional types in flat name prefixes is lossy and unwieldy. How do
   you encode complex generics or promises in a prefix? This leads to names that are not only verbose but also
   difficult to read and understand.
6. **Architectural Smells**: The use of Hungarian Notation often signals deeper architectural issues, such as poor
   separation of concerns, missing domain language, or unclear layering. Instead of addressing these underlying
   problems, Hungarian Notation becomes a band-aid that obscures rather than clarifies the system's structure.

### Redundancy and Obscured Intent

In modern programming languages, especially statically typed ones like TypeScript, the type system provides
rich information about variable types and roles. Hungarian Notation duplicates this knowledge in names, leading to
unnecessary redundancy and potential mismatch between the name and the intent.

For example, consider the following TypeScript code:

```typescript
let strUserName: string;
let arrUserIds: number[];
```

In this case, the prefixes `str` and `arr` add no semantic value. The type annotations already convey the necessary
information about the variable types and you can hover over the variable to see its type in the IDE. Worse, if the type
changes (e.g., if `strUserName` becomes a `User` object), the variable name must also be updated, leading to brittle
code that requires constant maintenance.

Hungarian Notation fundamentally obscures semantic intent by prioritizing mechanical details over meaning. When a
developer encounters `strUserName`, they must mentally parse two pieces of information: the prefix (`str`) and the
actual purpose (`UserName`). The prefix consumes cognitive bandwidth without adding domain value.

Consider these contrasting approaches to naming the same concepts:

```typescript
// Hungarian style
let strFirstName: string;
let strLastName: string;
let dtBirthDate: Date;
let bIsActive: boolean;

function validateUser(strFName: string, strLName: string, dtBirth: Date): boolean {
  // The prefixes tell us types, but not why these parameters matter
  return strFName.length > 0 && strLName.length > 0 && dtBirth < new Date();
}
```

versus:

```typescript
// Semantic style - clear intent
let firstName: string;
let lastName: string;
let birthDate: Date;
let isActive: boolean;

function validateUser(firstName: string, lastName: string, birthDate: Date): boolean {
  // Names immediately reveal business logic and validation intent
  return firstName.length > 0 && lastName.length > 0 && birthDate < new Date();
}
```

The Hungarian version forces readers to decode prefixes before understanding purpose. The semantic version communicates
intent directly, making the validation logic immediately apparent. Additionally, note that the prefixes duplicate the
explicit type declarations.

### Domain Language vs. Technical Trivia

Good naming should reflect the [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) of the
domain, not the implementation details of the runtime. Hungarian Notation inverts this priority, making technical
concerns primary and domain concepts secondary.

```typescript
// Technical focus - what type is this?
let arrOrderItems: OrderItem[];
let intOrderTotal: number;
let strPaymentMethod: string;

// Domain focus - what role does this play in the business?
let orderItems: OrderItem[];
let totalAmount: number;
let paymentMethod: string;
```

The latter approach creates a vocabulary that business stakeholders can understand and participate in. Code becomes a
shared language between technical and non-technical team members, facilitating clearer communication and requirements
gathering.

### Cognitive Load and Mental Models

Hungarian prefixes create unnecessary [cognitive load](https://en.wikipedia.org/wiki/Cognitive_load) by introducing an
extra layer of encoding that must be mentally processed. When reading `intCustomerAge`, a developer must:

1. Decode the prefix (`int` = integer)
2. Extract the semantic meaning (`CustomerAge`)
3. Reconcile these (why is age specifically an integer vs. a number?)

With semantic naming (`customerAge`), the cognitive path is direct: the name immediately conveys its domain purpose. The
type system handles the mechanical details transparently.

This cognitive overhead compounds in complex expressions:

```typescript
// High cognitive load
if (intCurrentAge >= intMinimumAge && strAccountStatus === "active")
  // Multiple prefix decodings required

// Direct comprehension
if (currentAge >= minimumAge && accountStatus === "active")
    // Business logic is immediately apparent
```

In this example, the variable names are clear and concise, reflecting the domain intent without unnecessary prefixes.
The type system provides the necessary information, and the names remain stable even if the underlying implementation
changes (such as changing `accountStatus` to an enum).

### Lossy Encoding and Complexity

Hungarian Notation attempts to encode types and behaviors into flat prefixes, this can lead to lossy representations.

For example, how do you encode complex generics or promises in a prefix? The result is often verbose, unwieldy names
that fail to capture the richness of the underlying type:

```typescript
// Systems Hungarian struggles with complex types
let arrPromiseOfUserProfiles: Promise<UserProfile[]>;

// Semantic naming is clearer
let userProfilesPromise: Promise<UserProfile[]>;
```

In the first example, the prefix `arr` is redundant and doesn't add meaningful information. The semantic version
conveys the same intent without cluttering the name with mechanical details. It also avoids the problem of
having to change the name if the type changes (e.g., if `UserProfile` becomes a class instead of an interface).

### Architectural Smells

Hungarian Notation can also signal deeper architectural issues. Its use often indicates:

- Poor separation of concerns
- Missing domain language
- Unclear layering

Instead of addressing these underlying problems, Hungarian Notation becomes a band-aid that obscures rather than
clarifies the system's structure. It can lead to a proliferation of prefixes that clutter names and make code harder to
read.

One example of this is the use of Hungarian Notation as a form of namespacing in large codebases. When too many
variables are visible at once—across long functions or shared state modules—prefixes like `str`, `g_`, or `m_` serve not
just to encode type or scope, but to manage cognitive overhead. This is treating the symptom, not the disease.
In both Object-Oriented and Functional Programming, a key goal is to **reduce the number of simultaneously visible
variables** by limiting scope, pushing behavior into well-defined units, and making data flows explicit.

Here is an example of the problem with an html form with associated variables:

```typescript
// Note the presentation layer sharing the same namespace as the business logic
let strUserName: string;
let strUserEmail: string;
let iUserAge: number;
let bIsActive: boolean;

let txtUserName: HTMLInputElement;
let txtUserEmail: HTMLInputElement;
let numUserAge: HTMLInputElement;
let chkIsActive: HTMLInputElement;

function processUserData() {
  txtUserName.value = strUserName;
  txtUserEmail.value = strUserEmail;
  numUserAge.value = iUserAge.toString();
  chkIsActive.checked = bIsActive;
}
```

In this example, Hungarian Notation is used to disambiguate variable names that are in the same namespace. This leads to
a proliferation of prefixes that clutter the code and make it harder to read. Instead, with a better architecture,
we can separate the presentation layer from the business logic:

```typescript
interface UserProfile {
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

interface UserForm {
  name: HTMLInputElement;
  email: HTMLInputElement;
  age: HTMLInputElement;
  isActive: HTMLInputElement;
}

function processUser(profile: UserProfile, form: UserForm) {
  form.name.value = profile.name;
  form.email.value = profile.email;
  form.age.value = profile.age.toString();
  form.isActive.checked = profile.isActive;
}
```

In this refactored example, the `UserProfile` and `UserForm` interfaces encapsulate the data and presentation layers,
respectively. The names are concise, intent is preserved, and scope is limited to the function parameters. This reduces
cognitive load and makes the code easier to read and maintain.

## The Case for Semantic Naming

Good naming is not just about syntax; it is about **semantic clarity**. Names should reflect the domain intent, not the
mechanical details of implementation. This means focusing on what a variable represents in the domain, not how it
is stored or accessed.

These names also consider the **context** in which a variable is used. This means being aware of the surrounding code,
the module structure, and the overall architecture. Names should help convey the relationships and responsibilities of
different parts of the system.

When chosen/discovered well, names become **narrative signals** that guide understanding and grant
**conceptual leverage**. They allow developers to see the code's purpose and behavior at a glance, without needing to
dive into implementation details. This is the essence of good naming: to operate at the level of thought, not syntax.

## Everything is a Classification

Some defenders of Hungarian Notation argue that *every* name is a form of classification, that naming always reflects
some implicit grouping or typology and that Hungarian Notation is just a more explicit form of this
([EIBTI](https://www.trevorlasn.com/blog/explicit-is-better-than-implicit)). However, this perspective overlooks the
core issue: the conflation of multiple classifications into a single name can create confusion and hinder understanding.

The problem is not classification itself, but **encoding multiple unrelated classifications** into a single linear name.
Names like `leftFrameBorderWidth` work well when the parts represent a meaningful path or structural relationship.
But when prefixes like `str`, `_`, or `arr` are combined, they obscure rather than clarify, ie: `_arrStrUserNames`.

This is analogous to the [Stroop Effect](https://en.wikipedia.org/wiki/Stroop_effect), where conflicting cues slow down
cognition. Here's a [video demonstration](https://www.youtube.com/watch?v=gjesfzWozo4). When a name's form (like a
prefix) conflicts with its actual role or type (e.g., a structured or domain-specific object), the developer experiences
a kind of **semantic interference**. Mental models must be adjusted, often unnecessarily, just to interpret the name.
Example:

```typescript
// // Hungarian-esque naming: encodes array (arr), string (str), and visibility (private _)
const _arrStrUserNames: string = "Alice, Bob, Charlie";

// Usage later:
console.log(_arrStrUserNames.split(","));
```

So, what's wrong here? The name `_arrStrUserNames` implies this is a private array of strings representing user names.
However, the actual type is a single string that *contains* a list of names. This conflicts with your expectations,
causing cognitive dissonance, like reading the word "Blue" printed in red ink. A better example would be:

```typescript
const userNameCsv = "Alice, Bob, Charlie";
const userNames = userNameCsv.split(",").map(s => s.trim());

console.log(userNames);
```

## Sigils, Suffixes, and Poor Language Design

Some languages, like BASIC, once used sigils (e.g., `$foo` for strings) to signal type. Scheme adopted suffixes like
`?` for predicates and `!` for mutating functions, encoding behavior expectations in syntax. Modern JavaScript utilizes
`#` for private fields, which is a form of Access Hungarian. Perl uses sigils like `$` for scalars, `@` for arrays, and
`%` for hashes, which is a form of Systems Hungarian.

These conventions weren't arbitrary: they evolved as compensations for limitations in type systems or module boundaries.
Developers naturally reach for visible cues when deeper structure is missing. Hungarian Notation emerged similarly—in
response to a need for visible semantics in environments with limited abstraction tools. But in languages with
expressive type systems, reflection, and modular composition, these visual hacks become noise. Here's the TypeScript
answer to the above:

### Signaling Type

::: code-group

```basic
REM BASIC-style type signaling

name$ = "Alice"   ' "$" means it's a string
```

```typescript
// TypeScript-style type signaling
let name = "Alice"; // inferred as string

// TypeScript with explicit type
let name: string = "Alice";
```

:::

### Predicate Functions

::: code-group

```scheme
;; Scheme-style predicate

(null? x) ; suffix `?` marks a predicate
```

```typescript
// TypeScript-style predicate
let isNull = (x: any): boolean => x === null;
```

:::

### Mutating Functions

::: code-group

```scheme
;; Scheme-style mutating function
(set! x 5)  ; mutation indicated by `!`
```

```typescript
// TypeScript-style mutating function
function updateUser(user: User, updates: Partial<User>): void {
  Object.assign(user, updates);
}
```

```haskell
-- Haskell-style mutating function
updateUser :: User -> Partial User -> IO ()
```

:::

TypeScript uses void return types and naming conventions (like `update`, `mutate`, etc.), not suffixes.

Haskell is better here for tracking side effects through types, but it still relies on naming conventions to
indicate intent. The key point is that modern languages provide mechanisms to express intent without relying on
mechanical prefixes or suffixes. They allow developers to signal type, behavior, and intent through
type systems, function signatures, and naming conventions that are more expressive and less cluttered.

### Private Fields and Access Control

In JavaScript, private fields are denoted with a `#` prefix, which is a form of native Access Hungarian.

::: code-group

```javascript
// JavaScript-style private field
class User {
  #name; // private field
  constructor(name) {
    this.#name = name;
  }
}
```

```typescript
// TypeScript-style private field
class User {
  private name: string; // private field
  constructor(name: string) {
    this.name = name;
  }
}
```

:::

This is a more structured way to indicate access control without relying on Hungarian prefixes. TypeScript also
provides access modifiers like `public`, `private`, and `protected` to control visibility, making the intent clear
without cluttering names with mechanical details. This language feature is also reflected in the type system.

### Collections and Structures

::: code-group

```perl
# Perl-style collections
$scalar = "hello";
@array = (1, 2, 3);
%hash  = ("a" => 1, "b" => 2);
```

```typescript
// TypeScript-style collections
let scalar: string = "hello";
let array: number[] = [1, 2, 3];
let hash: Record<string, number> = { a: 1, b: 2 };
```

:::

Again, explicit types, not sigils, disambiguate the structure.

### Why This Matters

The TypeScript examples, like other modern languages, show that when you have **strong typing**,
**modularity and encapsulation**, **type inference**, and **clear syntax and naming**, then sigils and suffixes become
redundant or even misleading.

Good naming is compositional and reflective of **abstraction hierarchy**. We should prefer:

```typescript
frame.leftBorder.width
```

over:

```typescript
intLeftFrameBorderWidth
```

The former expresses a relationship between components and follows a model, while the latter flattens one. It's not
classification that's the problem, it's the loss of semantic structure when multiple axes of identity are jammed into
prefixes.

## Misidentified as Hungarian: Semantic Naming and Meaningful Prefixes

Prefixing is not inherently bad. Prefixes like `is`, `has`, `can`, `update`, `create`, or `on` describe behavior or
intent, not mechanical details:

```typescript
let isVisible: boolean;
let canEdit: boolean;
function onClick(): void {}
```

These prefixes help communicate domain logic and are orthogonal to Hungarian Notation. They are not about encoding
mechanical trivia, but about clarifying the role of a variable or function in the system's behavior.

## System of Names vs Hungarian Notation

Hungarian Notation aims to **systematize naming mechanically**, relying on prefixes and encodings that reflect
implementation trivia. But naming is not a technical encoding problem, naming is a semantic design problem. It's about
**designing for readers**, not for compilers.

As mentioned earlier, Hungarian Notation emerged from a need for visible semantics in environments with limited
abstraction tools. But in modern, well-designed languages, these hacks are unnecessary and often counterproductive.

The "[System of Names](https://en.wikipedia.org/wiki/Nomenclature)" pattern, articulated by
[Ward Cunningham](https://en.wikipedia.org/wiki/Ward_Cunningham), proposed the opposite: names should
**emerge from the evolving responsibilities and metaphors** of the system itself.

In the System of Names, metaphors are chosen deliberately. The terms you use: `Agent`, `Policy`, `Channel`, `Token`, are
reflections of how your system thinks. But metaphors are not innocent: they come with baggage (words are pregnant with
meaning). They shape reader expectations. Misapplied metaphors like `Manager`, `Master`, or `Orchestrator`, can encode
outdated assumptions or incorrect relationships.

The point is not to avoid semantics, but to choose them carefully. Good names shape the mental model. They don't just
describe structure, they help readers
[think like the code thinks](https://www.infoq.com/presentations/Expression-of-Ideas/).

Names aren't just labels, they're **narrative signals**. As software matures, its components often shift in role and
relation. A name that made sense at the prototype stage may mislead after refactoring. Therefore, names must evolve in
tandem with architecture.

This is a call not for **systematic naming**, but for **semantic naming**, names that express participation in a
tapestry where each name is a thread in a larger fabric of meaning.

## Conclusion: Honest Naming

> There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.

Hungarian Notation and its cousins emerged from real needs in an earlier era. But today, they are outdated solutions to
problems we solve better with type systems, IDE tooling, and layered design.

Good naming tells the story of your code. It expresses the *why*, not the *how*. It is **abstraction, not annotation**.

Good naming is not a matter of habit or syntax, it is a matter of design clarity and cognitive alignment. It begins with
prioritizing domain intent over mechanical trivia. A name should tell the story of what the code does and why it exists,
not merely how it is stored or implemented. When names reflect the conceptual model of the system, developers work with
code as narrative, not just as syntax.

Naming is a conversation between the programmer and their future self, between collaborators, and between layers of
abstraction. Rather than burden names with redundant type hints or scope clues, let types, contracts, and tooling do
that work. Design your architecture so that the right names suggest themselves naturally, born from clear roles and
coherent responsibilities.

Every name is a participant in a metaphor. Choose those metaphors with care. A good name is not just correct, it is
honest. It reinforces meaning, reduces friction, and helps others build accurate mental models of the system. Prefixes
and encoding schemes often signal a breakdown in those metaphors. The better path is to design systems that make naming
obvious and intuitive.

> Prefixes are band-aids. Architecture and expressive design are the cure.

### Final Advice

- Prioritize intent and domain clarity above mechanical encoding.
- Recognize naming as a design conversation with your future self and collaborators.
- Let types, contracts, and tooling carry the burden of mechanical correctness.
- Design architectures and abstractions that naturally guide clear, semantic naming.
- Be mindful that every name is a participant in a larger metaphor and mental model; choose names that tell the truth
  about your code's behavior and structure.

## References

- [Lambda the Ultimate, "Alternative method for defining statically typed variables"](http://lambda-the-ultimate.org/node/3848)
- [Lambda the Ultimate, "Do names and symbols really imply semantics? If so what to do about it?"](http://lambda-the-ultimate.org/node/5637)
- [Wikipedia, "Hungarian notation"](https://en.wikipedia.org/wiki/Hungarian_notation)
- <https://www.joelonsoftware.com/2005/05/11/making-wrong-code-look-wrong/>
- <https://htmx.org/essays/locality-of-behaviour/>
- ["C2 Wiki, Hungarian Notation"](https://wiki.c2.com/?HungarianNotation=)
- ["C2 Wiki, System of Names"](https://wiki.c2.com/?SystemOfNames)
