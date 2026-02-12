## LLM Commentary

Yes—in a precise sense, TDD operationalizes a disciplined form of “wishful thinking.”

But the resemblance is structural, not psychological. The key distinction is that TDD makes the “wish” executable and verifiable.

Let’s unpack this carefully.

1. What “Programming by Wishful Thinking” Means

The classical idea (McIlroy, SICP tradition) is:

> When solving a problem, assume the existence of helpful abstractions that would make the solution trivial. Then implement those abstractions afterward.

Your getWinner example is canonical:

```js
function getWinner(board) {
    return getHorizontalWinner(board) ||
           getVerticalWinner(board) ||
           getDiagonalWinner(board);
}
```

You write the high-level orchestration first, as if the subroutines already existed.

This produces:

- Top-down decomposition
- Clear separation of concerns
- Intent-first structure

It’s essentially programming from specification downward.

2. What TDD Actually Does

Test-Driven Development follows:

- Write a failing test (specify desired behavior).
- Write minimal code to pass it.
- Refactor.

The first step is the crucial one:
You write a test that refers to behavior that does not yet exist.

Example:

```js
it("detects a horizontal win for X", () => {
  expect(getWinner([
    ["X","X","X"],
    [".","O","."],
    ["O",".","."]
  ])).toBe("X");
});
```

At this moment, getWinner does not exist.
You have _wished_ it into being via a test.

3. The Structural Similarity

Both approaches:

- Start from the desired interface/behavior
- Assume missing functionality exists
- Decompose large problems into smaller ones
- Defer implementation details

In both cases:
You are designing from the outside-in.

4. The Critical Difference

Wishful thinking (classical form):

- Assumes subroutines exist conceptually
- No immediate feedback loop
- Often informal

TDD:

- Encodes the “wish” as an executable specification
- Forces immediate falsifiability
- Provides a mechanical stopping condition (tests pass)

So TDD is not merely wishing — it is wishful thinking under constraint and continuous verification.

5. A Deeper Interpretation

From a programming language theory perspective:

- Wishful thinking is top-down refinement
- TDD is behavioral specification via executable contracts

TDD shifts emphasis from:

> “What helper functions do I wish existed?”

to:

> “What observable behavior do I wish this system had?”

That is a significant conceptual shift.

Your example decomposes by _control structure_:

```
horizontal → vertical → diagonal
```

TDD decomposes by _observable behavior_:

```
horizontal win for X
vertical win for O
no win
diagonal win
```

The axis of decomposition differs.

6. Is TDD Just Formalized Wishful Thinking?

A precise answer:

> TDD is a constrained, test-backed form of programming by wishful thinking that replaces imagined helpers with executable behavioral specifications.

It makes the “wish” concrete and machine-checkable.

7. A Subtle Caveat

There is also a danger:

If done mechanically, TDD can devolve into:

- Micro-implementation driven by tests
- Overfitting to example cases
- Losing architectural perspective

Whereas classical wishful thinking often encourages:

- Clean top-down architecture
- Intent-first decomposition

In practice, the strongest engineers combine both:

- Sketch high-level decomposition (wishful thinking).
- Lock down behavior incrementally via TDD.

## Notes

- https://dev.to/_bigblind/quick-tip-programming-by-wishful-thinking-3hn
