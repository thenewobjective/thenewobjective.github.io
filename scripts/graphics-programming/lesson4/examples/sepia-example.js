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