---
layout: post
icon: file-text
title:  "Dynamic Programming for Great Justice"
date:   2013-01-13 12:00:00 -0600
category: Types and Programming Languages
permalink: /types-and-programming-languages/dynamic-programming-for-great-justice
redirect_from:
    - /dynamic-programming-for-great-justice/
---

Proper Tail Calls are [slated](http://wiki.ecmascript.org/doku.php?id=harmony:proper_tail_calls) for ES6 and are long overdue. Some of the most elegant solutions to the problems we face in designing algorithms are recursive ones. As a result of this addition, we can expect to see far more code bases utilizing this feature of the language. I suspect though that a significant number of these new designs are going to fall into the trap of creating code that is not only significantly slower than their imperative counterparts, but will potentially cripple the memory of the hardware it is running on. So before you start using recursion [For Great Justice](https://en.wikipedia.org/wiki/For_Great_Justice), there is a methodology that should be understood.

The name of this methodology is called “Dynamic Programming”. Don’t let the word “Dynamic” fool you into thinking it has any direct relationship to do with dynamic languages though, it does not. Instead of giving a textbook (and potentially esoteric) definition upfront, I’ll demonstrate an evolution of an algorithm from how you might see it today (in imperative style) to an optimum recursive form utilizing this methodology. The example we’ll be using is the algorithm to calculate the nth Fibonacci number:

```js
function fib(n) {
    if(n < 2)
        return n;
    var f0 = 0, f1 = 1, f;
    for(var i = 1; i < n; i++) {
        f = f0 + f1;
        f0 = f1;
        f1 = f;
    }
    return f;
}
```

As you may probably agree,  the above is a relatively straightforward, idiomatic example of a JavaScript algorithm. It is also quite efficient in its execution: *O(n)* time, *O(1)* space. For a simple definition like Fibonacci though, it would be nice if we could rewrite this code so that in a quick glance we could understand it as well as be confident that their are “obviously no errors”, vs there being “no obvious errors”:

```js
function fib(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
```

Short, clean, and seems obviously correct from a glance… but happens to be naively inefficient as well; a good example of a pitfall for the inexperienced.  The beauty of this fragment of code is only skin deep as you can see from its call tree ( `f = fib` for brevity ):

<figure>
  <div class="mermaid">
  graph TD
      T["f(6)"]
      L["f(5)"]
      LL["f(4)"]
      LLL["f(3)"]
      LLLL["f(2)"]
      LLLLL["f(1)"]
      LLLLLL[1]
      LLLLR["f(0)"]
      LLLLRL[0]
      LLLR["f(1)"]
      LLLRL[1]
      LLR["f(2)"]
      LLRL["f(1)"]
      LLRLL[1]
      LLRR["f(0)"]
      LLRRL[0]
      LR["f(3)"]
      LRL["f(2)"]
      LRLL["f(1)"]
      LRLLL[1]
      LRLR["f(0)"]
      LRLRL[0]
      LRR["f(1)"]
      LRRL[1]
      R["f(4)"]
      RL["f(3)"]
      RLL["f(2)"]
      RLLL["f(1)"]
      RLLLL[1]
      RLLR["f(0)"]
      RLLRL[0]
      RLR["f(1)"]
      RLRL[1]
      RR["f(2)"]
      RRL["f(1)"]
      RRLL[1]
      RRR["f(0)"]
      RRRL[0]
      T --- L
      L --- LL
      LL --- LLL
      LLL --- LLLL
      LLLL --- LLLLL
      LLLLL --- LLLLLL
      LLLL --- LLLLR
      LLLLR --- LLLLRL
      LLL --- LLLR
      LLLR --- LLLRL
      LL --- LLR
      LLR --- LLRL
      LLRL --- LLRLL
      LLR --- LLRR
      LLRR --- LLRRL
      L --- LR
      LR --- LRL
      LRL --- LRLL
      LRLL --- LRLLL
      LRL --- LRLR
      LRLR --- LRLRL
      LR --- LRR
      LRR --- LRRL
      T --- R
      R --- RL
      RL --- RLL
      RLL --- RLLL
      RLLL --- RLLLL
      RLL --- RLLR
      RLLR --- RLLRL
      RL --- RLR
      RLR --- RLRL
      R --- RR
      RR --- RRL
      RRL --- RRLL
      RR --- RRR
      RRR --- RRRL
  </div>
  <figcaption>Fibonacci call tree</figcaption>
</figure>

This algorithm requires an exponential amount of time and space to produce a result (specifically, [*O(φ)*](https://en.wikipedia.org/wiki/Golden_ratio) which is in *O(n<sup>2</sup>)* ). The reason, as can be seen from the above tree, is that a significant amount of duplicate work is being done. fib(4) is being calculated twice, fib(3) calculated three times, and so on. Choose a large enough input and you can be quite confident that your machine will fall over. For a more discrete example, here is a graph of the execution time on my current machine (Windows 7, 4 GB RAM, Dual core 2.40 GHz, Firefox 18). Note that I ran out of memory beyond fib(37):

<figure>
    <img src="/media-library/dynamic-programming/recFibvsTime.png" alt="Recursive Fib vs time">
</figure>

The machine/environment used to execute the code is not particularly important. A more powerful machine will simply shift the curve to the right, and a weaker machine will shift it to the left. The shape of the curve remains the same. To quote [Carl Sagan](https://en.wikipedia.org/wiki/Carl_Sagan): <q cite="https://en.wikipedia.org/wiki/Carl_Sagan">“Never underestimate the power of an exponential“.</q>

## Memoization

Now how do we take advantage of the clarity of recursion while not crippling ourselves? Here is where Dynamic Programming comes into play. Dynamic Programming has two approaches: “Top Down” and “Bottom Up”. “Top Down” is also referred to as memoization, and as the name implies it involves keeping track of the work already completed. To understand why it is referred to as “Top Down”/memoization, another example is in order:

```js
function fib(n){
    return n < 2 ? n : fib.memo[n] || (fib.memo[n] = fib(n - 1) + fib(n - 2))
}
fib.memo = [];
```

Admittedly not quite as clear as the previous version, but arguable still cleaner than the first version.  When looking for fib(n): check to see if it is in the memo,  if it is return it, otherwise calculate the value and store it in the memo before returning it. Here is our new call tree ( `m[n] = fib.memo[n]` ):

<figure>
  <div class="mermaid">
  graph TD
      T["f(6)"]
      L["f(5)"]
      LL["f(4)"]
      LLL["f(3)"]
      LLLL["f(2)"]
      LLLLL["f(1)"]
      LLLLLL[1]
      LLLLR["f(0)"]
      LLLLRL[0]
      LLLR["f(1)"]
      LLLRL[1]
      LLR["m[2]=1"]
      LR["m[3]=2"]
      R["m[4]=3"]
      T --- L
      L --- LL
      LL --- LLL
      LLL --- LLLL
      LLLL --- LLLLL
      LLLLL --- LLLLLL
      LLLL --- LLLLR
      LLLLR --- LLLLRL
      LLL --- LLLR
      LLLR --- LLLRL
      LL --- LLR
      L --- LR
      T --- R
  </div>
  <figcaption>Fibonacci call tree memoization</figcaption>
</figure>

So our exponential recursive algorithm is now a linear recursive algorithm: *O(n)* time (still have to calculate each value of fib(n) once), and *O(n)* space (we’re storing each value of fib(n) ). I would present a graph of the new algorithm, but it would be quite boring as I was able to calculate fib(1476) in as little as 3 ms, larger values are beyond the range of JavaScript’s number system. On subsequent calls, since the memo is already built, our running time will be *O(1)* (the time to simply look up the value).

## Tabulation

Quick summary:  The original code took *O(n)/O(1)* time/space. Our new code takes *O(n)/O(n)* time/space on the first run, and *O(1)/O(n)* time/space on subsequent runs while remaining cleaner.  It would be nice though if we could avoid having to keep that memo around, as well as achieving a space/time complexity similar to the original. Thus, it is time to present the second approach of Dynamic Programming: “Bottom Up” aka. tabulation (sometimes also referred to as iteration but not often enough to claim it as an official synonym). Now straight to the example:

```js
function fib(n) {
    function f(n0,n1,step) {
        return step == n ? n1 : f(n1, n0 + n1, step + 1);
    }
    return f(0,1,1);
}
```

The main difference here is that instead of starting at the end of the sequence and working backwards to the beginning (top down) as in the last algorithm , instead we start at  the beginning of the sequence and work our way to the end (bottom up), while carrying forward our previous calculations (tabulating) instead of memoizing them. A sample run of the the above algorithm on fib(6) would work something like this (slightly altered for clarity):

<figure>
    <img src="/media-library/dynamic-programming/fib-tabulation.gif" alt="Fibonacci Tabulation">
</figure>

Admittedly, the clarity of the algorithm is not much better than the original. This is no doubt due to the necessity of having to name the intermediate values in the calculation in both versions. Sometimes finding a proper name is one of the hardest things to do.  But anyway, how does this version stack up now that we’ve eliminated the memo?  Like the original we are now at *O(n)/O(1)* time/space. So have we gained anything through all of this beyond parity in complexity? Lets take a look at the original and the current implementation side by side:

<table>
<tr>
<td>
{% highlight js %}
function fib(n){
    if(n < 2)
        return n;
    var f0 = 0, f1 = 1, f;
    for(var i = 1; i < n; i++) {
        f = f0 + f1;
        f0 = f1;
        f1 = f;
    }
    return f;
}
{% endhighlight %}
</td>
<td>
{% highlight js %}
function fib(n){
    function f(n0, n1, step) {
        return step == n ? n1 : f(n1, n0 + n1, step + 1)
    }
    return f(0,1,1)
}
{% endhighlight %}
</td>
</tr>
</table>

You can judge for yourself. Personally I enjoy that fact that the low level constructs of  assignment and looping are no longer explicit.

To summarize: Dynamic Programming is basically a recognition that an optimal solution to a problem is composed of optimal solutions to sub-problems. With recursive algorithms this relationship is usually more explicit than in imperative equivalents. Dynamic Programming solutions generally take two forms:  “Divide & Conquer” (split a big problem into smaller problems then combine the results as in our memoization example), or by recognizing a dependent relationship between the sub-problems and discovering a way to combine the solutions to those sub-problems  (as in our tabulated example). Good luck with your spelunking into the recursive cave of wonders.
