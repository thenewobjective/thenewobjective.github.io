import assert from "./assert.js"

// const RED = new Color({r: 255, g: 0, b: 0, a: 255})
// RED.toString() === '0xff0000ff'
class Color {
    constructor({r,g,b,a}){
        const ERR = 'Color components must be between 0 and 255';
        [r,g,b,a].forEach(c => assert(0 <= c && c <= 255, ERR))
        Object.assign(this, {r,g,b,a})
    }
    toString() { 
        return `0x${
            this.valueOf().toString(16).padStart(8,'0')
        }`
    }
    valueOf(){
        return this.red   * 256**3 +
               this.green * 256**2 +
               this.blue  * 256 +
               this.alpha
    }
}

export default Color