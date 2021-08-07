---
layout: post
icon: file-text
category: Graphics Programming
title:  "5 - Complex Filters"
date:   2021-08-05 13:00:00 -0600
permalink: /graphics-programming/complex-filters
commentThreadId: -1
---

* TOC
{:toc}

In the [previous lesson](/graphics-programming/simple-filters) we introduced th concept of a `Filter` to adjust our graphics on an individual pixel level.
Some more ambitious filters require us to look at more than an individual pixel such as blurring or a variety of warping effects. To accomplish such
effects we'll need to update our implementation to utilize a more general approach. Before we begin some math and a little background needs to be introduced.

## Colors and the Color Space

2D points `(x,y)` define a position in 2D Space; 3D points `(x,y,z)` define a position in 3D Space. With this same intuition colors `(R,G,B)` define a position
in a Color Space. This can be visualized with a Color Cube:

<figure>
    <img src="/media-library/graphics-programming/RGB_color_cube.svg" alt="RGB Color Cube">
    <figcaption>RGB Color Cubes - Credit <a href="https://commons.wikimedia.org/wiki/File:RGB_color_cube.svg" target="_blank">Wikimedia Commons</a></figcaption>
</figure>

The addition of the alpha component means we have a 4D "point" `(R,G,B,A)` in a 4 dimensional color space. While this 4D space could be [represented visually](https://en.wikipedia.org/wiki/Tesseract),
it could be challenging to visualize. So instead we can represent this with an additional image where the x-coordinate is the `(R,G,B)` color and the y-coordinate is the alpha value:

<figure>
    <img src="/media-library/graphics-programming/RGBA_comp.png" alt="RGB Color Cube">
    <figcaption>RGBA - Credit <a href="https://en.wikipedia.org/wiki/RGBA_color_model" target="_blank">Wikipedia</a></figcaption>
</figure>

## Vectors, Points, and Colors

A `Vector` represents a quantity that has a `value` and a `direction`.

<figure>
    <img src="/media-library/graphics-programming/vector.png" alt="Vector">
    <figcaption>Vector</figcaption>
</figure>

A common example of a vector is the wind. We can say that the wind is blowing North (0°) at 20 mph. Another example is a vehicle driving West at 50 mph.

Note that a vector doesn't specify a position it just represents a force that can be applied to any location. A common notation for this is with angle brackets: `<20 mph, 0°>`.

That doesn't mean we can't express a point in space as a vector though. If we start at the origin `{x:0,y:0}` (or `{r:0,g:0,b:0,a:0}`),
the desired position `{x:12,y:24}` (or `{r:255,g:124,b:67,a:1}`) would be enough information to define the magnitude and direction for a vector.
This is referred to as a __Position Vector__. For simplicity we'll do the math with the point `{x:12,y:24}`:

<figure>
    <img src="/media-library/graphics-programming/point-to-vector.png" alt="Point to Position Vector">
    <figcaption>Point to Position Vector</figcaption>
</figure>

The distance from the origin `(0,0)` to the point `(12,24)` is the same as the `magnitude` of the vector. The distance formula you should
have learned from elementary school:

> distance = &radic;[(x<sub>2</sub> - x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub> - y<sub>1</sub>)<sup>2</sup>]

Which we can translate to JavaScript as:

```js
Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
```

Or more simply as:

```js
Math.hypot(x2 - x1, y2 - y1)
```

Since `(x1,y1)` is always the origin `(0,0)` the formula is just:

```js
Math.hypot(x1, y2)
```

Which in the case of our point `(12,24)` the magnitude would be: `26.832815729997478`.

Finding the `direction` (angle) is a little more complicated.

> tan θ = y/x

Therefore the inverse is what we want

> θ = tan<sup>-1</sup> y/x

We can accomplish this with paper and pencil with a [bit of effort](https://mathworld.wolfram.com/InverseTangent.html) but luckily in our case there is a function for that:

```js
Math.atan(y / x)
```

Which for our point `(12,24)` would be:

```js
Math.atan(24 / 12) === 1.1071487177940904
```

The number `1.1071487177940904` in this case is in [radians](https://en.wikipedia.org/wiki/Radian), so we would need to convert to degrees to be consistent with our earlier choice:

```js
// lib/util/radToDeg.js
const radToDeg = (rad) => rad * (180/Math.PI)

export default radToDeg
```

```js
radToDeg(1.1071487177940904) === 63.43494882292201
```

Choosing radians or degrees for the direction is somewhat arbitrary but since the math functions in JavaScript use radians
it would be more efficient to use those by default to avoid the need for the conversions.

Now it's time to introduce our `Vector` class:

```js
// lib/Vector.js
// new Vector({components: [12,24,15]})
class Vector {
    #components
    constructor({components}) {
        this.#components = components
    }

    get components(){ return this.#components }

    // <12,24,15>
    toString(){ return `<${this.#components.join(',')}>` }
}

export default Vector
```

Our `Point2D` class now be defined as a Position Vector:

```js
import Vector from './Vector.js'

// const p1 = new Point2D({x: 24, y: 13})
class Point2D extends Vector {
    constructor({x,y}) {
        super({components: [x,y] })
    }

    get x(){ return this.components[0] }
    get y(){ return this.components[1] }

    // p1.toString() === '(24,13)'
    toString(){ return `(${this.#x},${this.#y})` }
}

export default Point2D
```

Also since we established that a color is a point in a Color Space we can extend the `Color` class as well:

```js
import clamp from "./util/clamp.js";
import Vector from "./Vector.js";

// const RED = new Color({r: 255, g: 0, b: 0, a: 255})
class Color extends Vector {
    constructor({r,g,b,a}) {
        super({components: [
            clamp({x: r, min:0, max:255}),
            clamp({x: g, min:0, max:255}),
            clamp({x: b, min:0, max:255}),
            clamp({x: a, min:0, max:255})
        ]})
    }

    get r() { return this.components[0] }
    get g() { return this.components[1] }
    get b() { return this.components[2] }
    get a() { return this.components[3] }

    // RED.toString() === '0xff0000ff'
    toString() { 
        return `0x${
            this.valueOf().toString(16).padStart(8,'0')
        }`
    }
    // RED.valueOf() === 0xff0000ff
    valueOf() {
        const {r,g,b,a} = this
        return [a,b,g,r].reduce((sum, ch, i) => ch * 0x100**i + sum)
    }
}

export default Color
```

So we've established that a `Color` and a `Point` are vectors, so what? What does this give us?

## Enter The Matrix

## Filter Revisited

## The Identity Filter

## Contrast

## Additional Reading

* [Source code for this lesson](https://github.com/thenewobjective/thenewobjective.github.io/tree/master/scripts/graphics-programming/lesson5).
* [Kernel (image processing)](https://en.wikipedia.org/wiki/Kernel_(image_processing))
* [Contrast (vision)](https://en.wikipedia.org/wiki/Contrast_(vision))
