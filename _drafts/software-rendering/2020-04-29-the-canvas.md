---
layout: software-rendering
icon: file-text
category: Software Rendering
title:  "2 - The Canvas"
date:   2020-04-29 02:00:00 -0600
permalink: /software-rendering/the-canvas
commentThreadId: -1
---

There are multiple ways to render shapes to a webpage. We're going to choose the `<canvas>`
element as it provides the most control. Given the declarative nature of our approach though,
the drawing routines provided by the canvas API are not going to be used. Therefore we'll
create a [proxy](https://en.wikipedia.org/wiki/Proxy_pattern){:target="_blank} class to wrap
the element and hide the dirty details:

```js
class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d',{alpha: false})
  
    constructor(height, width) {
      Object.assign(this.#canvas, {height, width})
    }

    appendTo(element) {
      element.appendChild(this.#canvas)
    }
}
```

The private property `#canvas` holds the actual HTML element, and the `appendTo` method will be used to attach it the document.
The `constructor` accepts a `height` and a `width` for defining the initial size. The `#ctx` property references the drawing
api of the canvas. The canvas is transparent by default. To prevent any confusion about what is on the canvas and what is behind
it we make it opaque with the `{alpha: false}` option.

We want to keep this class simple so we'll limit the ability to draw on it by providing a single method called `draw`:

```js
class Canvas {
    ...
    draw(imageData, top, left) {
        this.#ctx.putImageData(imageData, top, left)
    }
}
```

The drawing context requires an ImageData object and a position therefore our `draw` method must accept the same. This is enough for now
let's wrap it in a module `Canvas` and move on to the next section. You can download the module [here](/scripts/software-rendering/Canvas.js).
