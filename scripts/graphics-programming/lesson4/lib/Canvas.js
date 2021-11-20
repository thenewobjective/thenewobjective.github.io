class Canvas {
  #canvas = document.createElement('canvas')
  #ctx = this.#canvas.getContext('2d', { alpha: false })
  #graphic

  constructor({ container, height, width, graphic }) {
    this.#canvas.style.backgroundColor = 'black'
    Object.assign(this.#canvas, { height, width })
    container.appendChild(this.#canvas)
    this.#graphic = graphic
  }

  render() {
    this.#graphic.render()
    this.#ctx.putImageData(this.#graphic.imageData, 0, 0)
  }
}

export default Canvas