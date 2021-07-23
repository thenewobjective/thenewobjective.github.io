import clamp from "./util/clamp.js";

// const RED = new Color({r: 255, g: 0, b: 0, a: 255})
// RED.toString() === '0xff0000ff'
class Color {
    constructor({r,g,b,a}){
        this.r = clamp(r,0,255)
        this.g = clamp(g,0,255)
        this.b = clamp(b,0,255)
        this.a = clamp(a,0,255)
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