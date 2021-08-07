import Vector from './Vector.js'

// const p1 = new Point2D({x: 24, y: 13})
class Point2D extends Vector {
    constructor({x,y}) {
        super({components: [x,y] })
    }

    get x(){ return this.components[0] }
    get y(){ return this.components[1] }

    // p1.toString() === '(24,13)'
    toString(){ return `(${this.#x},${this.#y})` }
}

export default Point2D