import Canvas from '../lib/Canvas.js'
import Noise from './Noise.js'

const canvas = new Canvas({
    container: document.getElementById('noise-example'),
    height: 480,
    width: 640,
    graphic: new Noise({height: 480, width: 640})
})
