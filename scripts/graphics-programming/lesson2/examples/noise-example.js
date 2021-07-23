import Canvas from '../lib/Canvas.js'
import Noise from './Noise.js'
import Point2D from '../lib/Point2D.js'

const noise = new Noise({height: 480, width: 640})

const canvas = new Canvas({
    container: document.getElementById('noise-example'),
    height: 480,
    width: 640
})

canvas.draw({graphic: noise, position: new Point2D({x: 0, y: 0})})