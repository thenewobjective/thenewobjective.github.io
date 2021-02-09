---
layout: post
icon: file-text
category: Graphics Programming
title:  "1 - The Canvas"
date:   2020-08-25 18:45:00 -0600
permalink: /graphics-programming/the-canvas
commentThreadId: 45
---

There are multiple ways to render things to a webpage. We're going to choose the `<canvas>`
element as it provides the most control. Given the declarative nature of our approach though
the drawing routines provided by the canvas API are not going to be used. Therefore we'll
create a [proxy](https://en.wikipedia.org/wiki/Proxy_pattern){:target="_blank} class to wrap
the element and hide the dirty details:

```js
class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d')
  
    constructor({container, height, width}) {
      Object.assign(this.#canvas, {height, width})
      container.appendChild(this.#canvas)
    }
}
```

The private property `#canvas` holds the actual HTML element.
The `constructor` accepts a `height` and a `width` for defining the initial size and a `container`
for the html element that will contain the canvas . The `#ctx` property references the drawing
api of the canvas. The canvas is transparent by default.

We want to keep this class simple so we'll limit the ability to draw on it by providing a single method called `draw`:

```js
class Canvas {
    ...
    draw({imageData, top, left}) {
        this.#ctx.putImageData(imageData, top, left)
    }
}
```

The drawing context requires an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData){:target='_blank'} object and
a position therefore our `draw` method must accept the same. The `ImageData` object contains a one-dimensional array that represents
pixels in <abbr title="Red Green Blue Alpha">RGBA</abbr> order with integer values between 0 and 255. That's 24 bits for color plus
8 bits for the alpha channel. This color depth is referred to as [True Color](https://en.wikipedia.org/wiki/Color_depth#True_color_(24-bit)).
The initial value of the array is zero filled which represents transparent black.

```text
[R,G,B,A,R,G,B,A,...,R,G,B,A]
[0,0,0,0,0,0,0,0,...,0,0,0,0]
```

For example if the dimensions are 640x360 then the size of `imageData` is `width x height x 4 bytes = 921,600 bytes`.
With different dimensions you can see that the memory requirements would change significantly.

A note on style: you'll notice that parameter destructuring is used in the definition of `draw`. Named parameters are preferable to positional for
a couple reasons:

1. It makes it obvious what the actual parameters are without having to inspect the implementation.
  Ex: `repo.find(12,140,53202)` vs `repo.find({age: 12, weight: 140, zip: 53202})`
2. Extensions can be made without impacting clients
  Ex: `repo.find({name: 'bob', age: 12, weight: 140, zip: 53202})`

This style of named parameters will be used in all future examples.

[Source code for this lesson](/scripts/graphics-programming/lesson1).
