const lerp = ({a, b, t}) => (1 - t) * a + t * b,
      line = ({p, q, t}) => [lerp({a:p[0], b:q[0], t}), lerp({a:p[1], b:q[1], t})],
      bezier = ({ctrlPts, t}) =>
        ctrlPts.length == 1 ? ctrlPts[0] :
        line({
            p: bezier({ctrlPts: ctrlPts.slice(0, -1), t}),
            q: bezier({ctrlPts: ctrlPts.slice(1),     t}),
            t
        })

class Graphic {
    #imageData

    constructor({width,height}) {
        this.#imageData = new ImageData(width, height)
    }

    get imageData(){ return this.#imageData; }

    setPixel({x, y, color}) {
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

    plotBezier({ctrlPts, color}) {
        const step = 0.01;
        for(let t = 0; t < 1; t += step) {
            const [x,y] = bezier({ctrlPts, t})
            this.setPixel({x, y, color})
        }
    }
}

export default Graphic
