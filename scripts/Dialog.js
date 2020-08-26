import Component from "./Component.js";

class Dialog extends Component {
    constructor(options) {
        super(options)
        this.el = document.createElement('dialog')
        this.el.classList.add('dialog')
        this.el.innerHTML = `<form method="dialog">
            <button class="dialog-cancel" type="cancel">&times;</button>
            ${options.content}
        </form>`
        document.body.appendChild(this.el)
    }

    onclick(e) {
        console.log(e.target)
    }

    close() {
        this.el.close()
    }

    show() {
        this.el.show()
    }

    showModal() {
        this.el.showModal()
    }
}

export default Dialog