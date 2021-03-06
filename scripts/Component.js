/**
 * @typedef {Object} ComponentOptions
 * @property {HTMLElement} el
 * @property {Object} handlers
 */

class Component {
    /**
     * @type {HTMLElement}
     */
    el

    /**
     * @param {ComponentOptions} options 
     */
    constructor(options) {
        Object.assign(this, {
            el: options.el,
            handlers: options.handlers
        })
    }

    handleEvent(e) {
        if(this["on" + e.type]) {
            this["on" + e.type](e);
        }
        if (this.handlers && this.handlers["on" + e.type]) {
          this.handlers["on" + e.type](e);
        }
    }
}

export default Component