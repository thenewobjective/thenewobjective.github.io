class Graphic {
    #imageData

    constructor({width,height}) {
        this.#imageData = new ImageData(width, height)
    }

    get imageData(){ return this.#imageData; }

    plot({x, y, color}) {
        const {data, height, width} = this.#imageData;

        if(x < 0 || y < 0 || x >= width || y >= height)
            return;

        const xf = Math.floor(x),
              yf = Math.floor(y),
              bytes = 4,
              i = bytes * (width * yf + xf);

        data[i + 0] = (color >>> 24);
        data[i + 1] = (color << 8 >>> 24);
        data[i + 2] = (color << 16 >>> 24);
        data[i + 3] = (color << 24 >>> 24);
    }
}

export default Graphic