---
title: Data Types as Algebra
date: 2026-09-25 12:00:00 -0600
---

## Introduction

While working on optimizations for an upcoming programming language in development (Lapis),
I went back to my bookmarks on the algebra of type systems and found that many of them
had rotted away (13+ years ago). The posts that survived were excellent, but none of
them went as far as the subject allows: the standard treatment stops at counting and a
few laws, and the deeper material (subtraction, recursive equations, the calculus) is
scattered across fifteen years of blog posts, comment threads, and papers. This essay
is the consolidation I was looking for, extended where the sources stopped short. It
is also insurance against the next round of link rot: everything essential is rebuilt
here from first principles.

Here is the claim: the word "algebraic" in "algebraic data types" is literal. Types form
an algebra (objects, operations, and laws), and the correspondence is not just a metaphor
borrowed from mathematics. It is working arithmetic, and it earns its keep three ways:
it verifies our refactorings, it explains design decisions, and it points at a frontier
of type system design.

The claim is not asking to be taken on faith. The next section verifies its core with
eight counting questions that use nothing but grade-school arithmetic. The scope is the
settled part of the subject, written for working programmers of TypeScript, Java, C#,
and their neighbors. No functional programming background is assumed. The frontier is
named where it belongs, at the end.

## Every Type Is Also a Number

How many values can a boolean hold? Two: `false` and `true`.

How many values can a function with return type `void` produce? One: `undefined`, the
value `void` expressions yield.

How many values does a `throw` expression produce? Zero: it never finishes producing
anything.

How many values can a nullable boolean hold? Three: `true`, `false`, and `null`.

How about a pair of booleans, `[boolean, boolean]`? Four. You pick the first and then the
second, and $2 \times 2 = 4$.

One more. How many values can the union `"yes" | "no" | boolean` hold? A value is either
one of the two strings or one of the two booleans: $2 + 2 = 4$.

Now the interesting one. How many functions have the type
`(b: boolean) => "yes" | "no"`? A function must say what it returns for `true` and
what it returns for `false`. Two choices for each input, so $2 \times 2 = 4$ functions: the
one that always says yes, the one that always says no, and the two that answer differently
depending on the input.

Last one, and this is where the exponent earns its name. How many functions have the
type `(t: "a" | "b" | "c") => boolean`? The function must say what it returns for each
of the three inputs, with two choices each: $2 \times 2 \times 2 = 2^3 = 8$. Notice the shape of
that count: one factor of 2 per input. The input's cardinality is the exponent, and
the output's cardinality is the base.

The answers line up with the type expressions: addition counted "or",
multiplication counted "and", and exponentiation counted "function".

Whatever your working picture of a type is, keep it. For many programmers, a type is
a guard rail: it fences off invalid states and lets the compiler check your
intentions. For others, a type is a name for an abstraction: it says what a value is
for. Both pictures are correct, and neither is in conflict with what comes next. A
type is also a number. The counting you just did has a name: every
type has a [cardinality](https://en.wikipedia.org/wiki/Cardinality), the number of
distinct values it permits. In the expressions that follow, the cardinality of a type
`A` is written `|A|`, with vertical bars around the type's name. The guard rails and
the abstraction names remain exactly as useful as they were; the count is an
additional fact about the same object, and it is the view that makes the rest of this
essay work.

The pattern extends to the rest of the type system. The two smallest answers have
names in TypeScript. The type with exactly one value is `void`, the return type of a
function that returns nothing; the `void` operator gives you a way to produce the
value: `void <anything>` evaluates the expression and yields `undefined`.[^1] The
type with no values at all, the type of a `throw` expression, is called `never`: it
exists so the compiler has a way to say "this code path never produces anything." An
8-bit integer permits $2^8$ values.

| TypeScript | Algebra | Reading |
| --- | --- | --- |
| `never` | $0$ | no values |
| `void` (value: `undefined`) | $1$ | one value |
| `boolean` | $2$ | two values |
| `A \| B` | $A + B$ | or |
| `[A, B]` | $A \times B$ | and |
| `(a: A) => B` | $B^A$ | exponential |

The table reads as arithmetic:
$|A \| B| = |A| + |B|$, $|[A, B]| = |A| \times |B|$, and $|(a: A) => B| = |B|^{|A|}$.
One refinement: $+$ in the algebra means a disjoint sum, while TypeScript's `|` is a union
of sets of values, so the count holds exactly when the alternatives share no values, as they do
in every example here. The vertical bars are doing no work yet; they will, once the expressions
get long enough to need simplifying.

Two cautions before building on this. First, cardinality counts the values a type permits, and a
program's actual values are usually a small subset of them. A `statusCode` field typed as `number`
will only ever hold a handful of HTTP codes, but the type permits every value JavaScript's numeric
domain allows, and the algebra counts all of them. The type is the specification of what may appear;
the terms that actually flow through the program occupy a sliver of that space. The algebra measures
the whole space, specification included. Second, a union does not need a tag to be a sum:

```typescript
// A union (a sum with no tag). Four variants, but the count is
// the sum of each variant's cardinality: |string| + 2 + |number| + 1
type Primitive = string | boolean | number | null;

// A tagged union: the same sum, wrapped so each value announces
// its variant. Identical cardinality.
type TaggedPrimitive =
  | { kind: "string"; value: string }
  | { kind: "boolean"; value: boolean }
  | { kind: "number"; value: number }
  | { kind: "null" };
```

The tag is not what makes it a sum; it is what makes the sum navigable, since a tag lets the
code that consumes the value tell the variants apart. The algebra measures information;
ergonomics decide presentation.

## The Laws of Algebra Are Refactorings

Here are two ways to shape the same data structure, a binary tree with data at every node:

```typescript
// Form 1: a node carries data; children are either a leaf or a branch
type Tree<Data> = {
  data: Data;
  children:
    | { kind: "leaf" }
    | { kind: "branch"; left: Tree<Data>; right: Tree<Data> };
};

// Form 2: each variant carries its own data
type Tree2<Data> =
  | { kind: "leaf"; data: Data }
  | { kind: "branch"; data: Data; left: Tree2<Data>; right: Tree2<Data> };
```

Form 1 is $D \times (1 + T \times T)$. Form 2 is $D + D \times T \times T$. Distributivity says
these are equal, which is why both forms encode exactly the same trees. Form 1 is usually the
better choice, since it does not repeat the data field across variants.

Distributivity also runs in reverse, and the reverse direction is the refactoring that finds
structure rather than flattening it. Expanding takes a product apart into cases; factoring takes
a flat list of cases and asks whether a product is hiding inside. Take a four-case type:

```typescript
type Slots<A> =
  | { kind: "empty" }                     // 1: neither slot holds an A
  | { kind: "left"; value: A }            // A: only the left slot
  | { kind: "right"; value: A }           // A: only the right slot
  | { kind: "both"; left: A; right: A };  // A^2: both slots
```

The expression is $1 + A + A + A^2$, and the declaration reads as four unrelated cases. It factors:

$$
1 + A + A + A^2 = (1 + A) \times (1 + A)
$$

which is a pair of optional `A`s:

```typescript
type PairOfSlots<A> = [A | null, A | null];
```

The two presentations carry the same information, with lossless conversions in both directions.
What the factored form exposes is independence: two dimensions, each an optional `A`, that vary
separately. From the pair, a function that swaps the slots is information-preserving by inspection;
from the flat union, the same function is four cases whose correctness must be checked one case at a
time. That is the general payoff of factoring: it answers the question "does this type contain
independent structure?", a question the flat form conceals. (The Frontier section meets this
expression again, under a square root sign.)

