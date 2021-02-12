---
layout: post
icon: file-text
category: Graphics Programming
title:  "3 - Drawing Lines"
date:   2021-02-07 10:00:00 -0600
permalink: /graphics-programming/drawing-lines
commentThreadId: 47
---

The next natural step from plotting points is drawing lines. From straight lines
to curved lines, spirals, and jagged, there are many procedures for getting
what we want. Instead of deriving each of these we'll instead use a more
general approach. The technique we'll use to draw all of these lines
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

A near direct translation of the math to JavaScript could look like the following:

```js
const B = (P, t) => {
  if (P.length == 1) {
    return P[0];
  } else {
    const [x0,y0] = B(P.slice(0, -1), t),
          [x1,y1] = B(P.slice(1), t);
    return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1]
  }
};
```

It's wise to stick to JavaScript naming conventions though:

```js
const bezier = (ps, t) => {
  if (ps.length == 1) {
    return ps[0];
  } else {
    const [x0,y0] = bezier(ps.slice(0, -1), t),
          [x1,y1] = bezier(ps.slice(1), t);
    return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1]
  }
};
```

Let's see if we can make this clearer. `lerp` is a common abbreviation for Linear Interpolation,
which we could just call `line_1D`, but due to its more general usage we'll stick with that name
and separate this concept from our definition of `bezier`:

```js
const lerp = (a, b, t) => (1 - t) * a + t * b,
      line = (p, q, t) => [lerp(p[0], q[0], t), lerp(p[1], q[1], t)]

const bezier = (ps, t) => {
    if (ps.length == 1) {
        return ps[0];
    } else {
        const p = bezier(ps.slice(0, -1), t),
              q = bezier(ps.slice(1), t);
        return line(p, q, t)
    }
}
```

By separating interpolation a significant refactoring can now be done:

```js
const lerp = (a, b, t) => (1 - t) * a + t * b,
      line = (p, q, t) => [lerp(p[0], q[0], t), lerp(p[1], q[1], t)],
      bezier = (ps, t) =>
          ps.length == 1 ? ps[0] :
          line(bezier(ps.slice(0, -1), t), bezier(ps.slice(1), t), t)
```

This could be improved further through techniques such as [currying](https://en.wikipedia.org/wiki/Currying),
and you'd be right to raise concerns about the efficiency of this but we're going to ignore
these issues for now in the name of clarity.  As [Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) has said:
<em>"Premature optimization is the root of all evil"</em>.

With our functions in hand it's time to integrate them into the Graphic class utilizing named parameters:

```js
const lerp = ({a, b, t}) => (1 - t) * a + t * b,
      line = ({p, q, t}) => [lerp({a:p[0], b:q[0], t}), lerp({a:p[1], b:q[1], t})],
      bezier = ({ctrlPts, t}) =>
        ctrlPts.length == 1 ? ctrlPts[0] :
        line({
            p: bezier({ctrlPts: ctrlPts.slice(0, -1), t}),
            q: bezier({ctrlPts: ctrlPts.slice(1),     t}),
            t
        })

class Graphic {
  ...
    plotBezier({ctrlPts, color}) {
        const step = 0.01;
        for(let t = 0; t < 1; t += step) {
            const [x,y] = bezier({ctrlPts, t})
            this.plot({x, y, color})
        }
    }
}

export default Graphic
```

Let's create an example to see the results:

```js
import Graphic from "./Graphic.js";

class BezierExample1 extends Graphic {
    constructor({height,width}){
        super({height, width})

        const WHITE = 0xFFFFFFFF
        this.plotBezier({
            color: WHITE,
            ctrlPts: [
                [0.1 * width, 0.8 * height],
                [0.2 * width, 0.2 * height],
                [0.8 * width, 0.2 * height],
                [0.8 * width, 0.8 * height]
            ]
        })
    }
}

export default BezierExample1
```

```js
import Canvas from './Canvas.js'
import BezierExample1 from './BezierExample1.js'

const bezierExample1 = new BezierExample1({height: 480, width: 640})

const canvas = new Canvas({
    container: document.getElementById('example-1'),
    height: 480,
    width: 640
})

canvas.draw({graphic: bezierExample1, top: 0, left: 0})
```

<figure id="example-1"></figure>
<script type="module" src="/scripts/graphics-programming/lesson3/example-1.js"></script>

With the spaces between the pixels we can see pretty clearly how the "line" is drawn.
To make this look moreso like a line we can reduce the step size:

```js
class Graphic {
  ...
    plotBezier({ctrlPts, color}) {
        const step = 0.001;
        ...
    }
}
```

<figure id="example-2"></figure>
<script type="module" src="/scripts/graphics-programming/lesson3/example-2.js"></script>

<!--
https://codepen.io/mlhaufe/pen/MWaZoqp?editors=1010
https://github.com/hrldcpr/Bezier.hs/blob/master/Bezier.hs
-->
---

## Additional Reading

* [https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/](https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/)
* [https://pomax.github.io/bezierinfo/](https://pomax.github.io/bezierinfo/)
* [https://en.wikipedia.org/wiki/B%C3%A9zier_curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
