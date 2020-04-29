---
layout: software-rendering
icon: file-text
category: Software Rendering
title:  "2 - Plotting Points"
date:   2020-04-26 03:00:00 -0600
permalink: /software-rendering/plotting-points
commentThreadId: -1
---

Last time we rendered random noise to our canvas, now we'll add some more control over plotting points.
Before we continue let's refactor to separate our specific noise example from what we might consider basic functionality:

```js
class Canvas {
    ...
    render() {
        this.#frontBuffer.putImageData(this.#backBuffer, 0, 0);
        requestAnimationFrame(() => this.render())
    }
    ...
}

class NoiseExample extends Canvas {
    render() {
        this.fillNoise()
        super.render()
    }
}
```

So now we can re-introduce the noise example from before:

```js
let example5 = new NoiseExample({ height: 360, width: 640 })
example5.appendTo(document.getElementById('example-5'))
example5.start()
```

<script type="module" src="/scripts/software-rendering/example-5.js"></script>

<figure id='example-5'>
    <figcaption>example-5</figcaption>
</figure>

Going forward we'll follow this methodology to keep the separation of concerns clear. Now on to the
main objective: plotting.

Recall from last time that our pixel data is stored in a one-dimensional array in RGBA order:

```text
[R,G,B,A,R,G,B,A,...,R,G,B,A]
[0,0,0,0,0,0,0,0,...,0,0,0,0]
```

To update a specific pixel's color data will require a little arithmetic. First imagine
this array in matrix form like it would be displayed on the canvas:

```text
y x -------------------------->
|  R B G A R B G A ... R B G A  
|  R B G A R B G A ... R B G A
|  ...
v  R B G A R B G A ... R B G A
```

