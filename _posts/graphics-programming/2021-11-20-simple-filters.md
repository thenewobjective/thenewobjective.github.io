---
layout: post
icon: file-text
category: Graphics Programming
title:  "4 - Simple Filters"
date:   2021-11-20 10:00:00 -0600
permalink: /graphics-programming/simple-filters
---

* TOC
{:toc}

## Introduction

Being able to plot pixels and load images into a graphic is all well and good but sometimes there is a desire to apply changes
to a graphic after it has been created. Effects like blurring, sharpening, shifting colors, and more are what we'll tackle
in this lesson. To start we introduce the concept of a `Filter`:

```js
// lib/filters/Filter.js
class Filter {
    #graphic

    constructor({graphic}) {
        this.#graphic = graphic
    }

    get channels() { return this.#graphic.channels }
    get height() { return this.#graphic.height }
    get width() { return this.#graphic.width }
    get imageData() { return this.#graphic.imageData; }

    render() {
        this.#graphic.render()

        const {height, width} = this
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const point = {x,y},
                      color = this.getPixel(point)
                this.setPixel({point,color})
            }
        }
    }

    filterColor(color) { return color }

    getPixel(point) { return this.#graphic.getPixel(point) }

    setPixel({ point, color }) {
        this.#graphic.setPixel({point, color: this.filterColor(color)})
    }
}

export default Filter
```

A `Filter` acts like a `Graphic` by sharing its interface but you'll notice it doesn't extend it.
Instead, it accepts a `graphic` in the constructor and forwards the method calls to the
wrapped object `#graphic`. The reason for this is that our goal is to not only apply a single filter to a
graphic but to be able to apply any number of them we want in any order. To support this use-case
we're leveraging the [Decorator Pattern](https://en.wikipedia.org/wiki/Decorator_pattern). The
filter algorithm itself is the `filterColor` method. This algorithm is then applied in the
`setPixel` method by intercepting the color.

The `render` method applies the algorithm to every pixel in the wrapped graphic.
A wrinkle here though is that the wrapped graphic could be either a graphic or another filter.
To support free composition the `Graphic` class itself also needs a `render` method:

```js
// lib/Graphic.js

// ...
class Graphic {
    // ...
    render(){}
}

export default Graphic
```

This method may be useful for use-cases beyond filters as well but at this point it's just a stub.

## Noise

For our first filter we'll revisit our Noise example from [lesson 2](/graphics-programming/plotting-points):

```js
// examples/Noise.js
import Graphic from '../lib/Graphic.js'
import Color from '../lib/Color.js'
import Point2D from '../lib/Point2D.js'
import randomInt from '../lib/util/randomInt.js'

class Noise extends Graphic {
    randomColor() { 
        return new Color({
            r: randomInt({max: 255}),
            g: randomInt({max: 255}),
            b: randomInt({max: 255}),
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

Converting this into a Noise Filter simplifies this significantly:

```js
// lib/filters/Noise.js
import Filter from './Filter.js'
import Color from '../Color.js'
import randomInt from '../util/randomInt.js'

class Noise extends Filter {
    filterColor(color) {
        return new Color({
            r: randomInt({max: 255}),
            g: randomInt({max: 255}),
            b: randomInt({max: 255}),
            a: 255
        })
    }
}

export default Noise
```

Our updated example:

```js
// examples/noise-example.js
import Canvas from '../lib/Canvas.js'
import Noise  from '../lib/filters/Noise.js'
import Graphic from '../lib/Graphic.js'

const canvas = new Canvas({
    container: document.getElementById('noise-example'),
    height: 480,
    width: 640,
    graphic: new Noise({
        graphic: new Graphic({height: 480, width: 640})
    }).render()
})
```

With every `Graphic` now supporting a `render` method it looks a little awkward to have it called
directly before assigning it to the canvas. The canvas itself should control when and how rendering is
performed so we'll refactor and update `Canvas`:

```js
// lib/Canvas.js
class Canvas {
  #canvas = document.createElement('canvas')
  #ctx = this.#canvas.getContext('2d', { alpha: false })
  #graphic

