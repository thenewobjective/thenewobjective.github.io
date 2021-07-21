import Graphic from './Graphic.js'
import Color from './Color.js'
import Point2D from './Point2D.js'

class Noise extends Graphic {
    randomColor() { 
        const randomInt = (max) => Math.floor(Math.random() * max);

        return new Color({
            r: randomInt(255),
            g: randomInt(255),
            b: randomInt(255),
            a: randomInt(255)
        })
    }

    constructor({width, height}) {
        super({width, height})

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const point = new Point2D({x,y}),
                      color = this.randomColor()
                this.plot({point, color})
            }
        }
    }
}

export default Noise