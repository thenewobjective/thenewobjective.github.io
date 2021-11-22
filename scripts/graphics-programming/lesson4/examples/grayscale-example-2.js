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