class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d')
  
    constructor({height, width}) {
      Object.assign(this.#canvas, {height, width})
      Object.assign(this.#canvas.style, { border: '1px solid #ccc' })
    }
    
    appendTo(element) {
      element.appendChild(this.#canvas)
    }
}

let example1 = new Canvas({ height: 360, width: 640 })
example1.appendTo(document.getElementById('example-1'))