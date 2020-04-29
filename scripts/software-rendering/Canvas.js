class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d',{alpha: false})
  
    constructor(height, width) {
      Object.assign(this.#canvas, {height, width})
    }

    appendTo(element) {
      element.appendChild(this.#canvas)
    }

    draw(imageData, top, left) {
        this.#ctx.putImageData(imageData, top, left)
    }
}

export default Canvas