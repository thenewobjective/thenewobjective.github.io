class Shape {}

class Square extends Shape {
    constructor({size}) {
        super()
        this.size = size
    }
    get area() { return this.size**2 }
    get perimeter() { return this.size * 4 }
}

class Circle extends Shape {
    constructor({radius}) {
        super()
        this.radius = radius
    }
    get area() { return Math.PI * this.radius**2 }
    get perimeter() { return 2 * Math.PI * this.radius }
}

class RightTriangle extends Shape {
    constructor({base, height}) {
        this.base = base
        this.height = height
    }
    get area() { return this.base * this.right / 2 }
    get perimeter() { return this.base + this.height + Math.hypot(this.base, this.height) }
}

export {Shape, Square, Circle, RightTriangle}