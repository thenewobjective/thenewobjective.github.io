---
layout: post
icon: file-text
category: Graphics Programming
title:  "3 - Images"
date:   2021-07-22 10:00:00 -0600
permalink: /graphics-programming/loading-images
commentThreadId: 63
---

From [lesson 2](/graphics-programming/plotting-points) we gained the ability to plot points and render image data to a canvas.
While it's useful to generate that image data from scratch, it's also useful to leverage existing images.

Since we're running in a web browser a few approaches are available for loading images. While a number of them provide access to the raw binary data,
in this lesson we'll avoid parsing the variety of image formats to obtain the pixel information. What we'll
do instead is leverage the `Image` constructor and a helper method of the `HTMLCanvas` to obtain the ImageData we'll need. In a future lesson
we'll revisit this to dive into the dirty details.

The sample image we'll load is the following [cat picture](/scripts/graphics-programming/lesson3/assets/cat-cropped.jpg),
(Credit [WikiMedia Commons](https://commons.wikimedia.org/wiki/File:June_odd-eyed-cat_cropped.jpg))

```js
class ImageLoader {
    async load(url) {
        const image = await new Promise((resolve, reject) => {
                const img = Object.assign(new Image(), {
                    onload(){ resolve(img) },
                    onerror(err){ reject(err) },
                    src: url
                })
            }),
            {width, height} = image,
            canvas = Object.assign(document.createElement('canvas'), {height, width}),
            ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)

        return ctx.getImageData(0,0,width, height)
    }
}

export default ImageLoader
```

With the above, loading our image looks like this:

```js
const imageLoader = new ImageLoader(),
    catImageData = await imageLoader.load('/scripts/graphics-programming/lesson3/assets/cat-cropped.jpg')
```

With a standalone `ImageLoader` class we have opportunities for more ambitious loading approaches when the need arises.
Now that we have a means of obtaining ImageData from an image url we'll want a corresponding `Graphic`:

```js
import Graphic from "./Graphic";

class ImageGraphic extends Graphic {
    #imageData
    constructor(imageData) {
        super({width: imageData.width, height: imageData.height})
        this.#imageData = imageData
    }
}

export default ImageGraphic
```

Here you can see we've run into an awkward situation. The `ImageLoader` returns image data but the base class of `Graphic`
already creates one. To avoid such redundancy we'll refactor the Graphic class to accept an optional `imageData` argument
and while we're at it also expose height and width:

```js
class Graphic {
    #height
    #width
    #imageData

    constructor({width, height, imageData}) {
        this.#imageData = imageData ?? new ImageData(width, height)
        this.#height = this.#imageData.height
        this.#width = this.#imageData.width
    }

    get height(){ return this.#height }
    get width(){ return this.#width }
    // ...
}
```

With this change our existing classes don't change but in the case of the `ImageGraphic` it's simplified to just:

```js
class ImageGraphic extends Graphic {}
```

So the `ImageLoader` can now be updated to return this graphic directly:

```js
class ImageLoader {
    async load(url) {
        // ...

        return new ImageGraphic({
            imageData: ctx.getImageData(0,0,width,height)
        })
    }
}
```

Time to show the results of our efforts:

```js
import Canvas from './Canvas.js'
import ImageLoader from './ImageLoader.js'

const imageLoader = new ImageLoader(),
      catImage = await imageLoader.load('/scripts/graphics-programming/lesson3/assets/cat-cropped.jpg')

const canvas = new Canvas({
    container: document.getElementById('image-example'),
    height: catImage.height,
    width: catImage.width
})

canvas.draw({graphic: catImage, position: {x: 0, y: 0}})
```

<figure id="image-example">
    <figcaption>Image Example</figcaption>
</figure>
<script type="module" src="/scripts/graphics-programming/lesson3/image-example.js"></script>

[Source code for this lesson](/scripts/graphics-programming/lesson3).
