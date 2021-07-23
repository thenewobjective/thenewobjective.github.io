---
layout: post
icon: file-text
category: Graphics Programming
title:  "2 - Plotting Points"
date:   2021-07-21 11:00:00 -0600
permalink: /graphics-programming/plotting-points
commentThreadId: 46
---

With our canvas prepared we need a representation that can be rendered to it.
This representation will be called a `Graphic`:

```js
// lib/Graphic.js
class Graphic {}
```

Recall that the canvas `draw` method requires an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.
We'll define a property to hold onto this image data but we have to ensure that it's large enough to contain what we plot to it.

```js
// lib/Graphic.js
class Graphic {
    #imageData

    constructor({width,height}) {
        this.#imageData = new ImageData(width, height)
    }

    get imageData() { return this.#imageData; }
}
```

## Plotting Pixels

The next challenge is how to update individual pixels in the `#imageData`. If we can't plot a pixel, we can't do anything
more significant. Updating a specific pixel's color data will require a little arithmetic. First imagine
this `#imageData` in matrix form like it would be displayed on the screen:

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
const r = data[bytes * (width * y + x)  + 0],
      g = data[bytes * (width * y + x)  + 1],
      b = data[bytes * (width * y + x)  + 2],
      a = data[bytes * (width * y + x)  + 3]
```

Notice that `height` is not necessary for this computation due to our choosing Row-Major order.

Time to define our `setPixel` function. Since setting a pixel is not specific to a shape we'll define it on the base class:

```js
// lib/Graphic.js
class Graphic {
    // ...
    setPixel(x, y, r, g, b, a) {
        const bytes = 4,
              {data, width} = this.#imageData,
              i = bytes * (width * y + x);
        data[i + 0] = r
        data[i + 1] = g
        data[i + 2] = b
        data[i + 3] = a
    }
    // ...
}
```

The components being used to plot are related to each other so we can refactor this and make
the relationship explicit to improve clarity. What are we plotting? We're not
plotting `x,y,r,g,b,a`, we're plotting a `Point` with a particular `Color` so let's define them:

```js
// lib/Point2D.js

// const p1 = new Point2D({x: 24, y: 13})
// p1.toString() === '(24,13)'
class Point2D {
    constructor({x,y}) {
        this.x = x
        this.y = y
    }
    toString(){ return `(${this.x},${this.y})` }
}
```

```js
// lib/Color.js

// const RED = new Color({r: 255, g: 0, b: 0, a: 255})
// RED.toString() === '0xff0000ff'
// RED.valueOf() === 0xff0000ff
class Color {
    constructor({r,g,b,a}){
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }
    toString() { 
        return `0x${
            this.valueOf().toString(16).padStart(8,'0')
        }`
    }
    valueOf(){
        return this.r * 256**3 +
               this.g * 256**2 +
               this.b * 256    +
               this.a
    }
}
```

The components of a color only make sense if they are between `0-255`; this could be enforced with input validation
or by clamping. If we were using a programming language with a sufficiently expressive static type system we could use
that to constrain the inputs (`unsigned byte`). This is not an option in ECMAScript. If we choose to perform runtime
validation this could be quite inefficient when a significant number of colors are involved, also performing input validation
violates the [Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle).
With a [contract system](https://www.npmjs.com/package/@final-hill/decorator-contracts) such validation could be moved to
an invariant assertion. Since we want to keep this tutorial simple we'll rely on clamping the values:

```js
// lib/util/clamp.js
const clamp = (x, min, max) => Math.min(Math.max(x, min), max)

export default clamp
```

```js
// lib/Color.js
import clamp from './util/clamp.js'