  constructor({ container, height, width, graphic }) {
    this.#canvas.style.backgroundColor = 'black'
    Object.assign(this.#canvas, { height, width })
    container.appendChild(this.#canvas)
    this.#graphic = graphic
  }

  render() {
    this.#graphic.render()
    this.#ctx.putImageData(this.#graphic.imageData, 0, 0)
  }
}

export default Canvas
```

The example is now:

```js
// examples/noise-example.js
import Canvas from '../lib/Canvas.js'
import Noise  from '../lib/filters/Noise.js'
import Graphic from '../lib/Graphic.js'

const canvas = new Canvas({
    container: document.getElementById('noise-example'),
    height: 480,
    width: 640,
    graphic: new Noise({
        graphic: new Graphic({height: 480, width: 640})
    })
})
canvas.render()
```

<figure id="noise-example">
    <figcaption>Noise Filter</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson4/examples/noise-example.js"></script>

## Grayscale

[Grayscale](https://en.wikipedia.org/wiki/Grayscale) is another common filter and seems simple enough to implement.
We'll take the average of the three channels and return a new color:

```js
// lib/filters/AvgGrayscale.js
import Filter from './Filter.js'
import Color from '../Color.js'

class AvgGrayscale extends Filter {
    filterColor({r,g,b,a}) {
        const avgColor = (r + g + b) / 3

        return new Color({r: avgColor, g: avgColor, b: avgColor, a})
    }
}

export default AvgGrayscale
```

To see the results we'll use a colorful [example](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Open_wing_position_of_Herona_marathus_marathus_Doubleday%2C_1848_%E2%80%93_Assam_Pasha_DSC_0076.jpg/640px-Open_wing_position_of_Herona_marathus_marathus_Doubleday%2C_1848_%E2%80%93_Assam_Pasha_DSC_0076.jpg) from WikiMedia:

```js
// examples/grayscale-example-1.js
import Canvas from '../lib/Canvas.js'
import ImageLoader from '../lib/ImageLoader.js'
import AvgGrayscale  from '../lib/filters/AvgGrayscale.js'

const imageLoader = new ImageLoader(),
      graphic = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('grayscale-example-1'),
    height: graphic.height,
    width: graphic.width,
    graphic: new AvgGrayscale({graphic})
})
canvas.render()
```

<figure>
    <figcaption>Original Image</figcaption>
    <img src="/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg" alt="Butterfly on leaves">
</figure>
<figure id="grayscale-example-1">
    <figcaption>Avg Grayscale Filter</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson4/examples/grayscale-example-1.js"></script>

You may notice that the image seems a bit darker than expected. This is because the human eye does not see all colors equally and has evolved to
be able to discern some colors better than others. Through experiments a set of commonly accepted [adjustments](https://en.wikipedia.org/wiki/Grayscale#Colourimetric_(perceptual_luminance-preserving)_conversion_to_greyscale) have been identified to maintain the appropriate level.

A better grayscale filter would be:

```js
// lib/filters/Grayscale.js
import Filter from './Filter.js'
import Color from '../Color.js'

class Grayscale extends Filter {
    filterColor({r,g,b,a}) {
        const luminance = 0.2126*r + 0.7152*g + 0.0722*b
        return new Color({r: luminance, g: luminance, b: luminance, a})
    }
}

export default Grayscale
```

The updated example:

```js
// examples/grayscale-example-2.js
import Canvas from '../lib/Canvas.js'
import ImageLoader from '../lib/ImageLoader.js'
import Grayscale  from '../lib/filters/Grayscale.js'

