import Canvas from '../lib/Canvas.js'
import Brightness  from '../lib/filters/Brightness.js'
import ImageLoader from '../lib/ImageLoader.js'

const imageLoader = new ImageLoader(),
      butterflyImage = await imageLoader.load('/scripts/graphics-programming/lesson4/assets/butterfly-leaves.jpg')

const canvas = new Canvas({
    container: document.getElementById('brightness-example'),
    height: butterflyImage.height,
    width: butterflyImage.width,
    graphic: butterflyImage.filter({filter: new Brightness({amount: 1.75})})
})