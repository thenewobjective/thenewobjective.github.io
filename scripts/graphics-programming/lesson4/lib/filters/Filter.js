import Graphic from '../Graphic.js'

class Filter extends Graphic {
    #graphic
    constructor({graphic}) {
        this.#graphic = graphic
    }
}

export default Filter