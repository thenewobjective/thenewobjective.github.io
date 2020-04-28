class Canvas {
    #canvas
    #frontBuffer
    #backBuffer

    constructor({height, width}) {
        this.#canvas = document.createElement('canvas')  
        this.#frontBuffer = this.#canvas.getContext('2d')
        this.#backBuffer = this.#frontBuffer.createImageData(width, height);
        
        Object.assign(this.#canvas, {height, width})
        Object.assign(this.#canvas.style, { border: '1px solid #ccc' })
    }
    
    fillNoise() {
        let data = this.#backBuffer.data
        for(let i = 0; i < data.length; i++) {
            // 0 - 255
            let randomInt = Math.floor(Math.random() * (255 + 1));
            data[i] = randomInt
        }
    }

    render(){
        this.fillNoise()
        this.#frontBuffer.putImageData(this.#backBuffer, 0, 0);
        requestAnimationFrame(() => this.render())
    }

    start() {
        requestAnimationFrame(() => this.render())
    }

    appendTo(element) {
      element.appendChild(this.#canvas)
    }
}

let example4 = new Canvas({ height: 360, width: 640 })
example4.appendTo(document.getElementById('example-4'))
example4.start()