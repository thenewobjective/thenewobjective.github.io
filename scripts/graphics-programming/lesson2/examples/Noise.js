import Graphic from '../lib/Graphic.js'
import Color from '../lib/Color.js'
import Point2D from '../lib/Point2D.js'
import randomInt from '../lib/util/randomInt.js'

class Noise extends Graphic {
    randomColor() { 
        return new Color({
            r: randomInt(255),
            g: randomInt(255),
            b: randomInt(255),
            a: 255
        })
    }

    constructor({width, height}) {
        super({width, height})

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const point = new Point2D({x,y}),
                      color = this.randomColor()
                this.setPixel({point, color})
            }
        }
    }
}

export default Noise