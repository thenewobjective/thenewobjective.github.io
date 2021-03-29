---
layout: post
icon: file-text
title:  "Deriving the Z-Combinator"
date:   2020-08-09 00:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/deriving-the-z-combinator
commentThreadId: 42
---

* TOC
{:toc}

By now you've probably heard of the Y-Combinator and its cousin the Z-Combinator but you
may not have seen a derivation of it that made sense. There are tutorials and examples
aplenty but they seem to skip steps or leave out some accompanying explanation leaving
the reader with a sense of something missing. Let's see if I can do better.

## Fixed-points and Combinators

The fixed-point of a function is the argument that you give to it so that it will return that
same argument. A simple example:

<code>
&lambda;x. x * x
</code>

What value would be the fixed-point of this function? `0` would work:

<code>
(&lambda;x. x * x) 0<br>
&rarr; (0) * (0)<br>
&rarr; 0
</code>

A function doesn't have to have a single fixed-point either. Let's take the following:

<code>
&lambda;x. |x|
</code>

The absolute value (`|x|`) will return the input when it's non-negative. Therefore every non-negative number
is its fixed-point.

The fixed-points of functions aren't restricted to numbers and strings of course. They can be other functions.
A trivial example is the identity function:

<code>
&lambda;x. x
</code>

Every argument is a fixed-point. If we restrict ourselves to only using functions as arguments,
and only using the arguments specified we have "combinators"; simple enough. Now you
know what a fixed-point combinator is. In fact *every combinator has a fixed-point*![^1]

## Recursion

> To iterate is human, to recurse divine
> <cite><a href="https://en.wikipedia.org/wiki/L._Peter_Deutsch" target="_blank">L. Peter Deutsch</a></cite>

Here's a function for calculating the factorial `n!`:

```js
let fact = n => {
    let result = 1
    while(n > 1) {
        result *= n
        n--
    }
    return result
}
```

While the code is clear it's [imperative](https://en.wikipedia.org/wiki/Imperative_programming) and [procedural](https://en.wikipedia.org/wiki/Procedural_programming).
It's preferable to be [declarative](https://en.wikipedia.org/wiki/Declarative_programming). We want to describe *what* we want to compute instead of the low-level[^2]
details of *how* we compute it. Such code can be translated into recursive form:

```js
let fact = n =>
    n < 2 ? 1 : n * fact(n - 1)
```

A significant improvement of clarity over the prior form. You can now more easily identify what the fixed-point would be:

<code>
fact(1)<br>
&rarr; (1) < 2 ? 1 : (1) * fact((1) - 1)<br>
&rarr; true ? 1 : (1) * fact((1) - 1)<br>
&rarr; 1
</code>

Now, can we convert this into a combinator?

## Recursion as a Fixed-point

Recall that a combinator is restricted to using its arguments and nothing outside of it. In other words, it has to be a *closed expression*.
The body of our `fact` function references `fact` but that's not an argument. We can solve this problem through abstraction[^3]:

```js
let fact = (self, n) =>
    n < 2 ? 1 : n * self(n - 1)
```

We obtained our closed-expression but now we've gotten ourselves into trouble. How do I call this function?

```js
fact(?, 7)
```

A reasonable thought might be to just pass in `fact` again:

```js
fact(fact,7)
```

Which means that the recursive call would have to change to thread this extra parameter:

```js
let fact = (self, n) =>
    n < 2 ? 1 : n * self(self, n - 1)
```

A quick test shows that this works:

<code>
fact(fact,7)<br>
&rarr; 5040
</code>

