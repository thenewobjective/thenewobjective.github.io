import clamp from "./util/clamp.js";
import Vector from "./Vector.js";

// const RED = new Color({r: 255, g: 0, b: 0, a: 255})
class Color extends Vector {
    constructor({r,g,b,a}) {
        super({components: [
            clamp({x: r, min:0, max:255}),
            clamp({x: g, min:0, max:255}),
            clamp({x: b, min:0, max:255}),
            clamp({x: a, min:0, max:255})
        ]})
    }

    get r() { return this.components[0] }
    get g() { return this.components[1] }
    get b() { return this.components[2] }
    get a() { return this.components[3] }

    // RED.toString() === '0xff0000ff'
    toString() { 
        return `0x${
            this.valueOf().toString(16).padStart(8,'0')
        }`
    }
    // RED.valueOf() === 0xff0000ff
    valueOf() {
        const {r,g,b,a} = this
        return [a,b,g,r].reduce((sum, ch, i) => ch * 0x100**i + sum)
    }
}

export default Color