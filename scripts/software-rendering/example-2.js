class Canvas {
    #canvas = document.createElement('canvas')
    #ctx = this.#canvas.getContext('2d',{alpha: false})
  
    constructor({height, width}) {
      Object.assign(this.#canvas, {height, width})
      Object.assign(this.#canvas.style, { border: '1px solid #ccc' })
    }
    
    appendTo(element) {
      element.appendChild(this.#canvas)
    }
}

let example2 = new Canvas({ height: 360, width: 640 })
example2.appendTo(document.getElementById('example-2'))