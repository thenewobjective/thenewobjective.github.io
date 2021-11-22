import Canvas from '../lib/Canvas.js'
import Brightness  from '../lib/filters/Brightness.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      graphic = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('brightness-example'),
    height: graphic.height,
    width: graphic.width,
    graphic: new Brightness({graphic, amount: 1.75})
})
canvas.render()