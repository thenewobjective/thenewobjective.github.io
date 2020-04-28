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

class NoiseExample extends Canvas {
    render() {
        this.fillNoise()
        super.render()
    }
}

let example5 = new NoiseExample({ height: 360, width: 640 })
example5.appendTo(document.getElementById('example-5'))
example5.start()

export {Canvas, NoiseExample}