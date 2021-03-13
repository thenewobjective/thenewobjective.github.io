import Canvas from './Canvas.js'
import BezierExample2 from './BezierExample2.js'

const bezierExample2 = new BezierExample2({height: 480, width: 640})

const canvas = new Canvas({
    container: document.getElementById('example-2'),
    height: 480,
    width: 640
})

canvas.draw({graphic: bezierExample2, top: 0, left: 0})