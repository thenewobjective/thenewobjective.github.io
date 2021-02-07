class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d',{alpha: false})
  
    constructor({container, height, width}) {
      Object.assign(this.#canvas, {height, width})
      container.appendChild(this.#canvas)
    }

    draw({graphic, top, left}) {
      this.#ctx.putImageData(graphic.imageData, top, left)
  }
}

export default Canvas