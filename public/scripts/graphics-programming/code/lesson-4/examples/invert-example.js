import Canvas from '../lib/Canvas.js'
import Invert from '../lib/filters/Invert.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
    graphic = await imageLoader.load('../assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('invert-example'),
    height: graphic.height,
    width: graphic.width,
    graphic: new Invert({ graphic })
})
canvas.render()
