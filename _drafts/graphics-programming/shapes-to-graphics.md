---
layout: post
icon: file-text
category: Graphics Programming
title:  "- Shapes to Graphics"
date:   2030-04-29 03:00:00 -0600
permalink: /graphics-programming/shapes-to-graphics
---

Each of our shapes has a corresponding graphic representation:

```js
import * as shapes from './shapes.js';

class Graphic {}

class Square extends Graphic {
    constructor({size}) {
        super()
        this.shape = new shapes.Square({size})
    }
}

class Circle extends Graphic {
    constructor({radius}) {
        super()
        this.shape = new shapes.Circle({radius})
    }
}

class RightTriangle extends Graphic {
    constructor({base, height}) {
        super()
        this.shape = new shapes.RightTriangle({base, height})
    }
}
```

Our goal is to render to a `<canvas>` element so the data wanted is a pixel representation.
This representation is an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData){:target='_blank'} object.
We'll define a property to hold onto this image data but we have to esure that it's large enough to contain our shapes.
For our simple shapes this is trivial:

```js
class Square extends Graphic {
    constructor({size}) {
        super()
        this.shape = new shapes.Square({size})
        this.imageData = new ImageData(size, size)
    }
}

class Circle extends Graphic {
    constructor({radius}) {
        super()
        this.shape = new shapes.Circle({radius})
        this.imageData = new ImageData(radius * 2, radius * 2)
    }
}

class RightTriangle extends Graphic {
    constructor({base, height}) {
        super()
        this.shape = new shapes.RightTriangle({base, height})
        this.imageData = new ImageData(base, height)
    }
}
```

## Plotting Pixels

The next challenge is how to update individual pixels in the array. If we can't plot a pixel, we can't do anything
more significant. To update a specific pixel's color data will require a little arithmetic. First imagine
this array in matrix form like it would be displayed on the screen:

```text
y x -------------------------->
|  R B G A R B G A ... R B G A
|  R B G A R B G A ... R B G A
|  ...
v  R B G A R B G A ... R B G A
```

