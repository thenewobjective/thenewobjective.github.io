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
        const eventName = `on${e.type}`
        if(this[eventName]) {
            this[eventName](e);
        }
        if (this.handlers && this.handlers[eventName]) {
          this.handlers[eventName](e);
        }
    }
}

export default Component