import Graphic from './Graphic.js'

class Noise extends Graphic {
    randomColor() { return Math.floor(Math.random() * 0xFFFFFFFF) }

    constructor({width, height}) {
        super({width, height})

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                this.plot({x, y, color: this.randomColor()})
            }
        }
    }
}

export default Noise