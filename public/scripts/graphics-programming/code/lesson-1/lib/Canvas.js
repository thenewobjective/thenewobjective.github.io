// lib/Canvas.js
export class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d')

    constructor({ container, height, width }) {
        Object.assign(this.#canvas, { height, width })
        container.appendChild(this.#canvas)
    }

    draw({ imageData, top, left }) {
        this.#ctx.putImageData(imageData, top, left)
    }
}
