class Canvas {
    #canvas
    #ctx
    #backBuffer

    constructor({height, width}) {
        this.#canvas = document.createElement('canvas')  
        this.#ctx = this.#canvas.getContext('2d')
        this.#backBuffer = new ImageData(width, height);
        
        Object.assign(this.#canvas, {height, width})
        Object.assign(this.#canvas.style, { border: '1px solid #ccc' })
    }

    get height() {
        return this.#canvas.height
    }

    get width() {
        return this.#canvas.width
    }

    fillNoise() {
        let data = this.#backBuffer.data
        for(let i = 0; i < data.length; i++) {
            // 0 - 255
            let randomInt = Math.floor(Math.random() * (255 + 1));
            data[i] = randomInt
        }
    }

    render() {
        this.#ctx.putImageData(this.#backBuffer, 0, 0);
        requestAnimationFrame(() => this.render())
    }

    start() {
        requestAnimationFrame(() => this.render())
    }

    appendTo(element) { 
        element.appendChild(this.#canvas)
    }

    plot(x, y, c) {
        let {width, height} = this.#canvas;

        if(x < 0 || y < 0 || x >= width || y >= height)
            return;

        let xf = Math.floor(x),
            yf = Math.floor(y),
            bytes = 4,
            i = bytes * (width * yf + xf),
            data = this.#backBuffer.data;

        data[i + 0] = (c >>> 24);
        data[i + 1] = (c << 8 >>> 24);
        data[i + 2] = (c << 16 >>> 24);
        data[i + 3] = (c << 24 >>> 24);
    }
}

class PlottingExample extends Canvas {
    randomInt(min, max) {
        let minRound = Math.ceil(min),
            maxRound = Math.floor(max);
        return Math.floor(Math.random() * (maxRound - minRound)) + minRound;
    }

    render() {
        let color = this.randomInt(0x00000000, 0xFFFFFFFF)
        let x = this.randomInt(0,this.width - 1)
        let y = this.randomInt(0, this.height - 1)

        this.plot(x, y, color)

        super.render()
    }
}

let example6 = new PlottingExample({ height: 360, width: 640 })
example6.appendTo(document.getElementById('example-6'))
example6.start()

export {Canvas, PlottingExample}