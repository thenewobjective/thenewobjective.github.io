import Filter from './Filter.js'
import Color from '../Color.js'

class Brightness extends Filter {
    #amount
    constructor({amount}) {
        super()
        this.#amount = Math.max(amount,0)
    }
    filterColor({color: {r,g,b,a}}) {
        const amount = this.#amount
        return new Color({r: r*amount, g: g*amount, b: b*amount, a})
    }
}

export default Brightness