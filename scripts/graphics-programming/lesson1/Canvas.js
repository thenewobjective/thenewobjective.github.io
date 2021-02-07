class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d',{alpha: false})
  
    constructor({container, height, width}) {
      Object.assign(this.#canvas, {height, width})
      container.appendChild(this.#canvas)
    }

    draw({imageData, top, left}) {
        this.#ctx.putImageData(imageData, top, left)
    }
}

export default Canvas