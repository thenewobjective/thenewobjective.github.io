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
class Graphic {}
```

Recall that the canvas `draw` method requires an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.
We'll define a property to hold onto this image data but we have to ensure that it's large enough to contain what we plot to it.

```js
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

Time to define our `plot` function. Since plotting is not specific to a shape we'll define it on the base class:

```js
class Graphic {
    // ...
    plot(x, y, r, g, b, a) {
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
// const p1 = new Point2D({x: 24, y: 13})
// p1.toString() === '(24,13)'
class Point2D {
    constructor({x,y}) {
        Object.assign(this,{x,y})
    }
    toString(){ return `(${this.x},${this.y})` }
}
```

```js
// const RED = new Color({r: 255, g: 0, b: 0, a: 255})
// RED.toString() === '0xff0000ff'
// RED.valueOf() === 0xff0000ff
class Color {
    constructor({r,g,b,a}){
        Object.assign(this, {r,g,b,a})
    }
    toString() { 
        return `0x${
            this.valueOf().toString(16).padStart(8,'0')
        }`
    }
    valueOf(){
        return this.r * 256**3 +
               this.g * 256**2 +
               this.b * 256 +
               this.a
    }
}
```

The components of a color only make sense if they are between `0-255`; to enforce this we'll add some validation.
Since we expect to do more validation in the future a means of performing assertions will also be defined:

```js
class AssertionError extends Error {}
```

```js
import AssertionError from "./AssertionError";

const assert = (condition, message) => {
    if(Boolean(condition) == false)
        throw new AssertionError(message);
}
```

```js
import assert from "./assert"

class Color {
    constructor({r,g,b,a}){
        const ERR = 'Color components must be between 0 and 255';
        [r,g,b,a].forEach(c => assert(0 <= c && c <= 255, ERR))
        Object.assign(this, {r,g,b,a})
    }
    // ...
}
```

You might ask: why not clamp the values instead of throwing an exception? It's true that clamping would be more efficient
but by clamping we would also be masking errors elsewhere. Why are bad values being created in the first place?
If you are using a programming language with an appropriate numeric type (unsigned byte), then that would be preferable.
Since ECMAScript does not static types, we will rely on this methodology instead.

Now the plot method can be updated to support our new definitions:

```js
class Graphic {
    //...
    plot({point: {x,y}, color: {r,g,b,a}}) {
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
class Graphic {
    // ...
    plot({point: {x,y}, color: {r,g,b,a}}) {
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

With our new plotting ability we can start putting it to use. We'll generate
some noise:

```js
import Graphic from './Graphic.js'
import Color from './Color.js'
import Point2D from './Point2D.js'

class Noise extends Graphic {
    randomColor() { 
        const randomInt = (max) => Math.floor(Math.random() * max);

        return new Color({
            r: randomInt(255),
            g: randomInt(255),
            b: randomInt(255),
            a: randomInt(255)
        })
    }

    constructor({width, height}) {
        super({width, height})

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const point = new Point2D({x,y}),
                      color = this.randomColor()
                this.plot({point, color})
            }
        }
    }
}

export default Noise
```

Implementing noise is straightforward enough. Iterate over every pixel, generate a random color, then plot it.

Next we'll display our noise graphic:

```js
import Canvas from './Canvas.js'
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
class Canvas {
    // ...
    draw({graphic: {imageData}, position: {x, y}}) {
      this.#ctx.putImageData(imageData, x, y)
    }
}
```

And update the corresponding example:

```js
import Canvas from './Canvas.js'
import Noise from './Noise.js'
import Point2D from './Point2D.js'

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
<script type="module" src="/scripts/graphics-programming/lesson2/noise-example.js"></script>

You might have been surprised at how much effort went into putting a pixel on the screen but this is fundamental
to our future work and now it's done. Time to move on.

[Source code for this lesson](/scripts/graphics-programming/lesson2).
