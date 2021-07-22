const lerp = ({t, a, b}) => (1 - t) * a + t * b,
      lerpPoints = ({t, p0:[x0, y0], p1:[x1, y1]}) => [lerp({t, a:x0, b:x1}), lerp({t, a:y0, b:y1})]

const bezier = ({ctrlPts, t}) =>
    ctrlPts.length == 1 ? ctrlPts[0] :
    lerpPoints({t,
      p0: bezier({ctrlPts: ctrlPts.slice(0, -1), t}),
      p1: bezier({ctrlPts: ctrlPts.slice(1), t})
    });

class Graphic {
    #imageData

    constructor({width,height}) {
        this.#imageData = new ImageData(width, height)
    }

    get imageData(){ return this.#imageData; }

    plot({x, y, c}) {
        const {width, height, data} = this.#imageData;

        if(x < 0 || y < 0 || x >= width || y >= height)
            return;

        const xf = Math.floor(x),
            yf = Math.floor(y),
            bytes = 4,
            i = bytes * (width * yf + xf);

        data[i + 0] = (c >>> 24);
        data[i + 1] = (c << 8 >>> 24);
        data[i + 2] = (c << 16 >>> 24);
        data[i + 3] = (c << 24 >>> 24);
    }

    

    plotBezier({t, ctrlPts, c}){
        const step = 0.1
        for(let i = 0; i < t; i += step) {
            const [x,y] = bezier({ctrlPts, t})
            this.plot({x, y, c})
        }
    }
}

export default Graphic