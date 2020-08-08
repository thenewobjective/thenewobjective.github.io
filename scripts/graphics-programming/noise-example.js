import Canvas from './Canvas.js'
import Noise from './Noise.js'

let noise = new Noise({width: 640, height: 480})

let canvas = new Canvas({width: 640, height: 480})
canvas.appendTo({element: document.getElementById('noise-example')})
canvas.draw({graphic: noise, top: 0, left: 0})