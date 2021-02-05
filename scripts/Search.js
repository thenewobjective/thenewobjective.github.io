import Component from './Component.js'
import index from './search_index.js'

export default class Search extends Component {
    constructor(options) {
        super(options)
        this.el.addEventListener('submit', this)
        this.results = this.el.parentElement.querySelector('#results')
        this.btnSubmit = this.el.querySelector('#btnSubmit')
        const q = new URL(document.location.href)
        if(q.searchParams.has('q')) {
            this.el.q.value = q.searchParams.get('q')
            this.btnSubmit.click()
        }
    }

    onsubmit(e){
        e.preventDefault()
        let query = this.el.q.value.trim()
        this.search(query)
        return false;
    }

    search(query) {
        let normalized = query.toLowerCase().replace(/[^\d\w\s]+/g,"").replace(/\s+/g,' '),
            tokens = normalized.split(' '),
            urls = tokens.flatMap(t => index.get(t) ?? null),
            ul = this.results
        ul.innerHTML = ""
        urls.map(url => {
            let li = document.createElement('li'),
                a = li.appendChild(document.createElement('a'))
            a.href=url
            a.textContent = url
            return li
        }).forEach(li => ul.appendChild(li));
    }
}

let search = new Search({el: document.querySelector('.search')});