---
layout: post
icon: file-text
category: Graphics Programming
title:  "3 - Plotting Lines"
date:   2020-08-25 19:00:00 -0600
permalink: /graphics-programming/plotting-lines
commentThreadId: 47
---

The next natural step from plotting points is plotting lines. With the practically infinite
variety of lines to draw one would think we'd have to come up with a number of algorithms to
draw them all. Luckily we can just use one. The technique we'll use to draw all of these lines
is the [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).

Bézier curves are smooth paths that are defined by "control points". You can think of
them like weights on a string. By manipulating those points you change the shape of the curve:

<figure>
    <img src="/media-library/graphics-programming/bezier-curve-wikipedia.svg" alt="Bézier curve">
    <figcaption>Bézier curve - Credit: <a href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve" target="_blank">Wikipedia</a></figcaption>
</figure>

The mathematical definition for Bézier curves can be recursively given as:

<code>
B<sub>P<sub>0</sub></sub>(<em>t</em>) = P<sub>0</sub>
<br>
B<sub>P<sub>0</sub>P<sub>1</sub>...P<sub><em>n</em></sub></sub>(<em>t</em>) = (1 - <em>t</em>)B<sub>P<sub>0</sub>P<sub>1</sub>...P<sub><em>n</em>-1</sub></sub>(<em>t</em>) + <em>t</em>B<sub>P<sub>1</sub>P<sub>2</sub>...P<sub><em>n</em></sub></sub>(<em>t</em>)
</code>

Where `t` is the `t`ime along the curve from 0 - 1. <code>P<sub>0</sub>&nbsp;-&nbsp;P<sub>n</sub></code> are the control points.
The result is a point on the curve at the given `t`.

What's basically being done is a set of [Linear Interpolations](https://en.wikipedia.org/wiki/Linear_interpolation)
of the control points. In plain english to interpolate is to pass through some given points. To interpolate linearly is to pass through given points with a straight line.
[Mike "Pomax" Kamermans](https://twitter.com/TheRealPomax) has an excellent image showing how this works:

<figure>
    <img src='/media-library/graphics-programming/bezier-lerp.png' alt='Deriving Bézier curve with Linear Interpolation'>
    <figcaption>Deriving Bézier curve with Linear Interpolation - Credit: <a href="https://pomax.github.io/bezierinfo/#whatis" target="_blank">Mike "Pomax" Kamermans</a></figcaption>
</figure>

So the `bezier` of a single control point is that control point. The `bezier` of multiple
control points is a straight line between the `bezier`


A near direct translation of the math to JavaScript would look like the following:

```js
const bezier = (t, ctrlPts) => {
  if (ctrlPts.length == 1) {
    return ctrlPts[0];
  } else {
    const [x0,y0] = bezier(t, ctrlPts.slice(0, -1)),
          [x1,y1] = bezier(t, ctrlPts.slice(1));
    return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1]
  }
};
```






Let's see if we can make this clearer. `lerp` is a common abbreviation for Linear Interpolation,
which we could just call `line_1D`, but due to its more general usage we'll stick with that name
and separate this concept from our definition of `bezier`:

```js
const lerp = (t, a, b) => (1 - t) * a + t * b,
      lerpPoints = (t, p, q) => [lerp(t, p[0], q[0]), lerp(t, p[1], q[1])]

const bezier = (t, ctrlPts) => {
  if (ctrlPts.length == 1) {
    return ctrlPts[0];
  } else {
    const p = bezier(t, ctrlPts.slice(0, -1)),
          q = bezier(t, ctrlPts.slice(1));
    return lerpPoints(t, p, q)
  }
}
```

By separating interpolation a significant refactoring can now be done:

```js
const lerp = (t, a, b) => (1 - t) * a + t * b,
      lerpPoints = (t, p, q) => [lerp(t, p[0], q[0]), lerp(t, p[1], q[1])]

const bezier = (t, ctrlPts) =>
  ctrlPts.length == 1 ? ctrlPts[0] :
  lerpPoints(t,
    bezier(t, ctrlPts.slice(0, -1)),
    bezier(t, ctrlPts.slice(1))
  )
```

You'd be right to raise concerns about the efficiency of the `bezier` function but we're going to ignore
these for now in the name of clarity. As [Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) has said:
<em>"Premature optimization is the root of all evil"</em>.

With our functions in hand it's time to integrate them into the Graphic class:

<!--
Introduction `zipWith` can abstract `lerpPoints` even more:

`zipWith` combines two arrays `xs` and `ys` into a single array by using `fn` on each corresponding element pairs, like a zipper (hence the name).

```js
      zipWith = (xs, ys, fn) => xs.map((n,i) => fn(n, ys[i])), 
```

```js
const lerp = ({t, a, b}) => (1 - t) * a + t * b,
      lerpPoints = ({t, p0:[x0, y0], p1:[x1, y1]}) => [lerp({t, a:x0, b:x1}), lerp({t, a:y0, b:y1})]

const bezier = ({ctrlPts, t}) =>
    ctrlPts.length == 0 ? [0, 0] :
    ctrlPts.length == 1 ? ctrlPts[0] :
    lerpPoints({t,
      p0: bezier({ctrlPts: ctrlPts.slice(0, -1), t}),
      p1: bezier({ctrlPts: ctrlPts.slice(1), t})
    });

// Graphic.js
class Graphic {
  ...
  plotBezier({t, ctrlPts, c}){
      const step = 0.1
      for(let i = 0; i < t; i += step) {
          const [x,y] = bezier({ctrlPts, t})
          this.plot({x, y, c})
      }
  }
  ...
}
```

For consistency the functions are updated to utilize named parameters.


https://codepen.io/mlhaufe/pen/MWaZoqp?editors=1010
https://github.com/hrldcpr/Bezier.hs/blob/master/Bezier.hs
-->
---

## Additional Reading

* [https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/](https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/)
* [https://pomax.github.io/bezierinfo/](https://pomax.github.io/bezierinfo/)
* [https://en.wikipedia.org/wiki/B%C3%A9zier_curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
