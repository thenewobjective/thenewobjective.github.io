// const p1 = new Point2D({x: 24, y: 13})
// p1.toString() === '(24,13)'
class Point2D {
    constructor({x,y}) {
        this.x = x
        this.y = y
    }
    toString(){ return `(${this.x},${this.y})` }
}

export default Point2D