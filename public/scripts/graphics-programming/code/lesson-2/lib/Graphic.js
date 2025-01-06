// lib/Graphic.js
import Color from './Color.js'

class Graphic {
    #channels = 4
    #imageData; #height; #width;

    constructor({ width, height }) {
        this.#imageData = new ImageData(width, height)
        this.#height = height
        this.#width = width
    }

    get channels() { return this.#channels }
    get height() { return this.#height }
    get width() { return this.#width }
    get imageData() { return this.#imageData; }

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
}

export default Graphic


