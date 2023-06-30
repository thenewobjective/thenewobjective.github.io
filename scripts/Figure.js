import Component from "./Component.js";
import Dialog from './Dialog.js'
import {qs} from './query.js'

class Figure extends Component {
    constructor(options) {
        super(options)
        const img = qs('img', this.el)
        if(img) {
            img.addEventListener('click', this)
            let figure = this.el.cloneNode(true)
            this.dialog = new Dialog({ content: figure.outerHTML })
        }
    }
    onclick(e) {
        this.dialog.showModal()
    }
}

export default Figure
