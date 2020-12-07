import Graphic from './Graphic.js'

class Noise extends Graphic {
    #randomInt = (max) => Math.floor(Math.random() * Math.floor(max));

    constructor({width, height}) {
        super({width, height})

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const color = this.#randomInt(0xFFFFFFFF)
                this.plot({x,y,c: color})
            }
        }
    }
}

export default Noise