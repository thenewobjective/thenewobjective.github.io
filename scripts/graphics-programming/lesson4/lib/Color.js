import clamp from "./util/clamp.js";

// const RED = new Color({r: 255, g: 0, b: 0, a: 255})
// RED.toString() === '0xff0000ff'
class Color {
    constructor({r,g,b,a}){
        const range = {min:0, max:255}
        this.r = clamp({x:r, ...range})
        this.g = clamp({x:g, ...range})
        this.b = clamp({x:b, ...range})
        this.a = clamp({x:a, ...range})
    }
    toString() { 
        return `0x${
            this.valueOf().toString(16).padStart(8,'0')
        }`
    }
    valueOf(){
        return this.red   * 256**3 +
               this.green * 256**2 +
               this.blue  * 256    +
               this.alpha
    }
}

export default Color