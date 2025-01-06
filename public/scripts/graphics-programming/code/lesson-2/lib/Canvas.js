// lib/Canvas.js
class Canvas {
  #canvas = document.createElement('canvas')
  #ctx = this.#canvas.getContext('2d', { alpha: false })

  constructor({ container, height, width, graphic: { imageData } }) {
    this.#canvas.style.backgroundColor = 'black'
    Object.assign(this.#canvas, { height, width })
    container.appendChild(this.#canvas)
    this.#ctx.putImageData(imageData, 0, 0)
  }
}

export default Canvas
