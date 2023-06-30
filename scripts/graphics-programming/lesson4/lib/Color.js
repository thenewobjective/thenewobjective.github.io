import clamp from "./util/clamp.js";

// const RED = new Color({r: 255, g: 0, b: 0, a: 255})
class Color {
    #r; #g; #b; #a;

    constructor({r,g,b,a}) {
        const range = {min:0, max:255}
        this.#r = clamp({x:r, ...range})
        this.#g = clamp({x:g, ...range})
        this.#b = clamp({x:b, ...range})
        this.#a = clamp({x:a, ...range})
    }

    get r() { return this.#r }
    get g() { return this.#g }
    get b() { return this.#b }
    get a() { return this.#a }

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
