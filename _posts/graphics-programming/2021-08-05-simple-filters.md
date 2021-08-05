---
layout: post
icon: file-text
category: Graphics Programming
title:  "4 - Simple Filters"
date:   2021-08-05 10:00:00 -0600
permalink: /graphics-programming/simple-filters
commentThreadId: 64
---

* TOC
{:toc}

## Filter

Being able to plot pixels and load images into a graphic is all well and good but sometimes there is a desire to apply changes
to a graphic after it has been created. Effects like blurring, sharpening, shifting colors, and more are what we'll tackle in this lesson.

To start we introduce the concept of a `Filter` with a single method `filterColor` that accepts a color and returns a new one by
applying the desired algorithm:

```js
// lib/filters/Filter.js
class Filter {
    filterColor({color}) { return color }
}

export default Filter
```

`Graphic` needs to be updated as well to apply the filter. To remain as stateless as possible the filter will return a new graphic by cloning.

```js
// lib/Graphic.js
class Graphic {
    // ...

    clone() {
        return new Graphic({imageData: this.#imageData})
    }

    filter({ filter }) {
        const newGraphic = this.clone(),
              { channels, height, width, imageData: { data } } = newGraphic
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const i = channels * (width * y + x),
                      [r, g, b, a] = data.slice(i, i + 4),
                      { r: r2, g: g2, b: b2, a: a2 } = filter.filterColor({color: { r, g, b, a }})
                      
                data.set([r2,g2,b2,a2],i)
            }
        }

        return newGraphic
    }
}
```

This new `clone()` method should be specialized for each `Graphic` subtype. Thus far we only have one other to worry about:

```js
// lib/ImageGraphic
class ImageGraphic extends Graphic {
    clone() {
        return new ImageGraphic({imageData: this.imageData})
    }
}
```

## Noise

For our first filter we can revisit our Noise example from [lesson 2](/graphics-programming/plotting-points):

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
    graphic: new Graphic({height: 480, width: 640})
            .filter({filter: new Noise()})
})
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
    filterColor(color: {r,g,b,a}) {
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
      butterflyImage = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('grayscale-example-1'),
    height: butterflyImage.height,
    width: butterflyImage.width,
    graphic: butterflyImage.filter({filter: new AvgGrayscale()})
})
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
    filterColor({color: {r,g,b,a}}) {
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
      butterflyImage = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('grayscale-example-2'),
    height: butterflyImage.height,
    width: butterflyImage.width,
    graphic: butterflyImage.filter({filter: new Grayscale()})
})
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
A brightness of less than `0` is undefined so the value is clamped:

```js
// lib/filters/Brightness.js
import Filter from './Filter.js'
import Color from '../Color.js'

class Brightness extends Filter {
    #amount
    constructor({amount}) {
        super()
        this.#amount = Math.max(amount,0)
    }
    filterColor({color: {r,g,b,a}}) {
        const amount = this.#amount
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
      butterflyImage = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('brightness-example'),
    height: butterflyImage.height,
    width: butterflyImage.width,
    graphic: butterflyImage.filter({filter: new Brightness({amount: 1.75})})
})
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
    filterColor({color: {r,g,b,a}}) {
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
      butterflyImage = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('invert-example'),
    height: butterflyImage.height,
    width: butterflyImage.width,
    graphic: butterflyImage.filter({filter: new Invert()})
})
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
    filterColor({color: {r,g,b,a}}) {
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
      butterflyImage = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('sepia-example'),
    height: butterflyImage.height,
    width: butterflyImage.width,
    graphic: butterflyImage.filter({filter: new Sepia()})
})
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

As you might suspect, filters can be composed. Recall that our `Graphic` class returns a new graphic:

```js
// lib/Graphic.js
class Graphic {
    // ...

    filter({ filter }) {
        // ...

        return newGraphic
    }
}
```

Since each graphic has a `filter` method we can compose filters by method chaining. An example would be
to invert an image before setting it to grayscale:

```js
// examples/invert-grayscale-example.js
import Canvas from '../lib/Canvas.js'
import Invert  from '../lib/filters/Invert.js'
import Grayscale from '../lib/filters/Grayscale.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      butterflyImage = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('invert-grayscale-example'),
    height: butterflyImage.height,
    width: butterflyImage.width,
    graphic: butterflyImage.filter({filter: new Invert()}).filter({filter: new Grayscale()})
})
```

<figure>
    <figcaption>Original Image</figcaption>
    <img src="/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg" alt="Butterfly on leaves">
</figure>
<figure id="invert-grayscale-example">
    <figcaption>Invert + Grayscale Filter</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson4/examples/invert-grayscale-example.js"></script>

This is far from all of the simple filters that could be applied, but the general approach should be clear. In the next lesson we'll tackle more complicated filters which adjust pixels based on their neighbors.

## Additional Reading

* [Source code for this lesson](https://github.com/thenewobjective/thenewobjective.github.io/tree/master/scripts/graphics-programming/lesson4).
* [How to Convert an RGB Image to Grayscale](https://e2eml.school/convert_rgb_to_grayscale.html)
