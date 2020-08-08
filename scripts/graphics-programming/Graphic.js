class Graphic {
    #imageData

    constructor({width,height}) {
        this.#imageData = new ImageData(width, height)
    }

    get imageData(){ return this.#imageData; }

    plot({x, y, c}) {
        let {width, height, data} = this.#imageData;

        if(x < 0 || y < 0 || x >= width || y >= height)
            return;

        let xf = Math.floor(x),
            yf = Math.floor(y),
            bytes = 4,
            i = bytes * (width * yf + xf);

        data[i + 0] = (c >>> 24);
        data[i + 1] = (c << 8 >>> 24);
        data[i + 2] = (c << 16 >>> 24);
        data[i + 3] = (c << 24 >>> 24);
    }
}

export default Graphic