import Canvas from '../lib/Canvas.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
    image = await imageLoader.load('../assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('invert-sepia-example'),
    height: image.height,
    width: image.width,
    graphic: image.filter().invert().sepia()
})
canvas.render()
