import {Filter} from './index.js'
import Color from '../Color.js'

class Brightness extends Filter {
    #amount

    constructor({graphic, amount}) {
        super({graphic})
        this.#amount = Math.max(amount,0)
    }

    get amount(){ return this.#amount }

    filterColor({r,g,b,a}) {
        const {amount} = this
        return new Color({r: r*amount, g: g*amount, b: b*amount, a})
    }
}

export default Brightness
