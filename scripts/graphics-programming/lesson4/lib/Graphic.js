import Color from "./Color.js"
import {Filter} from './filters/index.js'

class Graphic {
    #channels = 4
    #imageData; #height; #width;

    constructor({ width, height, imageData }) {
        this.#imageData = imageData ?? new ImageData(width, height)
        this.#height = this.#imageData.height
        this.#width = this.#imageData.width
    }

    get channels() { return this.#channels }
    get height() { return this.#height }
    get width() { return this.#width }
    get imageData() { return this.#imageData; }

    filter(){ return new Filter({graphic: this}) }

    setPixel({ point: { x, y }, color: { r, g, b, a } }) {
        const { channels, height, width, imageData: { data } } = this,
              i = channels * (width * y + x);
        if (x < 0 || y < 0 || x >= width || y >= height)
            return;
        data.set([r, g, b, a], i)
    }

    getPixel({ x, y }) {
        const { channels, height, width, imageData: { data } } = this,
              i = channels * (width * y + x);
        if (x < 0 || y < 0 || x >= width || y >= height)
            return new Color({ r: 0, g: 0, b: 0, a: 0 });
        const [r, g, b, a] = data.slice(i, i + 4)

        return new Color({ r, g, b, a })
    }

    render(){}
}

export default Graphic