class Color {
    constructor({r,g,b,a}){
        this.r = clamp(r,0,255)
        this.g = clamp(g,0,255)
        this.b = clamp(b,0,255)
        this.a = clamp(a,0,255)
    }
    // ...
}
```

Now the plot method can be updated to support our new definitions:

```js
// lib/Graphic.js
class Graphic {
    //...
    setPixel({point: {x,y}, color: {r,g,b,a}}) {
        const bytes = 4,
              {data, width} = this.#imageData,
              i = bytes * (width * y + x);
        data[i + 0] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
    }
    // ...
}
```

Now we don't want to attempt to draw pixels outside of the boundaries nor do we want
to try and draw pixels at a fractional position such as `{x:-1, y:18.5}` (at least not yet...). Let's
update the method to handle these cases:

```js
// lib/Graphic.js
class Graphic {
    // ...
    setPixel({point: {x,y}, color: {r,g,b,a}}) {
        const bytes = 4,
              {data, height, width} = this.#imageData,
              i = bytes * (width * y + x);
        if(x < 0 || y < 0 || x >= width || y >= height)
            return;
        data[i + 0] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
    }
    // ...
}
```

Since we can plot a pixel it may also be useful to get a particular pixel:

```js
// lib/Graphic.js
import Color from './Color.js'

class Graphic {
    //...
    getPixel({x,y}) {
        const bytes = 4,
              {data, height, width} = this.#imageData,
              i = bytes * (width * y + x);
        if(x < 0 || y < 0 || x >= width || y >= height)
            return new Color({r: 0, g: 0, b: 0, a: 0 });
        return new Color({
            r: data[i + 0],
            g: data[i + 1],
            b: data[i + 2],
            a: data[i + 3]
        })
    }
}
```

Since setting a pixel outside the boundaries doesn't throw an exception, getting one shouldn't either
so in this case we'll return a transparent black pixel.

With our new plotting ability we can start putting it to use. We'll generate
some noise:

```js
// lib/util/randomInt.js
const randomInt = (max) => Math.floor(Math.random() * max)

export default randomInt
```

```js
// examples/Noise.js
import Graphic from '../lib/Graphic.js'
import Color from '../lib/Color.js'
import Point2D from '../lib/Point2D.js'
import randomInt from '../lib/util/randomInt.js'

class Noise extends Graphic {
    randomColor() { 
        return new Color({
            r: randomInt(255),
            g: randomInt(255),
            b: randomInt(255),
            a: 255
        })
    }

    constructor({width, height}) {
        super({width, height})

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const point = new Point2D({x,y}),
                      color = this.randomColor()
                this.setPixel({point, color})
            }
        }
    }
}

export default Noise
```

Implementing noise is straightforward enough. Iterate over every pixel, generate a random color, then plot it.

Next we'll display our noise graphic:

```js
// examples/noise-example.js
import Canvas from '../lib/Canvas.js'
import Noise from './Noise.js'


const noise = new Noise({height: 480, width: 640})

const canvas = new Canvas({
    container: document.getElementById('noise-example'),
    height: 480,
    width: 640
})

canvas.draw({imageData: noise.imageData, top: 0, left: 0})
```

As a client having to pass in `noise.imageData` to the `draw` method is a bit redundant. Let's update that method
to accept the graphic directly as well as support our new `Point2D` class:

```js
// lib/Canvas.js
class Canvas {
    // ...
    draw({graphic: {imageData}, position: {x, y}}) {
      this.#ctx.putImageData(imageData, x, y)
    }
}
```

And update the corresponding example:

```js
// examples/noise-example.js
import Canvas from '../lib/Canvas.js'
import Noise from './Noise.js'
import Point2D from '../lib/Point2D.js'

const noise = new Noise({height: 480, width: 640})

const canvas = new Canvas({
    container: document.getElementById('noise-example'),
    height: 480,
    width: 640
})

canvas.draw({graphic: noise, position: new Point2D({x: 0, y: 0})})
```

<figure id="noise-example">
    <figcaption>Generating Noise</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson2/examples/noise-example.js"></script>

You might have been surprised at how much effort went into putting a pixel on the screen but this is fundamental
to our future work and now it's done. Time to move on.

[Source code for this lesson](https://github.com/thenewobjective/thenewobjective.github.io/tree/master/scripts/graphics-programming/lesson2).