Mathematically this is referred to as [Matricization](https://en.wikipedia.org/wiki/Tensor_reshaping#Matricization)
in [Row-Major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order). In other words you read left to right,
from top to bottom. With this you can work out the following formula to find a desired x/y position:

```text
((y * (width * bytes)) + (x * bytes)) + component
```

Simplified as:

```text
bytes * (width * y + x) + component
```

In this case `bytes = 4` for RGBA and we'll use the following dimensions as an example `width = 640`, and `height = 360`.
The component is the offset for the particular color channel. So to access the colors at a particular `(x,y)`:

```js
let r = data[bytes * (width * y + x)  + 0],
    g = data[bytes * (width * y + x)  + 1],
    b = data[bytes * (width * y + x)  + 2],
    a = data[bytes * (width * y + x)  + 3]
```

Time to define our `plot` function. Since plotting is not specific to a shape we'll define it on the base class:

```js
class Graphic {
    ...
    setPixel(x, y, r, g, b, a) {
        let bytes = 4,
            {data, width, height} = this.imageData,
            i = bytes * (width * y + x);
        data[i + 0] = r
        data[i + 1] = g
        data[i + 2] = b
        data[i + 3] = a
    }
    ...
}
```

You'd probably think it feels awkward and noisy to have to pass in the RGBA components separately as in `.setPixel(120,4,255,0,0,255)`, so we'll
update the method to support hex colors: `.setPixel(120,4,0xFF0000FF)`, which is convenient as we can name them `.setPixel(120,4,RED)`:

```js
class Graphic {
    ...
    setPixel(x, y, c) {
        let bytes = 4,
            {data, width, height} = this.imageData,
            i = bytes * (width * y + x);
        data[i + 0] = (c >>> 24);
        data[i + 1] = (c << 8 >>> 24);
        data[i + 2] = (c << 16 >>> 24);
        data[i + 3] = (c << 24 >>> 24);
    }
    ...
}
```

Passing in a single number for a color requires some work to get the individual components out again, so above you can see
this being done with [bitwise shifting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators).

How this works is that the binary representation of the color is left shifted to remove any previous channels and then right shifted to remove subsequent color channels
leaving the desired result. The following may help to visualize how the green channel `0x99` is obtained from the color `0xFF99AACC` :

```text
Hex: |                       0xFF99AACC |
Dec: |                       4288260812 |
Bin: | 11111111100110011010101011001100 |

Hex: |       FF        99        AA        CC |
Dec: |      255       153       170       204 |
Bin: | 11111111  10011001  10101010  11001100 |

Left shift (<<) 8 bits

Hex:       FF |       99        AA        CC        0 |
Dec:      255 |      153       170       204        0 |
Bin: 11111111 | 10011001  10101010  11001100 00000000 |

Only 32 bits are supported so anything to the left of the line are discarded:

Hex: |       99        AA        CC        0 |
Dec: |      153       170       204        0 |
Bin: | 10011001  10101010  11001100 00000000 |

Right shift (>>>) 24 bits

Hex: |        0        0        0       99 |       AA        CC        0
Dec: |        0        0        0      153 |      170       204        0
Bin: | 00000000 00000000 00000000 10011001 | 10101010  11001100 00000000

Only 32 bits are supported so anything to the right of the line are discarded:

Hex: |        0        0        0       99 |
Dec: |        0        0        0      153 |
Bin: | 00000000 00000000 00000000 10011001 |

Which leaves us with:

0x99
```

Now we don't want to attempt to draw pixels outside of the boundaries nor do we want
to try and draw pixels at a fractional position such as `setPixel(-1, 18.5, BLUE)`. Let's
update the method to handle these cases:

```js
class Graphic {
    ...
    setPixel(x, y, c) {
        let {width, height, data} = this.imageData;

        if(x < 0 || y < 0 || x >= width || y >= height)
            return;

        let xf = Math.floor(x),
            yf = Math.floor(y),
            bytes = 4,
            i = bytes * (width * yf + xf);

        data[i + 0] = (c >>> 24);
        data[i + 1] = (c << 8 >>> 24);
        data[i + 2] = (c << 16 >>> 24);
        data[i + 3] = (c << 24 >>> 24);
    }
    ...
}
```

---
---

## Plotting Shapes

With our new plotting ability we can start plotting our shapes. We can either
plot them as an outline, filled, or both. Let's extend our shapes to accept these
color options `fillColor` and `strokeColor`:

```js
class Square extends Graphic {
    constructor({size, fillColor, strokeColor}) {
        super()
        Object.assign(this, {
            shape: new shapes.Square({size}),
            imageData: new ImageData(size, size),
            fillColor,
            strokeColor
        })
    }
}

class Circle extends Graphic {
    constructor({radius, fillColor, strokeColor}) {
        super()
        Object.assign(this, {
            shape: new shapes.Circle({radius}),
            imageData: new ImageData(radius * 2, radius * 2),
            fillColor,
            strokeColor
        })
    }
}

class RightTriangle extends Graphic {
    constructor({base, height, fillColor, strokeColor}) {
        super()
        Object.assign(this, {
            shape: new shapes.RightTriangle({base, height}),
            imageData: new ImageData(base, height),
            fillColor,
            strokeColor
        })
    }
}
```

Stroking is simpler so we'll start there. Two of the three shapes we have thus far
consist of straight lines and the third is curved. As more shapes are added you can
imagine that there will be a wide variety of plotting algorithms to learn, implement,
and compare. Instead of introducing some of these we'll aim for something general
and simpler as we'll only have to know one drawing technique instead of many.
The technique we'll use are [Bézier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve){:target='_blank'}.

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

Given the control points a point in between can be determined for each pair. This process can then be repeated until a single point is determined.
This point will be a point of the Bézier curve itself. This process for obtaining points of the curve is called
[de Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau's_algorithm).

```js
let bezierPoints = (points, t) =>
    points.length == 0 ? [] :
    points.length == 1 ? points :
    new Array(points.length - 1).map(([x,y],i) => [
        (1-t) * x + t * points[i+1][0]
    ])
```

---
Here are a few resources for learning more about Bézier curves:

* [https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/](https://jeremykun.com/2013/05/11/bezier-curves-and-picasso/){:target='_blank'}
* [https://pomax.github.io/bezierinfo/](https://pomax.github.io/bezierinfo/){:target='_blank'}