const imageLoader = new ImageLoader(),
      graphic = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('grayscale-example-2'),
    height: graphic.height,
    width: graphic.width,
    graphic: new Grayscale({graphic})
})
canvas.render()
```

<figure>
    <figcaption>Original Image</figcaption>
    <img src="/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg" alt="Butterfly on leaves">
</figure>
<figure id="grayscale-example-2">
    <figcaption>Adjusted Grayscale Filter</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson4/examples/grayscale-example-2.js"></script>

## Brightness

The `Brightness` filter brightens or darkens a graphic by a specified `amount`. An `amount` of `1` would have
no change. An amount of `0.5` would darken the graphic by `50%`. An `amount` of `2` would be `200%` brightness.
A brightness of less than `0` is undefined so the value is clamped.

```js
// lib/filters/Brightness.js
import Filter from './Filter.js'
import Color from '../Color.js'

class Brightness extends Filter {
    #amount

    constructor({graphic, amount}) {
        super({graphic})
        this.#amount = Math.max(amount,0)
    }

    get amount(){ return this.#amount }

    filterColor({r,g,b,a}) {
        const {amount} = this
        return new Color({r: r*amount, g: g*amount, b: b*amount, a})
    }
}

export default Brightness
```

```js
// examples/brightness-example.js
import Canvas from '../lib/Canvas.js'
import Brightness  from '../lib/filters/Brightness.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      graphic = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('brightness-example'),
    height: graphic.height,
    width: graphic.width,
    graphic: new Brightness({graphic, amount: 1.75})
})
canvas.render()
```

<figure>
    <figcaption>Original Image</figcaption>
    <img src="/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg" alt="Butterfly on leaves">
</figure>
<figure id="brightness-example">
    <figcaption>Brightness Filter</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson4/examples/brightness-example.js"></script>

## Inversion

Inverting colors is another straightforward filter. For each color channel we simply subtract the value from 255:

```js
// lib/filters/Invert.js
import Filter from './Filter.js'
import Color from '../Color.js'

class Invert extends Filter {
    filterColor({r,g,b,a}) {
        return new Color({r: 255-r, g: 255-g, b: 255-b, a})
    }
}

export default Invert
```

```js
// examples/invert-example.js
import Canvas from '../lib/Canvas.js'
import Invert  from '../lib/filters/Invert.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      graphic = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('invert-example'),
    height: graphic.height,
    width: graphic.width,
    graphic: new Invert({graphic})
})
canvas.render()
```

<figure>
    <figcaption>Original Image</figcaption>
    <img src="/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg" alt="Butterfly on leaves">
</figure>
<figure id="invert-example">
    <figcaption>Invert Filter</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson4/examples/invert-example.js"></script>

## Sepia

Another popular filter is [Sepia](https://en.wikipedia.org/wiki/Sepia_(color)) which could be considered
"brownscale" instead of grayscale. This effect is reminiscent of [photographs](https://en.wikipedia.org/wiki/Photographic_print_toning) of the 1800s and renaissance era books.

```js
// lib/filters/Sepia.js
import Filter from './Filter.js'
import Color from '../Color.js'

class Sepia extends Filter {
    filterColor({r,g,b,a}) {
        return new Color({
            r: 0.393*r + 0.769*g + 0.189*b, 
            g: 0.349*r + 0.686*g + 0.168*b,
            b: 0.272*r + 0.534*g + 0.131*b,
            a
        })
    }
}

