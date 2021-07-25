// const p1 = new Point2D({x: 24, y: 13})
class Point2D {
    #x
    #y
    
    constructor({x,y}) {
        this.#x = x
        this.#y = y
    }

    get x(){ return this.#x }
    get y(){ return this.#y }

    // p1.toString() === '(24,13)'
    toString(){ return `(${this.#x},${this.#y})` }
}

export default Point2D