---
layout: post
icon: file-text
category: Graphics Programming
title:  "3 - Plotting Lines"
date:   2020-07-05 13:00:00 -0600
permalink: /graphics-programming/plotting-lines
commentThreadId: -1
---

The next natural step from plotting points is plotting lines. With the practically infinite
variety of lines to draw, one would think we'd have to come up with a number of algorithms to
draw them all. Luckily we can just use one. The technique we'll use to draw all of these line
varieties is the [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve){:target='_blank'}.

Bézier curves are smooth paths that are defined by "control points". You can think of
them like weights on a string. By manipulating those points you change the shape of the curve:

<figure>
    <img src="/media-library/graphics-programming/bezier-curve-wikipedia.svg" alt="Bézier curve">
    <figcaption>Bézier curve - Credit: <a href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve" target="_blank">Wikipedia</a></figcaption>
</figure>

Determining the points of this curve can be accomplished by divide and conquer between the control points.

<figure>
    <img src="/media-library/graphics-programming/bezier-curve-midpoint.svg" alt="Bézier curve midpoints">
    <figcaption>Bézier curve divide and conquer</figcaption>
</figure>

Given the control points a point in between can be determined for each pair. This process can then be repeated until
a single point is determined. This point will be a point of the Bézier curve itself. This process for obtaining points
of the curve is called [de Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau's_algorithm){:target="_blank"}. Before
getting to the algorithm though we'll want some utility functions first:

```js
const zipWith = (xs, ys, fn) => xs.map((n,i) => fn(n, ys[i]))
```

`zipWith` combines two arrays `xs` and `ys` into a single array by using `fn` on each corresponding element pairs, like a zipper (hence the name).

```js
const lerp = (t, a, b) => (1 - t) * a + t * b,
      lerpPoints = (t, [x0, y0], [x1, y1]) => [lerp(t, x0, x1), lerp(t, y0, y1)]
```

`lerp` is an abbreviation for [Linear Interpolation](https://en.wikipedia.org/wiki/Linear_interpolation){:target='_blank'}. If you look up
the definition of it you'll probably come across some rather non-trivial explanations. To speak plainly, to interpolate is to pass through some
given points. To interpolate linearly is to pass through given points with a straight line `y = mx + b`. In the above code ...

---

## Additional Reading

* [https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/](https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/){:target='_blank'}
* [https://pomax.github.io/bezierinfo/](https://pomax.github.io/bezierinfo/){:target='_blank'}
* [https://en.wikipedia.org/wiki/B%C3%A9zier_curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve){:target='_blank'}
* https://twitter.com/tomfinnigan/status/1280970730067202048
"""
I'd say the biggest difference between the image you posted and the typical Bezier formula is that Bezier curves are usually expressed in parametric form.  The simplest degree 1 between points P0 and P1 could be written:

B_x(t)=(1-t)*P0.x + (t)*P1.x
B_y(t)=(1-t)*P0.y + (t)*P1.y
"""

* <https://pomax.github.io/bezierinfo/#decasteljau>
* <https://generativeartistry.com/tutorials/>
* <https://pomax.github.io/bezierinfo/#decasteljau>
* <https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Constructing_B%C3%A9zier_curves>
* <https://rosettacode.org/wiki/Bitmap/B%C3%A9zier_curves/Cubic#Racket>
* <https://www.codeproject.com/articles/223159/midpoint-algorithm-divide-and-conquer-method-for-d>
* <https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm>
* <https://j2kun.github.io/bezier/bezier-draw.js>
* <https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/>
* <https://en.wikipedia.org/wiki/De_Casteljau's_algorithm#Example_implementation>
* <https://en.wikipedia.org/wiki/Linear_interpolation>
* <https://theeducationlife.com/interpolation-formula/>
* <https://stackoverflow.com/questions/1734745/how-to-create-circle-with-b%C3%A9zier-curves>
* <https://spencermortensen.com/articles/bezier-circle/>
* <https://blog.demofox.org/2019/12/07/bezier-triangles/>
* <https://pomax.github.io/bezierinfo/#whatis>
* <https://rosettacode.org/wiki/Bitmap/B%C3%A9zier_curves/Cubic>