A bit inconvenient though and low-level[^2]. Let's see if we can extract the essence
of what's going on and abstract this threading. We'll begin with [currying](https://en.wikipedia.org/wiki/Currying) the function:

```js
let fact = self =>
    n => n < 2 ? 1 : n * self(self)(n - 1)
```

If we call our curried function without the number parameter:

<code>
fact(fact)<br>
&rarr;
n => n < 2 ? 1 : n * self(self)(n - 1) 
</code>

Notice the pattern? `self(self)` in the body and `fact(fact)` in the call.

Let's give that form a name so we can obtain power over it[^4]:

```js
let fact = self => {
    let f = n => self(self)(n)
    return n => n < 2 ? 1 : n * f(n - 1)
}
```

A quick test and you see it still works:

<code>
fact(fact)(7)<br>
&rarr; 5040
</code>

The `let` declaration feels a little dirty so let's refactor that into a lambda as well:

```js
let fact = self => {
    return (f =>
        n => n < 2 ? 1 : n * f(n - 1)
    )(
        n => self(self)(n)
    )
}
```

Then simplify:

```js
let fact = self =>
    (f =>
        n => n < 2 ? 1 : n * f(n - 1)
    )(
        n => self(self)(n)
    )
```

If you've never seen a `let` refactored into a lambda expression feel free to take a moment to compare the last two steps.
Basically the let variable `f` becomes the parameter of an immediately invoked lambda expression and the body of the original
let becomes the argument.

Another quick test to show that it still works:

<code>
fact(fact)(7)<br>
&rarr; 5040
</code>

With all of this refactoring what did it get us? Notice that the innermost body of our new `fact` has the same form
as the original before we turned it into a combinator. Let's separate that innermost body into it's own declaration:

```js
let _fact = f => n =>
    n < 2 ? 1 : n * f(n - 1)

let fact = self =>
    (
        _fact
    )(
        n => self(self)(n)
    )
```

Now let's do something about that irritating `fact(fact)(7)` call.
We'll start by simply pushing the definition of `fact` into an inner lambda and return the self application:

```js
let _fact =
    f => n => n < 2 ? 1 : n * f(n - 1)

let fact = (() => {
    let innerFact = self =>
        (
            _fact
        )(
            n => self(self)(n)
        )
    return innerFact(innerFact)
})()
```

Done!

<code>
fact(7)<br>
&rarr; 5040
</code>

Once again, let's do some cleanup by refactoring that local let declaration into a lambda:

```js
let _fact =
    f => n => n < 2 ? 1 : n * f(n - 1)

let fact = (() => {
    return (
        innerFact => innerFact(innerFact)
    )(
        self => (_fact)(n => self(self)(n))
    )
})()
```

Then simplify:

```js
let _fact =
    f => n => n < 2 ? 1 : n * f(n - 1)

let fact =
    (innerFact => innerFact(innerFact))
    (self => (_fact)(n => self(self)(n)))
```

The usage of `innerFact` and `self` look suspiciously similar. Let's rename those variables to the same thing `u`
and see what that looks like. They're in separate lexical scopes so we don't have to worry about conflicts:

```js
let _fact =
    f => n => n < 2 ? 1 : n * f(n - 1)

let fact =
    (u => u(u))
    (u => (_fact)(n => u(u)(n)))
```

`fact` doesn't exactly look like the factorial combinator anymore, more-so a setup for the actual factorial we care about: `_fact`.
Let's abstract and rename `fact` to reflect this usage:

```js
let _fact =
    f => n => n < 2 ? 1 : n * f(n - 1)

let setup = f =>
    (u => u(u))
    (u => f(n => u(u)(n)))

let fact = setup(_fact)
```

No need to be redundant with `_fact` anymore so let's inline it:

```js
let setup = f =>
    (u => u(u))
    (u => f(n => u(u)(n)))

let fact = setup(
    f => n => n < 2 ? 1 : n * f(n - 1)
)
```

Now give `f` a more meaningful name:

```js
let setup = f =>
    (u => u(u))
    (u => f(n => u(u)(n)))

let fact = setup(
    fact => n => n < 2 ? 1 : n * fact(n - 1)
)
```

Looking at the body of `setup` you see we have a second lambda being passed to the first lambda.
Let's see if we can simplify this more by doing the application:

```js
let setup = f =>
    (u => f(n => u(u)(n)))
    (u => f(n => u(u)(n)))

let fact = setup(
    fact => n => n < 2 ? 1 : n * fact(n - 1)
)
```

Well, how about that? We've just discovered the [Z-Combinator](https://en.wikipedia.org/wiki/Fixed-point_combinator#Strict_fixed-point_combinator)
which is the Y-Combinator in a call-by-value language (like JavaScript). Let's rename `setup` to reflect our discovery:

```js
let fix = f =>
    (u => f(n => u(u)(n)))
    (u => f(n => u(u)(n)))

let fact = fix(fact =>
    n => n < 2 ? 1 : n * fact(n - 1)
)
```

Final check:

<code>
fact(7)<br>
&rarr; 5040
</code>

Let's try our `fix` combinator on another definition to see if it works more generally:

```js
let fix = f =>
    (u => f(n => u(u)(n)))
    (u => f(n => u(u)(n)))

let fib = fix(fib =>
    n => n < 2 ? n : fib(n - 1) + fib(n - 2)
)
```

<code>
fib(12)<br>
&rarr; 144
</code>

Success!

## A More Practical Implementation

That definition of `fix` though is a bit enigmatic to read at first glance though
even after going through the steps to derive it. You'd also be right to question
its efficiency. Can we improve our definition even more? The answer is yes but at
the expense of it no longer being a combinator and instead being a recursive
definition.

Here's what we have:

```js
let fix = f =>
    (u => f(n => u(u)(n)))
    (u => f(n => u(u)(n)))
```

Let's begin with a [beta-reduction](https://wiki.haskell.org/Beta_reduction)
of the self application to see if another pattern emerges:

```js
let fix = f =>
    f(n =>
        (u => f(n => u(u)(n)))
        (u => f(n => u(u)(n)))
        (n)
    )
```

Repeat:

```js
let fix = f =>
    f(n =>
        f(n =>
            (u => f(n => u(u)(n)))
            (u => f(n => u(u)(n)))
            (n)
        )(n)
    )
```

Once more:

```js
let fix = f =>
    f(n =>
        f(n =>
            f(n =>
                (u => f(n => u(u)(n)))
                (u => f(n => u(u)(n)))
                (n)
            )(n)
        )(n)
    )
```

Notice the pattern emerging? It looks suspiciously similar to the
very outer function, except that the outer `fix` is missing the `n`
parameter. Let's add that parameter and apply it the top level `f`
call to match the nested ones:

```js
let fix = f => n =>
    f(n =>
        f(n =>
            f(n =>
                (u => f(n => u(u)(n)))
                (u => f(n => u(u)(n)))
                (n)
            )(n)
        )(n)
    )(n)
```

With this change let's do a sanity check:

```js
let fact = fix(fact =>
    n => n < 2 ? 1 : n * fact(n - 1)
)
```

<code>
fact(7)<br>
&rarr;5040
</code>

So far so good. Now with our pattern clear, we'll replace the
innermost self-application with `fix(f)`

```js
let fix = f => n =>
    f(n =>
        f(n =>
            f(fix(f))(n)
        )(n)
    )(n)
```

Repeat:

```js
let fix = f => n =>
    f(n =>
        f(fix(f))(n)
    )(n)
```

Once more:

```js
let fix = f => n =>
    f(fix(f))(n)
```

Final sanity check:

<code>
fact(7)<br>
&rarr;5040
</code>

Compare our new definition with the original:

```js
let fix = f =>
    (u => f(n => u(u)(n)))
    (u => f(n => u(u)(n)))
```

While the new one is no longer a combinator, from a practical
point of view as a implementor the recursive form is
probably preferable.

## More Than Divine

To recap, what we've accomplished so far is:

1. Defined what a fixed-point is
2. Defined what a combinator is
3. Introduced recursion
4. Converted a recursive function into a fixed-pont combinator and derived a generic way to define others.

So what? Is this just a party trick to just do recursion in disguise?

What we've discovered here is a third way to perform repetitive work. You know of looping, recursion, and now with `fix` there is
rewriting. So to add to L. Peter Deutsch's quote:

> If recursion is divine then 'fix' is [entelechy](https://en.wikipedia.org/wiki/Potentiality_and_actuality#entelechy)

Now go forth with your newfound knowledge and impress your fellow mortals.

## Further Reading

* [Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus)
* [To Mock a Mockingbird](https://www.amazon.com/Mock-Mockingbird-Raymond-Smullyan/dp/0192801422) by [Raymond Smullyan](https://en.wikipedia.org/wiki/Raymond_Smullyan)
* [To Dissect a Mockingbird](http://dkeenan.com/Lambda/)
* [Fixed-point combinators in lambda calculus](https://en.wikipedia.org/wiki/Fixed-point_combinator#Fixed-point_combinators_in_lambda_calculus)
* [Y in Practical Programs](https://web.archive.org/web/20040105195718/http://www.scms.rgu.ac.uk/staff/bjm/doc/fics2001.pdf)
* [Oleg's generic fix wrapper](http://lambda-the-ultimate.org/classic/message5463.html#5466)

## Notes and References

[^1]: Belinfante J. G. F. (1987) [S/K/ID: Combinators in Forth.](http://soton.mpeforth.com/flag/jfar/vol4/no4/article6.pdf) § The Fixed Point Theorem. p. 565
[^2]: "A programming language is low level when its programs require attention to the irrelevant." - Alan Perlis
[^3]: If *e* is an expression and *x* is a variable, then <code>&lambda;x. e</code> is an abstraction.
[^4]: A double entendre. See [True Name](https://en.wikipedia.org/wiki/True_name) as well as [Gerald Sussman's](https://en.wikipedia.org/wiki/Gerald_Jay_Sussman) use of the term in [SICP](https://youtu.be/V_7mmwpgJHU?t=775).
