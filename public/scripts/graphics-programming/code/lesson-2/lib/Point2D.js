// lib/Point2D.js
class Point2D {
    #x; #y;

    constructor({ x, y }) {
        this.#x = x
        this.#y = y
    }

    get x() { return this.#x }
    get y() { return this.#y }

    toString() { return `(${this.#x},${this.#y})` }
}

export default Point2D
