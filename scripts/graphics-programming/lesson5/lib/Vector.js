// new Vector({components: [12,24,15]})
class Vector {
    #components
    constructor({components}) {
        this.#components = components
    }

    get components(){ return this.#components }

    // <12,24,15>
    toString(){ return `<${this.#components.join(',')}>` }
}

export default Vector