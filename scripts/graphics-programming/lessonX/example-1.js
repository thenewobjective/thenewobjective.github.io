import Canvas from './Canvas.js'
import BezierExample1 from './BezierExample1.js'

const bezierExample1 = new BezierExample1({height: 480, width: 640})

const canvas = new Canvas({
    container: document.getElementById('example-1'),
    height: 480,
    width: 640
})

canvas.draw({graphic: bezierExample1, top: 0, left: 0})
