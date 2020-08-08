class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d',{alpha: false})
  
    constructor({height, width}) {
      Object.assign(this.#canvas, {height, width})
    }

    appendTo({element}) {
      element.appendChild(this.#canvas)
    }

    draw({graphic, top, left}) {
        this.#ctx.putImageData(graphic.imageData, top, left)
    }
}

export default Canvas