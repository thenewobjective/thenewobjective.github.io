import Canvas from '../lib/Canvas.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      catImage = await imageLoader.load('/scripts/graphics-programming/lesson3/assets/cat-cropped.jpg')

const canvas = new Canvas({
    container: document.getElementById('image-example'),
    height: catImage.height,
    width: catImage.width
})

canvas.draw({graphic: catImage, position: {x: 0, y: 0}})