export default Sepia
```

The numeric adjustments are debatable, but the above seem to be the most popular and based on
a Microsoft [recommendation](https://docs.microsoft.com/en-us/archive/msdn-magazine/2005/january/net-matters-sepia-tone-stringlogicalcomparer-and-more).

```js
// examples/sepia-example.js
import Canvas from '../lib/Canvas.js'
import Sepia  from '../lib/filters/Sepia.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      graphic = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('sepia-example'),
    height: graphic.height,
    width: graphic.width,
    graphic: new Sepia({graphic})
})
canvas.render()
```

<figure>
    <figcaption>Original Image</figcaption>
    <img src="/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg" alt="Butterfly on leaves">
</figure>
<figure id="sepia-example">
    <figcaption>Sepia Filter</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson4/examples/sepia-example.js"></script>

## Composing Filters

Applying multiple filters is simple composition. An example would be to invert an image before applying sepia:

```js
// examples/invert-sepia-example.js
import Canvas from '../lib/Canvas.js'
import Invert from '../lib/filters/Invert.js'
import Sepia from '../lib/filters/Sepia.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      image = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('invert-sepia-example'),
    height: graphic.height,
    width: graphic.width,
    graphic: new Sepia({
        graphic: new Invert({graphic: image})
    })
})
canvas.render()
```

While the composition is straightforward it's a bit more verbose than necessary
with the multiple imports and constructor calls. Why bother with them at all?
In the context of a `Filter` each name is unique so we can update our code to
leverage method chaining for composition.

First, to avoid [issues](https://twitter.com/mlhaufe/status/1321168932296921089) with
cyclical imports, we'll create an index for the filters defined thus far. Note that the
base class `Filter` comes first:

```js
// lib/filters/index.js
import Filter from './Filter.js'
import AvgGrayscale from './AvgGrayscale.js'
import Brightness from './Brightness.js'
import Grayscale from './Grayscale.js'
import Invert from './Invert.js'
import Noise from './Noise.js'
import Sepia from './Sepia.js'

export {AvgGrayscale, Brightness, Filter, Grayscale, Invert, Noise, Sepia}
```

Each of our individual filters then import the `Feature` class from this index
instead of directly:

```js
// lib/filters/AvgGrayscale.js
// lib/filters/Brightness.js
// lib/filters/Grayscale.js
// lib/filters/Invert.js
// lib/filters/Noise.js
// lib/filters/Sepia.js
import {Filter} from './index.js'

// ...
```

With that in hand the `Filter` class can now implement the composition api:

```js
// lib/filters/Filter.js
import {AvgGrayscale, Brightness, Grayscale, Invert, Noise, Sepia} from './index.js'

class Filter {
    // ...
    avgGrayscale() { return new AvgGrayscale({graphic: this}) }
    brightness({amount}) { return new Brightness({graphic: this, amount}) }
    grayscale() { return new Grayscale({graphic: this}) }
    invert() { return new Invert({graphic: this}) }
    noise(){ return new Noise({graphic: this}) }
    sepia() { return new Sepia({graphic: this}) }
}
```

The final piece is to update the base `Graphic` to apply a filter:

```js
// lib/Graphic.js
import {Filter} from './filters/index.js'

// ...

class Graphic {
    // ...
    filter(){ return new Filter({graphic: this}) }
}

export default Graphic
```

Our composed example is now:

```js
// examples/invert-sepia-example.js
import Canvas from '../lib/Canvas.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      image = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('invert-sepia-example'),
    height: image.height,
    width: image.width,
    graphic: image.filter().invert().sepia()
})
canvas.render()
```

Notice how we've eliminated the need for client code to import filters and our nested constructor calls
have become simple method chaining.

<figure>
    <figcaption>Original Image</figcaption>
    <img src="/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg" alt="Butterfly on leaves">
</figure>
<figure id="invert-sepia-example">
    <figcaption>Invert + Sepia Filter</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson4/examples/invert-sepia-example.js"></script>

This is far from all of the simple filters that could be applied, but the general approach should be clear.
Also, as a reminder, we're not aiming for the most efficient implementation at this stage. The priority
is understanding; efficiency comes later. To quote:

> For every polynomial-time algorithm you have, there is an exponential algorithm that I would rather run.
> <cite><a href="https://en.wikipedia.org/wiki/Alan_Perlis" target="_blank">Alan Perlis</a></cite>

In the next lesson we'll tackle more ambitious filters which adjust pixels based on their neighbors.

## Additional Reading

* [Source code for this lesson](https://github.com/thenewobjective/thenewobjective.github.io/tree/master/scripts/graphics-programming/lesson4).
* [How to Convert an RGB Image to Grayscale](https://e2eml.school/convert_rgb_to_grayscale.html)
