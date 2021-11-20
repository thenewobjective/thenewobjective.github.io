import {AvgGrayscale, Brightness, Grayscale, Invert, Noise, Sepia} from './index.js'

class Filter {
    #graphic

    constructor({graphic}) {
        this.#graphic = graphic
    }

    get channels() { return this.#graphic.channels }
    get height() { return this.#graphic.height }
    get width() { return this.#graphic.width }
    get imageData() { return this.#graphic.imageData; }

    render() {
        this.#graphic.render()
        
        const {height, width} = this
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const point = {x,y},
                      color = this.getPixel(point)
                this.setPixel({point,color})
            }
        }
    }

    filterColor(color) { return color }

    getPixel(point) { return this.#graphic.getPixel(point) }

    setPixel({ point, color }) {
        this.#graphic.setPixel({point, color: this.filterColor(color)})
    }

    avgGrayscale() { return new AvgGrayscale({graphic: this}) }
    brightness({amount}) { return new Brightness({graphic: this, amount}) }
    grayscale() { return new Grayscale({graphic: this}) }
    invert() { return new Invert({graphic: this}) }
    noise(){ return new Noise({graphic: this}) }
    sepia() { return new Sepia({graphic: this}) }
}

export default Filter