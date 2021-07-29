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
    filterColor(color: {r,g,b,a}) { return color }
}

export default Filter
```

`Graphic` needs to be updated as well to apply the filter:

```js
// lib/Graphic.js

class Graphic {
   // ...

    filter(filter) {
        // for each pixel apply filter
        // create new ImageData
    }
}
```

## Grayscale

Our first filter will be one to convert a graphic to [grayscale](https://en.wikipedia.org/wiki/Grayscale). This seems simple enough:
we'll take the average of the three channels and return a new color:

```js
// lib/filters/Grayscale.js
import Filter from './Filter.js'
import Color from '../Color.js'

class Grayscale extends Filter {
    filterColor(color: {r,g,b,a}) {
        const avgColor = (r + g + b) / 3

        return new Color({r: avgColor, g: avgColor, b: avgColor, a})
    }
}

export default Grayscale
```

<!-->

The general idea is to apply an algorithm to the image data and return new image data.

Our first filter will be one to convert a graphic to [grayscale](https://en.wikipedia.org/wiki/Grayscale). This filter accepts a single parameter: `amount` which
specifies the proportion of grayscale (`0%-100%`) to apply.

```js
// lib/filters/Grayscale.js
import Filter from './Filter.js'

class Grayscale extends Filter {
    #amount
    constructor({amount}) {
        super()
        this.#amount = amount
    }

    apply({imageData: {data, width, height}}) {
        const newData = new ImageData(data, width),
            {data: data2} = newData

        const bytes = 4,
              i = bytes * (width * y + x);
        if(x < 0 || y < 0 || x >= width || y >= height)
            return;
        data2[i + 0] = r;
        data2[i + 1] = g;
        data2[i + 2] = b;
        data2[i + 3] = a;


        return newData
    }
}
```

[Source code for this lesson](https://github.com/thenewobjective/thenewobjective.github.io/tree/master/scripts/graphics-programming/lesson4).

## Additional Reading

- [How to Convert an RGB Image to Grayscale](https://e2eml.school/convert_rgb_to_grayscale.html)
