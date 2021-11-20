import Canvas from '../lib/Canvas.js'
import Noise  from '../lib/filters/Noise.js'
import Graphic from '../lib/Graphic.js'

const canvas = new Canvas({
    container: document.getElementById('noise-example'),
    height: 480,
    width: 640,
    graphic: new Noise({
        graphic: new Graphic({height: 480, width: 640})
    })
})
canvas.render()