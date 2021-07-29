---
layout: post
icon: file-text
category: Graphics Programming
title:  "4 - Simple Filters"
date:   2021-07-28 8:00:00 -0600
permalink: /graphics-programming/simple-filters
commentThreadId: -1
---

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

## Grayscale

Our first filter will be one to convert a graphic to [grayscale](https://en.wikipedia.org/wiki/Grayscale). This seems simple enough;
we'll take the average of the three channels and return a new color:

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

To see the results we'll use a colorful [example from WikiMedia](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Open_wing_position_of_Herona_marathus_marathus_Doubleday%2C_1848_%E2%80%93_Assam_Pasha_DSC_0076.jpg/640px-Open_wing_position_of_Herona_marathus_marathus_Doubleday%2C_1848_%E2%80%93_Assam_Pasha_DSC_0076.jpg):

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
be able to discern some colors better than others. Through experiments a set of commonly accepted [adjustments](https://en.wikipedia.org/wiki/Grayscale#Colourimetric_(perceptual_luminance-preserving)_conversion_to_greyscale) have been identified to maintain the appropriate level of objective brightness of each color ([Luminance](https://en.wikipedia.org/wiki/Luminance))

A better grayscale filter would be:

```js
// lib/filters/Grayscale.js
import Filter from './Filter.js'
import Color from '../Color.js'

class Grayscale extends Filter {
    filterColor({color: {r,g,b,a}}) {
        return new Color({r: 0.2126*r, g: 0.7152*g, b: 0.0722*b, a})
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

<!--

The general idea is to apply an algorithm to the image data and return new image data.

Our first filter will be one to convert a graphic to [grayscale](https://en.wikipedia.org/wiki/Grayscale). This filter accepts a single parameter: `amount` which
specifies the proportion of grayscale (`0%-100%`) to apply.

-->

[Source code for this lesson](https://github.com/thenewobjective/thenewobjective.github.io/tree/master/scripts/graphics-programming/lesson4).

## Additional Reading

- [How to Convert an RGB Image to Grayscale](https://e2eml.school/convert_rgb_to_grayscale.html)