Mathematically this is referred to as [Matricization](https://en.wikipedia.org/wiki/Tensor_reshaping#Matricization){:target="_blank"}
in [Row-Major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order){:target="_blank"}. In other words you read left to right,
from top to bottom. With this you can work out the following formula to find a desired x/y position:

```text
((y * (width * bytes)) + (x * bytes)) + component
```

Simplified as:

```text
bytes * (width * y + x) + component
```

In this case `bytes = 4` for RGBA, `width = 640`, and `height = 360`. The component is the offset for the particular color channel.
So to access the colors at `x = 240`, `y = 12`:

```js
let r = data[bytes * (width * y + x)  + 0],
    g = data[bytes * (width * y + x)  + 1],
    b = data[bytes * (width * y + x)  + 2],
    a = data[bytes * (width * y + x)  + 3]
```

Time to define our `plot` function:

```js
class Canvas {
    ...
    plot(x, y, r, g, b, a) {
        let bytes = 4,
            i = bytes * (this.#canvas.width * y + x),
            data = this.#backBuffer.data;
        data[i + 0] = r
        data[i + 1] = g
        data[i + 2] = b
        data[i + 3] = a
    }
    ...
}
```

Web developers will probably think it feels awkward and noisy to have to pass in the RGBA components separately `.plot(120,4,255,0,0,255)`, so we'll
update the method to support hex colors: `.plot(120,4,0xFF0000FF)` which is convenient as we can name them `.plot(120,4,RED)`:

```js
class Canvas {
    ...
    plot(x, y, c) {
        let bytes = 4,
            i = bytes * (this.#canvas.width * y + x),
            data = this.#backBuffer.data;
        data[i + 0] = (c >>> 24);
        data[i + 1] = (c << 8 >>> 24);
        data[i + 2] = (c << 16 >>> 24);
        data[i + 3] = (c << 24 >>> 24);
    }
    ...
}
```

Passing in a single number for a color requires some work to get the individual components out again, so above you can see
this being done with [bitwise shifting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators){:target="_blank"}.

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

Now we don't want to attempt to draw pixels outside of the canvas nor do we want
to try and draw pixels at a fractional position such as `plot(-1, 18.5, BLUE)`. Let's
update the method to handle these cases:

```js
class Canvas {
    ...
    plot(x, y, c) {
        let {width, height} = this.#canvas;

        if(x < 0 || y < 0 || x >= width || y >= height)
            return;

        let xf = Math.floor(x),
            yf = Math.floor(y),
            bytes = 4,
            i = bytes * (width * yf + xf),
            data = this.#backBuffer.data;

        data[i + 0] = (c >>> 24);
        data[i + 1] = (c << 8 >>> 24);
        data[i + 2] = (c << 16 >>> 24);
        data[i + 3] = (c << 24 >>> 24);
    }
    ...
}
```

Let's plot some pixels now:

```js
class Canvas {
    ...
    get height() {
        return this.#canvas.height
    }

    get width() {
        return this.#canvas.width
    }
    ...
}

class PlottingExample extends Canvas {
    randomInt(min, max) {
        let minRound = Math.ceil(min),
            maxRound = Math.floor(max);
        return Math.floor(Math.random() * (maxRound - minRound)) + minRound;
    }

    render() {
        let color = this.randomInt(0x00000000, 0xFFFFFFFF)
        let x = this.randomInt(0,this.width - 1)
        let y = this.randomInt(0, this.height - 1)

        this.plot(x, y, color)

        super.render()
    }
}

let example6 = new PlottingExample({ height: 360, width: 640 })
example6.appendTo(document.getElementById('example-6'))
example6.start()
```

<figure id='example-6'>
    <figcaption>example-6</figcaption>
</figure>

<script type="module" src="/scripts/software-rendering/example-6.js"></script>

You'll notice that this example required access to the canvas size which is reasonable, so
the property was exposed as a read-only accessor on the base class. A remaining issue though is that
the new point is added without the old one being removed which results in a slow filling of the canvas.
So we'll provide a means to clear the back buffer by replacing it with a new empty one:

```js
class Canvas {
    ...
    clear() {
        this.#backBuffer = this.#frontBuffer.createImageData(width, height);
    }
    ...
}
```

And our plotting example becoming:

```js
class PlottingExample extends Canvas {
    ...
    render() {
        this.clear()
        let color = this.randomInt(0x00000000, 0xFFFFFFFF)
        let x = this.randomInt(0,this.width - 1)
        let y = this.randomInt(0, this.height - 1)

        this.plot(x, y, color)

        super.render()
    }
}
```

At first this may seem like overkill: we could instead try to plot a transparent pixel at the old
position before plotting the new one, but recall the math involved to find the pixel representation
in the array. When we begin to plot more points you'll notice how this "unplotting" approach would
not scale. Let's see the results:

<figure id='example-7'>
    <figcaption>example-7</figcaption>
</figure>

<script type="module" src="/scripts/software-rendering/example-7.js"></script>

---

Here's our final `Canvas` class for this chapter:

```js
class Canvas {
    #canvas
    #frontBuffer
    #backBuffer

    constructor({height, width}) {
        this.#canvas = document.createElement('canvas')  
        this.#frontBuffer = this.#canvas.getContext('2d')
        this.#backBuffer = new ImageData(width, height)

        Object.assign(this.#canvas, {height, width})
        Object.assign(this.#canvas.style, { border: '1px solid #ccc' })
    }

    get height() {
        return this.#canvas.height
    }

    get width() {
        return this.#canvas.width
    }

    fillNoise() {
        let data = this.#backBuffer.data
        for(let i = 0; i < data.length; i++) {
            // 0 - 255
            let randomInt = Math.floor(Math.random() * (255 + 1));
            data[i] = randomInt
        }
    }

    render() {
        this.#frontBuffer.putImageData(this.#backBuffer, 0, 0);
        requestAnimationFrame(() => this.render())
    }

    clear() {
        this.#backBuffer = new ImageData(this.width, this.height)
    }

    start() {
        requestAnimationFrame(() => this.render())
    }

    appendTo(element) {
        element.appendChild(this.#canvas)
    }

    plot(x, y, c) {
        let {width, height} = this.#canvas;

        if(x < 0 || y < 0 || x >= width || y >= height)
            return;

        let xf = Math.floor(x),
            yf = Math.floor(y),
            bytes = 4,
            i = bytes * (width * yf + xf),
            data = this.#backBuffer.data;

        data[i + 0] = (c >>> 24);
        data[i + 1] = (c << 8 >>> 24);
        data[i + 2] = (c << 16 >>> 24);
        data[i + 3] = (c << 24 >>> 24);
    }
}
```
