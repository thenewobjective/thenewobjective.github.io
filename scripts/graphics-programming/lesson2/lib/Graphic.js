import Color from './Color.js'

class Graphic {
    #imageData
    #height
    #width
    #channels = 4

    constructor({width,height}) {
        this.#imageData = new ImageData(width, height)
        this.#height = height
        this.#width = width
    }

    get channels(){ return this.#channels }
    get imageData(){ return this.#imageData; }
    get height() { return this.#height }
    get width(){ return this.#width }

    setPixel({point: {x,y}, color: {r,g,b,a}}) {
        const {channels, height, width} = this,
              {data} = this.#imageData,
              i = channels * (width * y + x);
        if(x < 0 || y < 0 || x >= width || y >= height)
            return;
        data[i + 0] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
    }

    getPixel({x,y}) {
        const {channels, height, width} = this,
              {data} = this.#imageData,
              i = channels * (width * y + x);
        if(x < 0 || y < 0 || x >= width || y >= height)
            return new Color({r: 0, g: 0, b: 0, a: 0 });
        return new Color({
            r: data[i + 0],
            g: data[i + 1],
            b: data[i + 2],
            a: data[i + 3]
        })
    }
}

export default Graphic