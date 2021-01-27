---
layout: post
icon: file-text
category: Graphics Programming
title:  "2 - Plotting Points"
date:   2020-08-25 18:50:00 -0600
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

    get imageData(){ return this.#imageData; }
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

Time to define our `plot` function. Since plotting is not specific to a shape we'll define it on the base class:

```js
// Graphic.js
class Graphic {
    ...
    plot(x, y, r, g, b, a) {
        const bytes = 4,
              {data, width, height} = this.#imageData,
              i = bytes * (width * y + x);
        data[i + 0] = r
        data[i + 1] = g
        data[i + 2] = b
        data[i + 3] = a
    }
    ...
}
```

You'd probably think it feels awkward and noisy to have to pass in the RGBA components separately as in `.plot(120,4,255,0,0,255)`, so we'll
update the method to support hex colors: `.plot(120,4,0xFF0000FF)`, which is convenient as we can name them `.plot(120,4,RED)`. Let's stay consistent and
continue to use named parameters `.plot({x:120, y:4, c:RED})`:

```js
// Graphic.js
class Graphic {
    ...
    plot({x, y, c}) {
        const bytes = 4,
              {data, width, height} = this.#imageData,
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
```

Left shift (`<<`) 8 bits:

```text
Hex:       FF |       99        AA        CC        0 |
Dec:      255 |      153       170       204        0 |
Bin: 11111111 | 10011001  10101010  11001100 00000000 |
```

Only 32 bits are supported so anything to the left of the line are discarded:

```text
Hex: |       99        AA        CC        0 |
Dec: |      153       170       204        0 |
Bin: | 10011001  10101010  11001100 00000000 |
```

Right shift (`>>>`) 24 bits:

```text
Hex: |        0        0        0       99 |       AA        CC        0
Dec: |        0        0        0      153 |      170       204        0
Bin: | 00000000 00000000 00000000 10011001 | 10101010  11001100 00000000
```

Only 32 bits are supported so anything to the right of the line are discarded:

```text
Hex: |        0        0        0       99 |
Dec: |        0        0        0      153 |
Bin: | 00000000 00000000 00000000 10011001 |
```

Which leaves us with: `0x99`

Now we don't want to attempt to draw pixels outside of the boundaries nor do we want
to try and draw pixels at a fractional position such as `plot({x:-1, y:18.5, c:BLUE})`. Let's
update the method to handle these cases:

```js
// Graphic.js
class Graphic {
    ...
    plot({x, y, c}) {
        const {width, height, data} = this.#imageData;

        if(x < 0 || y < 0 || x >= width || y >= height)
            return;

        const xf = Math.floor(x),
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

With our new plotting ability we can start putting it to use:

```js
// Noise.js
import Graphic from './Graphic.js'

class Noise extends Graphic {
    #randomInt = (max) => Math.floor(Math.random() * Math.floor(max));

    constructor({width, height}) {
        super({width, height})

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const color = this.#randomInt(0xFFFFFFFF)
                this.plot({x,y,c: color})
            }
        }
    }
}

export default Noise
```

Implementing noise is straightforward enough. Iterate over every pixel, generate a random color, then plot it.

```js
// noise-example.js
import Canvas from './Canvas.js'
import Noise from './Noise.js'

const noise = new Noise({width: 640, height: 480})

const canvas = new Canvas({width: 640, height: 480})
canvas.appendTo({element: document.getElementById('noise-example')})
canvas.draw({imageData: noise.imageData, top: 0, left: 0})
```

As a client having to pass in `noise.imageData` to the `draw` method is a bit redundant. Let's update that method
to accept the graphic directly:

```js
// Canvas.js
class Canvas {
    ...
    draw({graphic, top, left}) {
        this.#ctx.putImageData(graphic.imageData, top, left)
    }
}
```

And the corresponding example:

```js
// noise-example.js
...
canvas.draw({graphic: noise, top: 0, left: 0})
```

<figure id="noise-example">
    <figcaption>Generating Noise</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/noise-example.js"></script>

You might have been surprised at how much effort went into putting a pixel on the screen but this is fundamental
to our future work and now it's done. Time to move on.
