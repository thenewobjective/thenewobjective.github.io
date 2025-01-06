import * as shapes from './shapes.js';

class Square extends Graphic {
    constructor({size, fillColor, strokeColor}) {
        super()
        Object.assign(this, {
            shape: shapes.Square({size}),
            imageData: new ImageData(size, size),
            fillColor,
            strokeColor
        })
        this.plotLine(   0, 0, size,    0, strokeColor)
        this.plotLine(size, 0, size, size, strokeColor)
        this.plotLine(size, size, 0, size, strokeColor)
        this.plotLine(   0, size, 0,    0, strokeColor)
    }
}

class Circle extends Graphic {
    constructor({radius, fillColor, strokeColor}) {
        super()
        Object.assign(this, {
            shape: shapes.Circle({radius}),
            imageData: new ImageData(radius * 2, radius * 2),
            fillColor,
            strokeColor
        })
    }
}

class RightTriangle extends Graphic {
    constructor({base, height, fillColor, strokeColor}) {
        super()
        Object.assign(this, {
            shape: shapes.RightTriangle({base, height}),
            imageData: new ImageData(base, height),
            fillColor,
            strokeColor
        })
        this.plotLine(   0, height, base, height, strokeColor)
        this.plotLine(base, height, base,      0, strokeColor)
        this.plotLine(base,      0,    0, height, strokeColor)
    }
}
