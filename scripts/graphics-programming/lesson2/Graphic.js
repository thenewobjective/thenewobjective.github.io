class Graphic {
    #imageData

    constructor({width,height}) {
        this.#imageData = new ImageData(width, height)
    }

    get imageData(){ return this.#imageData; }

    plot({point: {x,y}, color: {r,g,b,a}}) {
        const bytes = 4,
              {data, height, width} = this.#imageData,
              i = bytes * (width * y + x);
        if(x < 0 || y < 0 || x >= width || y >= height)
            return;
        data[i + 0] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
    }
}

export default Graphic