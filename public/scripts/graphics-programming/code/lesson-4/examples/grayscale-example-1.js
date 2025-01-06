import Canvas from '../lib/Canvas.js'
import ImageLoader from '../lib/ImageLoader.js'
import AvgGrayscale from '../lib/filters/AvgGrayscale.js'

const imageLoader = new ImageLoader(),
    graphic = await imageLoader.load('../assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('grayscale-example-1'),
    height: graphic.height,
    width: graphic.width,
    graphic: new AvgGrayscale({ graphic })
})
canvas.render()
