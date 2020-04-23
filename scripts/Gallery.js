import GalleryDialog from './GalleryDialog.js'
import Component from './Component.js'
import {qsa} from './query.js'

class Gallery extends Component {
    constructor(options) {
        super(options)
        this.items = qsa('.gallery-item', this.el).map(item => new GalleryItem({el: item }))
    }
}

class GalleryItem extends Component {
    constructor(options) {
        super(options)
        this.el.addEventListener('click', this)
        let figure = this.el.cloneNode(true)
        figure.classList.remove('gallery-item')

        this.dialog = new GalleryDialog({ content: figure.outerHTML })
    }
    onclick(e) {
        this.dialog.showModal()
    }
}


export default Gallery