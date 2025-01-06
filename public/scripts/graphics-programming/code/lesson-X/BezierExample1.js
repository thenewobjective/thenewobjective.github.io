import Graphic from "./Graphic.js";

class BezierExample1 extends Graphic {
    constructor({height,width}){
        super({height, width})

        const WHITE = 0xFFFFFFFF
        this.plotBezier({
            color: WHITE,
            ctrlPts: [
                [0.1 * width, 0.8 * height],
                [0.2 * width, 0.2 * height],
                [0.8 * width, 0.2 * height],
                [0.8 * width, 0.8 * height]
            ]
        })
    }
}

export default BezierExample1
