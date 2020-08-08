import Graphic from './Graphic.js'

let randomInt = (max) => Math.floor(Math.random() * Math.floor(max));

class Noise extends Graphic {
    constructor({width, height}) {
        super({width, height})

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                let color = randomInt(0xFFFFFFFF)
                this.plot({x,y,c: color})
            }
        }
    }
}

export default Noise