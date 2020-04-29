---
layout: software-rendering
icon: file-text
category: Software Rendering
title:  "1 - Setup"
date:   2020-04-25 20:00:00 -0600
permalink: /software-rendering/setup
commentThreadId: -1
---

Before we can properly begin we need to do some work to prepare a place to draw upon. This drawing place is usually called a *canvas*, analogous
to a the one you would use when physically painting. Appropriately in html there is a `<canvas>` tag that fulfills this role.

As mentioned in the [introduction](/graphics-tutorial/intro), the numerous methods and options provided by this element's API mostly won't be used.
Instead we'll create a [proxy](https://en.wikipedia.org/wiki/Proxy_pattern){:target="_blank} class to wrap the element:

```js
class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d')
  
    constructor({height, width}) {
      Object.assign(this.#canvas, {height, width})
      Object.assign(this.#canvas.style, { border: '1px solid #ccc' })
    }

    appendTo({element}) {
      element.appendChild(this.#canvas)
    }
}

let example1 = new Canvas({ height: 360, width: 640 })
example1.appendTo({element: document.getElementById('example-1')})
```

The private property `#canvas` holds the actual HTML element, and the `appendTo` method will be used to attach it the document.
The `constructor` accepts a `height` and a `width` for defining the initial size. For presentation purposes we'll give it a border.
The `#ctx` property references the drawing api of the canvas. You can see the canvas attached below:

<figure id='example-1'>
    <figcaption>example-1</figcaption>
</figure>

<script type="module" src="/scripts/software-rendering/example-1.js"></script>

As you've noticed the canvas is transparent by default. To prevent any confusion about what is on the
canvas and what is behind it we'll make it opaque by updating the `.getContext('2d')` call:

```js
class Canvas {
  ...
  #ctx = this.#canvas.getContext('2d',{alpha: false})
  ...
}
```

Now that's more like it:

<figure id='example-2'>
    <figcaption>example-2</figcaption>
</figure>

<script type="module" src="/scripts/software-rendering/example-2.js"></script>

We won't describe how to 

{% comment %}
<!--
Finally we'll need a means to update the canvas. To accomplish this we'll create a `render` method
that accepts ImageData as an argument:

```js
class Canvas {
    ...
    render(imageData) {
        
    }
    ...
}
```

TODO: ...

---
---
---

With our canvas ready to receive data it's now time to introduce the concept of _double-buffering_. A double buffer
consists of a _front buffer_ and a _back buffer_. The front buffer is the image that the user will see, and the back buffer is
where the image is constructed. After the back buffer is done, it replaces the front buffer and is then ready for the next update.
The speed at which this occurs is called the framerate. If we don't use double-buffering and just directly draw against the front-buffer
we would see a number of strange artifacts as the image is being updated such as flickering or parts of the old image that haven't been
replaced yet.

The front-buffer is encapsulated by the drawing context `#ctx`. We just need to create our `#backBuffer`:

```js
class Canvas {
    #canvas
    #ctx
    #backBuffer

    constructor({height, width}) {
      this.#canvas = document.createElement('canvas')  
      this.#ctx = this.#canvas.getContext('2d')
      this.#backBuffer = new ImageData(width, height);

      Object.assign(this.#canvas, {height, width})
      Object.assign(this.#canvas.style, { border: '1px solid #ccc' })
    }
    ...
}
```

The `#backBuffer` contains a one-dimensional array that represents pixels in
<abbr title="Red Green Blue Alpha">RGBA</abbr> order, with integer values
between 0 and 255. That's 24 bits for color and 8 bits for the alpha channel.
This color depth is referred to as [True Color](https://en.wikipedia.org/wiki/Color_depth#True_color_(24-bit)){:target="_blank"}.
The initial value of the array is zero filled which represents transparent black.

```text
[R,G,B,A,R,G,B,A,...,R,G,B,A]
[0,0,0,0,0,0,0,0,...,0,0,0,0]
```

Our example canvas is 640x360 in size so the size of each buffer is width x height x 4 bytes = 921,600 bytes.
1,843,200 bytes for both buffers. With smaller dimensions you can see that the memory requirements would drop
significantly.



---
---
---

So let's fill the backbuffer with some random data and write it to the front buffer:

```js
class Canvas {
    ...

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
    }

    ...
}

let example3 = new Canvas({ height: 360, width: 640 })
example3.appendTo(document.getElementById('example-3'))
example3.fillNoise()
example3.render()
```

<figure id='example-3'>
    <figcaption>example-3</figcaption>
</figure>

<script type="module" src="/scripts/software-rendering/example-3.js"></script>

Now let's repeat the process. We'll utilize the browser's `requestAnimationFrame` method to schedule the
call of `fillNoise()` and `render()` repetitively instead of manually calling it once.

```js
class Canvas {
    ...
    render() {
        this.fillNoise()
        this.#frontBuffer.putImageData(this.#backBuffer, 0, 0);
        requestAnimationFrame(() => this.render())
    }

    start() {
        requestAnimationFrame(() => this.render())
    }
   ...
}

let example4 = new Canvas({ height: 360, width: 640 })
example4.appendTo(document.getElementById('example-4'))
example4.start()
```

The browser's `requestAnimationFrame` method will attempt to execute `render` at 60 FPS (before every repaint).

<figure id='example-4'>
    <figcaption>example-4</figcaption>
</figure>

<script type="module" src="/scripts/software-rendering/example-4.js"></script>

So our final code for this chapter is:

```js
class Canvas {
    #canvas
    #frontBuffer
    #backBuffer

    constructor({height, width}) {
        this.#canvas = document.createElement('canvas')  
        this.#frontBuffer = this.#canvas.getContext('2d')
        this.#backBuffer = this.#frontBuffer.createImageData(width, height);

        Object.assign(this.#canvas, {height, width})
        Object.assign(this.#canvas.style, { border: '1px solid #ccc' })
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
        this.fillNoise()
        this.#frontBuffer.putImageData(this.#backBuffer, 0, 0);
        requestAnimationFrame(() => this.render())
    }

    start() {
        requestAnimationFrame(() => this.render())
    }

    appendTo(element) {
      element.appendChild(this.#canvas)
    }
}
```

In the [next chapter](/software-rendering/plotting-points) we'll start plotting and moving points.
-->
{% endcomment %}
