import Canvas from '../lib/Canvas.js'
import Invert  from '../lib/filters/Invert.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      butterflyImage = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('invert-example'),
    height: butterflyImage.height,
    width: butterflyImage.width,
    graphic: butterflyImage.filter({filter: new Invert()})
})