What "equal" means here is worth pinning down, because it is not identity. Two types are equal,
in the algebraic sense, when there are functions `to` and `from` mapping each to the other such
that a round trip through both returns a value indistinguishable from the original, in either
direction: two shapes for the same information, with a lossless conversion available either way.
Mathematicians call this an [isomorphism](https://en.wikipedia.org/wiki/Isomorphism). With that
definition in hand, a general fact emerges: the laws of high-school algebra that use only addition,
multiplication, and exponentiation are statements about types, and each one is a refactoring the
algebra has already verified. Distributivity, in both directions, was the example. The exponent
laws come next. (The laws that use subtraction and division are a different story; the Frontier
section takes them up.)

## The Exponent Laws

The exponent laws are where the algebra starts paying for itself. Four of them are worth
their own demonstrations.

### Currying Is an Exponent Law

Here is a law from school: $(C^B)^A = C^{A \times B}$. Powers of a power multiply. Read the left
side as types and something familiar appears: $(C^B)^A$ is a function from `A` to a function from
`B` to `C`, and $C^{A \times B}$ is a function from the pair `(A, B)` to `C`. The law says these
are the same information:

```typescript
type TwoArg<A, B, C> = (a: A, b: B) => C;
type Curried<A, B, C> = (a: A) => (b: B) => C;
```

The transformation has a name: currying. It is usually taught as a functional programming idiom,
a style choice about argument order and partial application. The algebra says something stronger.
Currying is not a convention someone invented; it is forced by the arithmetic. A function of two
arguments *is* a function of the first argument returning a function of the second, because
$C^{A \times B}$ and $(C^B)^A$ are two spellings of one number. The conversion between them
loses nothing, which is why partial application and every callback-taking API in JavaScript work
without friction: the information content of a two-argument function fits through a one-argument door.

The reverse direction is the same law read backwards, and it is just as useful. A function that
takes one argument and returns a function is a function that takes both arguments at once:

```typescript
// A builder that configures itself in stages
type Stage1 = (env: "dev" | "prod") => (retries: number) => Client;
// is the same information as
type Direct = (env: "dev" | "prod", retries: number) => Client;
```

Neither representation is more fundamental. The algebra says they are equal, and the laws
say either may be used whenever it is more convenient: curry to fix some arguments and pass
the partially applied function along; uncurry when a framework expects a single call. What
looks like an API design decision is an exponent law with a round trip.

### Splitting a Function Over a Sum

Splitting a function over a sum is the law $C^{A+B} = C^A \times C^B$: a function that handles
either an `A` or a `B` is a pair of functions, one per variant. A small example makes the arithmetic
visible. Define a three-value type of color channels, and consider a function that maps each channel
to a channel, such as the one cycling red to green to blue to red. Such a function is one of
$3^3 = 27$ possible functions. The law says the same information splits into three one-argument functions:

```typescript
type Channel = "red" | "green" | "blue";

// One function over a sum: 3^3 = 27 possibilities
type Cycle = (c: Channel) => Channel;

// The same information as a product of three functions: 3 * 3 * 3 = 27
type SplitCycle = {
  red: Channel;   // the output for input "red"
  green: Channel; // the output for input "green"
  blue: Channel;  // the output for input "blue"
};
```

The split version is just a lookup table with named rows: to run the function on `"green"`,
read the `green` row. The two forms convert into each other without losing anything. In
object-oriented code this shape is the visitor pattern: one `visit` method per subclass is
the pair (or triple) of functions, and the accept/dispatch machinery is the plumbing for
choosing which half to call. The law explains why visitor feels heavy: it is a workaround
for a missing union, building a sum type out of a class hierarchy and two levels of indirection.

### Arrays Split and Flatten

Array-of-structs versus struct-of-arrays is the law $(A \times B)^n = A^n \times B^n$, for
a fixed length $n$:

```typescript
type AoS = Array<{ x: number; y: number }>;
type SoA = { xs: number[]; ys: number[] };
```

Both hold the same information, with the caveat that the struct-of-arrays version must maintain
the invariant that the two arrays have equal lengths. The algebra says the information is the
same before any profiling does. Whether they are equally fast is a question about machines, not
about information.

### Every Function Is a Table

The lookup-table trick is the finite case of $B^A$. A pure function from 8-bit integers to
8-bit integers is one of $2^{256}$ possible functions, and any of them can be stored as a
table of 256 entries:

```typescript
// popcount: 256 entries; entry b holds the number of set bits in b
const popcount = new Uint8Array(256);
```

The identity $2^8 \to 2^8 = (2^8)^{2^8} = 2^{256}$ is the difference between a function call
and a memory read. Any pure function over a small domain can become a table, and the algebra is why.

The small numbers do quiet work in the same algebra, and they were on the table from the start.
`never` is zero: a union with `never` is just the other type ($T + 0 = T$), and a tuple containing
`never` cannot be constructed at all ($A \times 0 = 0$). `void` is one: pairing with it changes
nothing ($A \times 1 = A$). These are not edge cases. They are the reason `never` is useful for
deleting variants from generic types, and the reason a field of type `void` carries no information.

The general lesson: before restructuring a type, we write its algebraic expression and apply the
laws. If the expressions come out equal, the refactoring is information-preserving. If they do not,
the mismatch shows up in the arithmetic before it shows up in the bug reports.

## Subtraction Is Constraint Enforcement

The error-handling convention from JavaScript is a type that almost exists: a pair where one slot
holds the result and the other holds an error, and exactly one of the two is present. The convention
is native to the standard library even though the type is not. The Promise executor hands you both
levers and trusts you to settle the promise exactly once, with one of them:

```typescript
new Promise<T>((resolve, reject) => {
  // the convention: settle exactly once, with one of these
});
```

In Node.js callbacks the same pair arrived as the arguments `(error, result)`. As a data type,
the convention spells itself like this:

```typescript
type PairResult<T, E> = [T | null, E | null];
```

Each slot is a nullable value, and the nullable deserves a name of its own, because it is about
to do a lot of work:

```typescript
type Maybe<T> = T | null;
```

This shape was counted earlier: a nullable boolean was $2 + 1$. In general, a `Maybe<T>` holds
either nothing (1 way) or a `T` ($T$ ways), so its cardinality is $1 + T$.

The pair is a `Maybe<T>` and a `Maybe<E>` side by side, and counting it means enumerating the four combinations:

| result slot | error slot | the convention says | count |
| --- | --- | --- | --- |
| `T` | `E` | illegal: both present | $T \times E$ |
| `T` | nothing | legal | $T$ |
| nothing | `E` | legal | $E$ |
| nothing | nothing | illegal: neither present | $1$ |

The full product is $(1 + T) \times (1 + E)$, and its expansion $1 + T + E + T \times E$ is
just the table's four rows written as arithmetic. The convention keeps two rows and forbids two.
Subtract the forbidden rows:

$$
(1 + T)(1 + E) - 1 - T \times E = T + E
$$

What remains is $T + E$: either a result or an error, and nothing else. That is precisely the
shape of a result type:

```typescript
type Result<T, E> =
  | { kind: "ok"; value: T }
  | { kind: "err"; error: E };
```

The pair of Maybes permits exactly the same valid outcomes as `Result`, plus two illegal states
the compiler cannot see. The type system of `Result` enforces, at compile time, what the pair
convention leaves for us to honor. The advice to "make illegal states unrepresentable" is usually
stated as a slogan. Algebraically it is a subtraction: write the full product, subtract the
forbidden region, and see whether a familiar type is what remains. That is the meaning of the
algebra's first illegal operation: subtraction removes the states a convention forbids.

TypeScript already ships a fragment of this operation. `Exclude<T, U>` removes from a union type
every member assignable to `U`:

```typescript
type Direction = "north" | "south" | "east" | "west";
type Horizontal = Exclude<Direction, "north" | "south">; // "east" | "west"
```

That is set difference over unions: a genuine difference type, restricted to the case where
the subtracted type is a sub-union. What TypeScript does not provide is subtraction over
arbitrary types, where the forbidden region is defined by a predicate rather than by membership.

## Recursive Types Are Equations

Here is a type you can read without any new machinery:

```typescript
type List<A> =
  | { kind: "nil" }                           // the empty list: 1 value
  | { kind: "cons"; head: A; tail: List<A> }; // an element and the rest
```

A list is either empty (1 way) or an element paired with another list ($A \times L$ ways).
As an equation, writing $L(A)$ to make the dependence on the element type explicit:

$$
L(A) = 1 + A \times L(A)
$$

Expand by repeated substitution and a pattern appears:

$$
\begin{aligned}
L(A) &= 1 + A \times L(A) \\
  &= 1 + A \times (1 + A \times L(A)) \\
  &= 1 + A + A^2 \times L(A) \\
  &= 1 + A + A^2 + A^3 \times L(A) \\
  &\mathrel{\phantom{=}} \cdots \\
  &= 1 + A + A^2 + A^3 + \cdots
\end{aligned}
$$

Each term says something true: a list is empty, or holds one `A`, or two, or three, and so
on. The expression is also doing a new job: no longer one count but a series, with the
exponent of $A$ tracking the list's length. Now we commit the "crime". The algebra of types
has addition, multiplication, and exponentiation, but nothing that plays the role of
subtraction or division: no type is
"whatever a list is, minus its elements". Treat the equation as ordinary school algebra
anyway, and solve for $L(A)$:

$$
L(A) - A \times L(A) = 1 \qquad (1 - A) \times L(A) = 1 \qquad L(A) = \frac{1}{1 - A}
$$

This is nonsense as types. No mainstream language has a negative type or a fractional type.
(Or so it seems; the Frontier section speculates on what these could mean, and the fractional
type turns out to have a familiar face.) But the expression is recognizable from school: the
[geometric series](https://en.wikipedia.org/wiki/Geometric_series). The sum
$1 + A + A^2 + A^3 + \cdots$ is exactly what $\frac{1}{1 - A}$ expands to,
the same way $\frac{1}{1 - 0.5}$ expands to $1 + 0.5 + 0.25 + 0.125 + \cdots$.
The manipulation was "illegal" because it used operations the algebra of types has not
defined; the answer was legal anyway, an ordinary type with an ordinary series. A recursive
type definition is not just a
definition. It is an equation, and solving it reveals the type's structure.

Binary trees commit a worse one. The type:

```typescript
type Tree<A> =
  | { kind: "leaf" }                          // the empty tree: 1 value
  | { kind: "node"; value: A; left: Tree<A>; right: Tree<A> };
```

gives the equation $T(A) = 1 + A \times T(A)^2$. Rearranged: $A \times T(A)^2 - T(A) + 1 = 0$.
That is a quadratic equation in $T(A)$, and the quadratic formula applies:

$$
T(A) = \frac{1 - \sqrt{1 - 4A}}{2A}
$$

The square root of a type. The algebra can be pushed further than it has any right to go,
and the destination is worth the trip: a genuinely surprising isomorphism between trees and
tuples of trees, plus a criterion for telling which of the algebra's conclusions to trust.
The route is to set $A = 1$, the `void` of the opening table: every node's value is now the
same value, so trees are distinguished by shape alone, and the equation loses its variable:

$$
T = 1 + T^2
$$

Rearranged, $T^2 = T - 1$. Multiply both sides by $T$ and substitute $T^2 = T - 1$ into the
result:

$$
\begin{aligned}
T^3 &= T \times T^2 \\
    &= T \times (T - 1) \\
    &= T^2 - T \\
    &= (T - 1) - T \\
    &= -1
\end{aligned}
$$

Squaring gives $T^6 = (T^3)^2 = 1$. Read as types, that says a six-tuple of trees holds
the same information as the one-value type: that there is exactly one six-tuple of trees.
That is false; six-tuples of trees are plentiful, so this is not a place to stop.
Multiplying by $T$ is the same move the derivation has been using all along, and it gives
$T^7 = T$. This neighbor reads differently: one tree carries exactly the same information
as a seven-tuple of trees. Any tree can be unpacked into seven trees, and the seven
reassembled into the original, losslessly.

The unpack regroups. The slots hold trees, so a slot can hold an entire subtree, and
the empty tree fills the slots a small tree never reaches. In Blass's construction the
regrouping follows the tree's leftward path: the root, the left child, the left-left
child, and so on. For the balanced tree

```
        r
       / \
      /   \
     a     b
    / \   / \
   c   d e   f
```

the leftward path is three nodes long, and the unpack is
`( -,  -,  -,  -,  -,  -,  tree )`: the whole tree rides in slot 7, and the empty tree
fills the first six slots. The case analysis only reaches up the spine when the spine is
long enough; a left-leaning tree gives it more to do. The tree

```
          r
         / \
        s   a
       / \
      t   b
     / \
    u   c
   / \
  v   d
 / \
w   e
```

unpacks into `( a,  b,  c,  d,  e,  -,  - )`: walking down the spine, the subtree to the
right of each node fills the next slot, and the deepest spine node's two subtrees take
the last two slots, here both empty. Reassembly runs the cases in reverse: the last two
slots join into the deepest spine node, then each earlier slot becomes the right subtree
of a new node wrapped around what has been built, and the original tree is back.

The pair of conclusions is the interesting part: the same algebra produced $T^6 = 1$, which
is false, and $T^7 = T$, which is true. Andreas Blass's
["Seven Trees in One"](https://arxiv.org/pdf/math/9405205v1.pdf) explains which conclusions
to trust: an equation produced this way is true of types exactly when it is derivable from
$T = 1 + T^2$ using the ordinary laws of addition and multiplication alone. The
seventh-power conclusion passes that test; the sixth does not. The paper constructs the
unpack in full, as a handful of cases decided by inspecting the seven-tuple only a
fixed four levels deep.

The series expansion is $T(A) = 1 + A + 2A^2 + 5A^3 + 14A^4 + \cdots$, and those
coefficients are not accidental. They are the subject of the next section.

## The Coefficients Count Tree Shapes

The tree series was $T(A) = 1 + A + 2A^2 + 5A^3 + 14A^4 + \cdots$. Before naming the coefficients,
count what they count. The list series counted lists by length; the tree series counts trees by
number of nodes, and the coefficient of $A^n$ is the number of distinct shapes a tree with $n$ nodes can take.

```
-
```

```
  o
 / \
-   -
```

```
  o            o
 / \          / \
-   o        o   -
   / \      / \
  -   -    -   -
```

```
      o         o          o             o
     / \       / \        / \           / \
    o   -     o   -      -   o         -   o
   / \       / \            / \           / \
  o   -     -   o          o   -         -   o
 / \           / \        / \               / \
-   -         -   -      -   -             -   -

                     o
                    / \
                   o   o
                  / \ / \
                 -  - -  -
```

etc.

With no nodes there is only the empty tree: coefficient 1. With one node there is again one shape:
a root with two leaf children. With two nodes there are two shapes: the second node hangs off the
left or off the right. With three nodes there are five. Draw them and the coefficients stop being
algebra: they are a census of the shapes, and the shapes are exactly the values of `Tree<A>` once
you stop caring what the `A`s contain.

These counts have a name: the [Catalan numbers](https://en.wikipedia.org/wiki/Catalan_number).
They are famous for counting a suspiciously wide family of objects, and the interpretation closest
to the shapes above is tupling. A chain of values combined pairwise can be grouped in any order, and
each grouping is one of these trees: tupling `a`, `b`, `c` is either `[a, [b, c]]` or `[[a, b], c]`,
two trees with the same three leaves. The expression `[p, q, r, s]` has five groupings, one per
three-node shape. When the grouping is flattened afterward, all five mean the same thing, which is
why a serializer that treats nested tuples naively faces a Catalan explosion of equivalent
representations. The type equation did not borrow the Catalan numbers. It rediscovered them.

There is a practical payoff hiding in this census, and it is bigger than counting. If the shapes
are the values of the type, then writing a program to inhabit a type is searching this space of
shapes: pick a shape, fill the holes, and check the pieces against the sub-goals the type hands you.

The smallest example makes the mechanics visible. Take the identity function, `(a: A) => A`. The
type is an exponential, $A^A$, and its program is a tree: the root is the function arrow, and
beneath it sits the body. There is exactly one shape with no wasted parts: take the input and return it.

```typescript
// Goal: (a: A) => A
// The arrow is the root. The body must be an A. The only A in
// scope is `a`. One candidate, and it type-checks:
const identity = <A>(a: A): A => a;
```

A slightly bigger goal shows the search doing real work. Take the pairing function,
`(a: A, b: B) => [A, B]`. The output type is a product, so the root of the program is a tuple
construction, and the type hands down two sub-goals: fill the first slot with an `A`, fill the
second with a `B`. The scope contains exactly one of each, so the search terminates immediately:

```typescript
// Goal: (a: A, b: B) => [A, B]
// The tuple is the root. Two sub-goals: an A and a B.
// Both are satisfied by the inputs. One program survives:
const pair = <A, B>(a: A, b: B): [A, B] => [a, b];
```

Notice what the type did in both cases: it dictated the shape of the program before any logic
was written. The type constrains the shape of the search so strongly that, in simple cases,
the body can be reconstructed almost mechanically: walk the type's tree and ask, at each node,
what fills the hole. That is
[term inference](https://docs.scala-lang.org/scala3/book/scala-features.html#term-inference-made-clearer).
Tools like [Djinn](https://github.com/augustss/Djinn) and [Hoogle](https://hoogle.haskell.org/)'s type
search do exactly this: given a type signature, enumerate candidate programs shaped like the type demands
and keep the ones that type-check. The Catalan numbers measure one component of that search: the number of
tree shapes available at a given depth. A type with five three-node shapes has five candidate skeletons at
depth three, before variables in scope, recursion, and equivalence are accounted for; a realistic signature
has more candidates than atoms in the universe, which is why synthesis tools lean on hints, examples, and
heuristics to prune the search. When an AI assistant writes a function body from a signature, it is
navigating a far larger search space, of which this census is one layer.

## Differentiation Builds Zippers

The next idea was discovered twice: once as a data structure, and years later as a theorem. The
[zipper](https://wiki.haskell.org/Zipper) is a data structure with a cursor. A text cursor is a zipper
over a string: the character at the cursor, the text before it, and the text after it. Moving the cursor
is cheap because the structure is arranged around the focus, rather than searched for it. For a binary
tree, the zipper is the focused value, its two subtrees, and the path of steps back to the root:

```typescript
type TreeZipper<A> = {
  focus: A;        // the value at the cursor
  left: Tree<A>;   // subtree below and to the left
  right: Tree<A>;  // subtree below and to the right
  path: Step<A>[]; // the way back to the root, nearest step first
}; // reuses Tree<A> from the recursive-types section

type Step<A> =
  | { kind: "fromLeft";  value: A; right: Tree<A> } // cursor sits in a left child: keep the parent's value and the right sibling
  | { kind: "fromRight"; value: A; left: Tree<A> }; // cursor sits in a right child: keep the parent's value and the left sibling
```

Editing a value deep in an immutable tree normally means walking from the root and rebuilding every level
on the way back up. With the zipper, the context is already in hand: moving down pushes one step onto
the path, moving up pops one off, and editing the focus touches nothing else.

![A binary tree with the cursor on node b, and the same cursor shown as a zipper: one path step holding the direction, the parent value, and the sibling subtree, followed by the focus with its two subtrees](/media-library/tapl/tree-zipper.svg)

The shape looks designed: a focus, two subtrees, a list of steps. It is not. The tool that forces it comes
from a corner of mathematics with a surprising reach:
[the rules of differentiation](https://en.wikipedia.org/wiki/Derivative#Rules_of_computation). No calculus
background is needed; the rules will be stated as they appear, and they are simpler than their reputation.
The bridge is a deliberately impoverished object. Start from the pair counted earlier, `[A, A]`, holding
the values `42` and `7`:

```ts
const p: [number, number] = [42, 7];
```

Now remove one value, leaving its position behind:

```ts
[ 42, _ ]
      ^-- a hole: a position where an A used to be
```

A hole is a position in a data structure where data of type `A` could sit, with the data removed. Now
count them. How many holes of type `A` does a pair `[A, A]` have? Two: the left position and the right.

```ts
[ _ , 42 ]     [ 42, _ ]
  left hole      right hole
```

A triple has three. In general $A^n$ has $n \times A^{n-1}$ holes. Readers with calculus will
recognize the [power rule](https://en.wikipedia.org/wiki/Power_rule): $\frac{d}{dx}x^n = n \times x^{n-1}$,
the same count with holes instead of slopes. Additional rules from calculus also hold:

| Rule | Calculus | Holes |
| --- | --- | --- |
| power | $\frac{d}{dx}x^n = n \times x^{n-1}$ | $A^n$ has $n \times A^{n-1}$ holes |
| sum | $(f + g)' = f' + g'$ | holes in $F + G$ = holes in $F$ + holes in $G$ |
| product | $(f \times g)' = f' \times g + f \times g'$ | a hole in $F \times G$ is a hole in $F$ (with `G` intact) or a hole in `G` (with `F` intact) |

[Conor McBride](http://strictlypositive.org/) observed in 2001 that these are not coincidences. For regular
types, the derivative with respect to `A` is precisely the type of one-hole contexts. His paper's title
states the theorem:
["The Derivative of a Regular Type is its Type of One-Hole Contexts."](http://strictlypositive.org/diff.pdf)

The zipper is a one-hole context, so the theorem makes a prediction: differentiate the tree's equation,
and the zipper's type should fall out. It does. The derivation uses the product rule from the table above
on the recursive equation itself. Differentiate both sides of $T(A) = 1 + A \times T(A)^2$. The constant
vanishes, the product rule splits the product, and the power rule handles the square:

$$
T'(A) = T(A)^2 + 2 \times A \times T(A) \times T'(A)
$$

Read the two terms as the two places a hole can sit. The $T(A)^2$ term is the hole at a value: the
node's value removed, its two subtrees left intact. The $2 \times A \times T(A) \times T'(A)$ term is
the hole deeper down: choose which subtree holds it (2 ways), keep the parent's value ($A$) and the
sibling subtree ($T(A)$), and descend ($T'(A)$). Unrolled, the context is a list of steps, each step
a direction, a parent's value, and a sibling subtree, ending at the pair of subtrees around the hole.
That is `TreeZipper` above, field for field. Solving for $T'(A)$ and reading the result against the list
equation solved earlier, $List(X) = \frac{1}{1 - X}$:

$$
T'(A) = \frac{T(A)^2}{1 - 2 \times A \times T(A)} = T(A)^2 \times List(2 \times A \times T(A))
$$

The zipper of a tree is a value, two subtrees, and a list of steps: not a design decision, but a
consequence of the product rule. The same computation yields zippers for any regular type (a type
built from sums, products, and recursion over a fixed shape, which is everything this essay has
described so far): differentiate, then multiply by the element type.

McBride's result applies differentiation to finite trees of tagged unions: structures with no limits,
no slopes, and nothing continuous anywhere. The rules transfer because the underlying question is the
same in both settings: how does the structure change as one variable varies, everywhere that variable
occurs? Calculus applies to types, and it builds data structures.

## The Second Derivative Is a Finger Tree

Take a [2-3 tree](https://en.wikipedia.org/wiki/2%E2%80%933_tree), whose shape in TypeScript is:

```typescript
type Node23<A> =
  | { kind: "leaf"; value: A }
  | { kind: "node2"; left: Node23<A>; right: Node23<A> }
  | { kind: "node3"; left: Node23<A>; middle: Node23<A>; right: Node23<A> };
```

The type is the grammar - trees with two- and three-way nodes - and the balance that
defines a 2-3 tree is an invariant the type does not express, but we'll assume it holds for all trees we consider here
for brevity. Algebraically this is
$N(A) = A + N(A)^2 + N(A)^3$ (each node holds two or three subtrees). Differentiate
once, using the power and sum rules from the table above:

$$
N'(A) = 1 + 2 \times N(A) \times N'(A) + 3 \times N(A)^2 \times N'(A)
$$

The $N'(A)$ factors are the holes, read exactly as they were for the binary tree above. Each one
marks a place where a leaf's value was removed: the $1$ is the hole in a leaf's value, the
$2 \times N(A) \times N'(A)$ term says a `node2`'s hole can be in either of its two subtrees
(the rest of the node, $N(A)$, stays intact), and the $3 \times N(A)^2 \times N'(A)$ term says
the same for a `node3`'s three subtrees. Read the whole expression as "a hole, plus a node with
a hole in its left subtree, plus a node with a hole in its middle, plus a node with a hole in its
right": every position where an `A` could have been, with exactly one removed. That is the zipper:
a context with one hole. Differentiate again:

$$
\begin{aligned}
N''(A) &= 2 \times (N'(A)^2 + N(A) \times N''(A)) \\
       &+ 3 \times (2 \times N(A) \times N'(A)^2 + N(A)^2 \times N''(A))
\end{aligned}
$$

This is a context with two holes, and a 2-3 tree with holes at both ends has the same shape as
the finger tree of [Hinze and Paterson](https://www.staff.city.ac.uk/~ross/papers/FingerTree.html):
digits at the ends, a spine of nested 2-3 nodes between them. The correspondence is structural, not
historical. Hinze and Paterson built their type by transforming a 2-3 tree in a manner reminiscent
of Huet's zipper; the second derivative arrives at the same shape from the other direction. In TypeScript:

```typescript
type Digit<A> =
  | [A]
  | [A, A]
  | [A, A, A]
  | [A, A, A, A]; // 1-4 elements

type FingerTree<A> =
  | { kind: "empty" }             // no elements
  | { kind: "single"; value: A }  // exactly one element
  | { kind: "deep";
      prefix: Digit<A>;              // the left finger
      deeper: FingerTree<Node23<A>>; // the spine, one level deeper
      suffix: Digit<A>;              // the right finger
    };
```

The type of `deeper` is the whole idea. The spine does not recurse on `A`; it recurses on `Node23<A>`,
so each level down works with nodes from one level deeper in the tree: the descent the first derivative
encoded for the single-hole zipper, now written into the type. Each digit is what remains of a node
after the hole's path passes through it: a `node2` leaves one child behind, a `node3` leaves two, and
the wider digits are working room that keeps the operations amortized constant.[^2] Two digits, two
holes; unrolling the $N''(A)$ equation level by level produces one digit pair per level, which is the spine.

![A finger tree holding the letters a through z: digits of elements at the left and right ends of every level, small two-three trees hanging between the digits and the spine, and the spine descending to an empty tree](/media-library/tapl/finger-tree-spine.svg)

The two holes are the fingers, and they are what the shape is named for.

## The Frontier

Everything above is known in literature or derivable in a relatively straightforward manner. What
follows is my exploration of what happens if we try to push this further: division, quotienting,
difference and negation, square roots, and subtyping, which changes the foundation under the other four.

### Division

The list equation demanded division. Solved earlier, it read $L(A) = \frac{1}{1 - A}$, whose series
expansion is the list itself:

$$
\frac{1}{1 - A} = 1 + A + A^2 + A^3 + \cdots
$$

Legal as a series, nonsense as a fraction, and no mainstream language has a division operation on
types to make sense of it. Candidate meanings exist, and they are not the same operation. One
candidate is discarding information: a multiset represented as a list should not distinguish
`[a, b, c]` from `[c, a, b]`, and dividing away the orderings is one way to say that. Another
candidate is factor extraction: if $Thing = Color \times Shape$, then $Thing / Color$ should be
$Shape$. The word "division" is doing double duty for two different operations, and a language
that grew either one would need syntax that keeps them apart.

A third candidate is stranger than either. Read the closed form $L(A) = \frac{1}{1 - A}$ not as
negative or fractional values but as a protocol: the ability to keep paying out `A`s, one per demand,
until told to stop. That is precisely a pull-based stream:

```typescript
type List<A> = 1 / (1 - A); // algebraically: Generator<A>
```

A list is a push of all its elements at once; a generator is the same information divided by the demand
protocol. The fraction is not nonsense. It is the type of `A`s, on credit. A language where type
declarations are equations and the compiler solves them could offer the closed form as a derived
implementation: declare the list, and the solver reports that the same equation has a second reading,
a demand-driven producer. That is suggestive of generators rather than an isomorphism with them; a
generator can also run forever or interleave effects, which no finite list can.

### Quotienting

Division's first candidate turns out to be a different operation wearing division's clothes. Dividing
away the orderings of a list does not remove values; it identifies them: `[a, b, c]` and `[c, a, b]` are
declared the same. Type theorists call this [quotienting](https://en.wikipedia.org/wiki/Quotient_type),
and because it is not division, we can use different syntax (`/~`). The right-hand side is the symmetry
to impose: a function whose output must be unchanged when the symmetry is applied, or a family of such
functions. `swap` maps `(a, b)` to `(b, a)`, so an unordered pair is a pair where `swap` changes nothing.
`Permutations` is the family of all reorderings, so a multiset is a list where every reordering changes
nothing:

```typescript
// /~ declares the listed symmetries to be invisible
type UnorderedPair<A> = (A * A) /~ swap;    // (a, b) ~ (b, a)
type Multiset<A> = List<A> /~ Permutations; // any ordering ~ any other
```

Quotienting closes the loop with a type that has no recursive equation at all. A multiset is a
list quotiented by all $n!$ orderings, so its series is $\sum \frac{A^n}{n!}$, which is the
[Taylor series](https://en.wikipedia.org/wiki/Taylor_series) of $e^A$: the exponential type. A caveat
worth stating once: dividing by $n!$ is not plain cardinality arithmetic. It is the bookkeeping that
identifying all orderings demands, and it is where this essay's counting quietly becomes a generating
function rather than a count. In pseudo-TypeScript, $e^A$ has a down-to-earth spelling. A term of the
series, $\frac{A^n}{n!}$, reads: choose which `A`s appear ($A^n$), then divide away the $n!$ orderings
they could have arrived in. What survives the division is not a list of `A`s but a tally:

```typescript
// e^A: a count for each A, order nowhere in sight
// (Nat is schematic: TypeScript has no natural-number type)
type Exp<A> = Map<A, Nat>;
```

A term with three `A`s is not `[a, b, c]` but `{ a: 1, b: 1, c: 1 }`; reorderings change nothing
because a `Map` has no order to change.

Two consequences fall out for free. The first assembles two facts already on the table.
[The differentiation section](#differentiation-builds-zippers) established that a type's derivative
is its zipper; and $e^x$ is a
[fixed point of differentiation](https://tutorial.math.lamar.edu/classes/calci/DiffExpLogFcns.aspx):
differentiate it and the same function comes back, $\frac{d}{dx}e^x = e^x$. Put them together and the
zipper of a multiset is a multiset: poke a hole in a bag of values and you get a bag of values with a
marked position. The second needs only the exponent laws and is visible in the spelling: since
$e^{A+B} = e^A \times e^B$, a count per element of `A | B` is a count per `A` beside a count per `B`,
so a multiset of `A`s and `B`s is a pair of a multiset of `A`s and a multiset of `B`s, which is just
partitioning. Neither fact is obvious from the definitions; both are one line of algebra. (The same
technique recovers circular lists, whose series is $-\log(1 - A)$: recognize that the zipper of a
circular list is a plain list, then integrate. Integration, absent from everything above, finally
appears, on the other side of the derivative.)

### Difference and Negation

What would subtraction beyond unions look like in a language that committed? Sketching pseudo-TypeScript:

```typescript
// Difference: the complement of M within U (Exclude, generalized)
type Without<U, M> = U \ M;

// Negation: not negative values, but a debt. An obligation to
// produce an A. The cancellation law (-A) + A = 0 says a debt
// plus its payment annihilates, which is how linear types and
// session types treat resources.
type Debt<A> = -A;
```

Difference has a real precedent, and TypeScript ships several fragments of it at different type levels.
Over unions, `Exclude<T, U>` is set difference outright, and its definition is one line worth reading:
`T extends U ? never : T`. Distributed over the union, the conditional tests each member against `U`, and
the true branch maps the member to `never`, the zero that deletes it. Difference, as TypeScript implements
it, is a conditional whose yes-branch annihilates. Over objects, `Omit<T, K>` subtracts keys:
`Omit<{ id: number; name: string }, "id">` is the pair minus its first component, the same
product-minus-factor move as $Thing / Color$ but spelled for properties. Over functions, the `-?` modifier
removes optionality from a property, the closest thing in the language to a negation operator: it takes a
type that permits absence and produces one that forbids it. What none of them do is subtract by shape rather
than by name: `U \ M` would remove from `U` everything `M` can account for, whether or not `M` names the
members. A conditional can test membership and delete the hits, but it cannot return the region that
fails the test; the complement of an arbitrary type is not expressible. That is the gap the pseudo-syntax
above names.

Negation-as-debt is the reading with the deepest reach, and the one for which TypeScript has no notation:
`extends` can filter a union by negation, as `Exclude`'s definition does, and it can compute a dual, as
the encoding below does, but neither names the obligation. The debt itself is already in code you write.
A callback of type `(value: A) => void` does not consume an `A` so much as demand one: it is a `Debt<A>`
in function clothing, discharged by whoever invokes it.

Obligations get interesting when two parties exchange them, and TypeScript can express that exchange
today with conditional types. [One gist](https://gist.github.com/YBogomolov/c5675b788a7046b6edf9e76ef7337af7)
encodes the whole machinery in three type aliases and a function signature; condensed:

```typescript
// A protocol is a sequence of steps, ending in completion.
type Eps = { tag: "eps" };
type Send<A, P> = { tag: "send"; next: P };
type Recv<A, P> = { tag: "recv"; next: P };

// Dual computes the other end's obligations, one step at a time.
type Dual<P> =
  P extends Send<infer A, infer Q> ? Recv<A, Dual<Q>> :
  P extends Recv<infer A, infer Q> ? Send<A, Dual<Q>> :
  Eps;

type Chan<P> = { protocol: P };

// connect accepts a pair only when the client discharges
// exactly what the server owes.
declare function connect<S, C extends Dual<S>>(server: Chan<S>, client: Chan<C>): void;

// A server that sends a number, then receives a boolean.
type Server = Send<number, Recv<boolean, Eps>>;

declare const srv: Chan<Server>;
declare const cli: Chan<Dual<Server>>;    // Recv<number, Send<boolean, Eps>>
declare const cli3: Chan<Server>;         // another sender

connect(srv, cli);   // ok: the debts cancel
connect(srv, cli3);  // error: two senders, nobody pays
```

Read `Server` as a ledger: this end of the channel owes one `number` and is owed one `boolean`. `Dual`
computes the mirror image, the other end's ledger: owed one `number`, owing one `boolean`. The `connect`
function accepts a pair only when the ledgers cancel, which is the cancellation law $(-A) + A = 0$ doing
protocol work: a send paired with its receive annihilates, and the channel closes with nothing left owed.
Mismatched payloads fail to compile, and so does connecting two clients: two senders both owe, and nobody
pays.

What the encoding computes has a name: [duality](https://en.wikipedia.org/wiki/Dual_(category_theory)),
the central mechanism of [session types](https://en.wikipedia.org/wiki/Session_type), where every channel
endpoint's type is the negation of its partner's, so the two ends can never disagree about who owes what.
[Wadler's](https://homepages.inf.ed.ac.uk/wadler/papers/propositions-as-sessions/propositions-as-sessions.pdf)
"Propositions as Sessions" makes the correspondence precise: propositions of linear logic, where $-A$ is a
first-class connective, correspond to session types, where the obligation to send is an ordinary part of a
channel's type. The debt reading explains what the encoding is doing: `Dual<X>` is the negation operator,
computed structurally, one step at a time. But duality stays a derived property of channel pairs rather
than a type the programmer holds. That is the gap a negation operator would close: name the obligation,
pass it to other code, and let the compiler track that it was discharged. In the pseudo-syntax, the same
protocol reads as a ledger of debts, and the client's type is its negation, written rather than computed:

```typescript
// The server's protocol, spelled as debts:
// owes a number, is owed a boolean, then done.
type Server = -number + boolean + 0;

// The client is the negation, and negation is an involution:
// -(-A) = A, so the two ledgers cancel on connect.
type Client = -Server; // = number + (-boolean) + 0

declare function connect<S, C extends -S>(server: Chan<S>, client: Chan<C>): void;
```

`Dual<P>` and `-P` are the same function; the difference is that `-` is a first-class type the
programmer can hold. A function that promises to send three messages could return `Debt<A> + Debt<A> + Debt<A>`,
and the caller could not forget to provide the channel that pays it.

### Square Roots

Square roots are stranger still, and they are worth playing with, because the tree equation's closed form
contains one: $\sqrt{1 - 4A}$. Start with the tame case, the pair of optionals factored in the laws section.
The type `Maybe<A> * Maybe<A>` expands to $(1 + A) \times (1 + A) = 1 + 2A + A^2$, and the square root of
that expression is `Maybe<A>`: the type whose product with itself reconstructs the original. In code:

```typescript
type Maybe<A> = A | null;
type PairOfMaybes<A> = [Maybe<A>, Maybe<A>];
// PairOfMaybes<A> = Maybe<A>^2, so sqrt(PairOfMaybes<A>) = Maybe<A>
```

That case is bookkeeping: the square root just undoes a product. The tree equation's root is stranger,
because $1 - 4A$ is not a product anyone built. It is a *negative* type (a debt of four `A`s, in the
notation above) sitting under a root sign. One candidate reading: $\sqrt{1 - 4A}$ is the type of a structure that pairs with itself to produce a debt of four `A`s, which is close to how the tree's own recursion balances: every node spends two subtrees and one `A`, and the equation $T(A) = 1 + A \times T(A)^2$ is the ledger. Whether a square root of a type can be a first-class language feature, or is only ever bookkeeping inside the solver, is an open question. What is not open is that the algebra reaches for the root on its own: solve the tree equation, and there it is, under the radical, whether or not anyone has a name for it.

### Subtyping

Subtyping changes the algebra's foundation, and TypeScript programmers already live with the
consequences. Without subtyping, a sum is a clean either/or: every value of `A + B` is unambiguously
one or the other. With subtyping, types overlap like regions in a Venn diagram.

![Two Venn diagrams: on the left, a disjoint sum of Mammal and Bird inside Animal, where subtraction is unambiguous; on the right, overlapping Mammal and Pet circles with Dog in the intersection, where Animal minus Mammal must decide what happens to Dog](/media-library/tapl/subtyping-venn.svg)

A `Dog` is both an `Animal` and a `Pet`; asking for `Animal - Mammal` requires deciding what "minus"
means when the regions overlap. Union and disjoint sum come apart, and the question "is this type prime?"
splits into three different questions: irreducible under product, irreducible under sum, and atomic in
the subtype hierarchy. TypeScript's unions and `Exclude` are early fragments of this set-theoretic view
of types. The rest is open design space, and one language is building on it:
[Verse](https://dev.epicgames.com/documentation/en-us/uefn/verse-in-unreal-engine/verse-language-reference),
Epic Games' language for Fortnite, treats types as sets of values from the ground up, with subtyping,
intersection, and union as native operations.

Verse is not starting from nothing, because the theory underneath it is older and more settled than this
essay's frontier has so far admitted. [Semantic subtyping](https://arxiv.org/html/2111.03354) interprets a
type as the set of its values and defines subtyping as set inclusion, which makes union, intersection, and
negation ordinary set operations with decidable subtyping. CDuce shipped it; Scala 3's union and
intersection types are fragments of the same view; and the type checkers of TypeScript, Flow, and Kotlin
already use difference internally, as the meta-operation that refines types after a test, without exposing
it to the programmer. What remains unsettled is narrower and still real: no mainstream language exposes
first-class negation or difference to its programmers, the inference of negated arrow types is an open
research problem, and division, quotients, and square roots of types have no semantics anywhere. The
algebra is ahead of the languages, but less far ahead than the frontier section may have suggested.
Verse is the experiment that will show how much of it survives contact with a language that commits.

## Arithmetic All the Way Down

The name was the claim, and the claim survives contact with the details. A type is also a number,
and the ways we combine types are addition, multiplication, and exponentiation. The laws of algebra
are our refactorings. Subtraction is constraint enforcement. Recursive definitions are equations whose
solutions are the same series we met in school. Differentiation builds zippers. The Catalan numbers
appear because the tree equation is their recurrence. The operations the algebra still demands
(subtraction beyond unions, division, quotients, square roots) mark where the next generation of type
systems will differ from the current one. When they arrive, they will not feel like new mathematics.
They will feel like the language catching up with the algebra we were already doing.

Two cautions keep the tool honest. The counting is exact for finite, total, pure types, and real
languages reach past that boundary: a function whose body throws or loops forever never delivers the
value its type promises, exceptions and effects change what a value even is, and infinite types like
`Nat = 1 + Nat` play by different rules than finite ones. The equations are a model of a useful fragment
of the type system, not its whole semantics. And equal cardinality is not equal design: a four-value
enum and a pair of booleans hold the same information, but which refactorings feel natural and what
the type communicates depend on the presentation, not just the count. The algebra measures information
content; it does not decide semantics.

This is also why the algebra matters while designing my upcoming programming language Lapis.
A compiler that knows these identities does not merely check that two types are compatible; it knows
they are two presentations of the same structure, and can treat some type transformations as refactorings
it verifies itself rather than conventions the programmer must honor.

## References and Further Reading

- Chris Taylor, "The Algebra of Algebraic Data Types," Parts 1-3 (2013). The original blog has been deleted; these archived snapshots work:
  - [Part 1: counting, sums, products, laws](https://web.archive.org/web/20130612030827/http://chris-taylor.github.io/blog/2013/02/10/the-algebra-of-algebraic-data-types/)
  - [Part 2: recursive types and solving type equations](https://web.archive.org/web/20130611053832/http://chris-taylor.github.io/blog/2013/02/11/the-algebra-of-algebraic-data-types-part-ii/)
  - [Part 3: one-hole contexts, derivatives, zippers](https://web.archive.org/web/20130613144904/http://chris-taylor.github.io/blog/2013/02/13/the-algebra-of-algebraic-data-types-part-iii/)
- Joel Burget, ["The Algebra (and Calculus!) of Algebraic Data Types"](https://codewords.recurse.com/issues/three/algebra-and-calculus-of-algebraic-data-types), Recurse Center Codewords. The Lobsters [discussion](https://lobste.rs/s/mfbveg/algebra_calculus_algebraic_data_types) is where "subtraction represents constraints" was articulated.
- Justin Pombrio, ["Algebra and Data Types"](https://justinpombrio.net/2021/03/11/algebra-and-data-types.html) (2021). The most complete treatment of laws-as-refactorings, in Rust; includes the alternating-list derivation and a [reference sheet](https://justinpombrio.net/src/algebra-and-datatypes-reference.pdf).
- Conor McBride, ["The Derivative of a Regular Type is its Type of One-Hole Contexts"](http://strictlypositive.org/diff.pdf) (2001).
- Ralf Hinze and Ross Paterson, ["Finger Trees: A Simple General-purpose Data Structure"](https://www.staff.city.ac.uk/~ross/papers/FingerTree.html) (2006). The structure the second derivative produces, with the monoidal annotations that make it general-purpose. Tutorials by [Andrew Gibiansky](https://andrew.gibiansky.com/blog/haskell/finger-trees/), [apfelmus](https://apfelmus.nfshost.com/articles/monoid-fingertree.html), [Tommy McGuire](https://maniagnosis.crsr.net/2010/11/finger-trees.html), and [Mark C. Chu-Carroll](https://scienceblogs.com/goodmath/2009/05/27/finally-finger-trees/) walk the implementation.
- Gérard Huet, ["The Zipper"](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/0C058890B8A9B588F26E6D68CF0CE204/S0956796897002864a.pdf/div-class-title-the-zipper-div.pdf) (1997). The original paper, in the functional programming literature.
- Michael Abbott, Conor McBride, and Thorsten Altenkirch, ["∂ for Data: Differentiating Data Structures"](http://strictlypositive.org/dfordata.pdf) (2003). The formal treatment of one-hole contexts.
- Dan Ghica, ["Zippers for Non-Inductive Types"](https://danghica.blogspot.com/2018/11/zippers-for-non-inductive-types.html) (2018). The source of the multiset and circular-list derivations, and a readable tour of where the algebra keeps working.
- Andreas Blass, ["Seven Trees in One"](https://arxiv.org/pdf/math/9405205v1.pdf) (1994). The `T^7 = T` puzzle, and why that derivation is legal while `T^6 = 1` is not. For the derivation run step by step with addition and multiplication only, see the appendix of [Algebra, Calculus, Types and Trees](https://camdar.io/static/h4t/stuff/02/adts.pdf).
- Marcelo Fiore and Tom Leinster, ["Objects of Categories as Complex Numbers"](https://arxiv.org/abs/math/0212377) (2002). Why the illegal manipulations produce legal conclusions.
- [Catalan numbers](https://en.wikipedia.org/wiki/Catalan_number) (Wikipedia) and Richard Stanley's [Catalan addendum](https://math.mit.edu/~rstan/ec/catadd.pdf) for the two hundred-plus interpretations.

---

## Potential Future Work

There is some relationship between knot theory, Catalan numbers, and fractals, though
I don't understand today how these areas might connect to Type Theory and type algebra yet.
The Catalan link is tight: the tree equation is the Catalan generating function, and parenthesization
ambiguity is a real theorem-prover pain point. I'll revisit and expand this section if I gain some insight.
  - <https://www.quantamagazine.org/a-powerful-new-qr-code-untangles-maths-knottiest-knots-20260422/>
  - <https://www.quantamagazine.org/teen-mathematicians-tie-knots-through-a-mind-blowing-fractal-20241126/>

Another interesting direction might be through "Physics, Topology, Logic, and Computation - a Rosetta Stone" by
John Baez and Mike Stay:
- [https://math.ucr.edu/home/baez/rosetta/rose3.pdf](https://math.ucr.edu/home/baez/rosetta/rose3.pdf)

This paper explores deep connections between these fields and could potentially shed
light on some additional aspects of the algebraic structure of types. A screenshot from the paper:

![Rosetta Paper Table](/media-library/tapl/rosetta-paper-table.png)

## Footnotes

[^1]: Strictly speaking, `null` is a second unit value with its own type; the algebra treats them identically, and TypeScript's `strictNullChecks` keeps them from being confused.

[^2]: Amortized constant time: an individual operation may occasionally be slow, but averaged over a long sequence of operations, each costs the same as a constant-time one. The occasional slow operation pays off a debt built up by the cheap ones, the way a mortgage payment averages out a lump sum. In the finger tree, the spare capacity in the digits (1 to 4 elements where 2 would do) is what absorbs the occasional expensive restructuring.
