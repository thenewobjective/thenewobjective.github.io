import Component from './Component.js'
import {qs} from './query.js'

export default class Search extends Component {
    constructor(options) {
        super(options)
        this.el.addEventListener('submit', this)
    }

    onsubmit(e){
        let q = this.el['q'],
            s = qs("input[type='search']", this.el)
        q.value = `site:https://thenewobjective.com ${s.value}`;
        s.value = "";
    }
}