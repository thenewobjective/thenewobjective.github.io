import Canvas from './Canvas.js'
import Noise from './Noise.js'

const noise = new Noise({height: 480, width: 640})

const canvas = new Canvas({
    container: document.getElementById('noise-example'),
    height: 480,
    width: 640
})

canvas.draw({graphic: noise, top: 0, left: 0})