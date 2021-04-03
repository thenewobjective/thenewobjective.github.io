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
        let query = this.el.q.value.trim(),
            newUrl = new URL(document.location.href)
        newUrl.searchParams.set('q', query)
        history.pushState({},'', newUrl.toString())
        this.search(query)
        return false;
    }

    search(query) {
        let normalized = query.toLowerCase().replace(/[^\d\w\s]+/g,"").replace(/\s+/g,' '),
            tokens = normalized.split(' '),
            results = tokens.flatMap(token => index.get(token)).filter(result => result != undefined),
            ul = this.results
        ul.innerHTML = ""
        if(results.length > 0) {
            results.map(({title,url}) => {
                let li = document.createElement('li'),
                    a = li.appendChild(document.createElement('a'))
                a.href=url
                a.textContent = title
                return li
            }).forEach(li => ul.appendChild(li));
        } else {
            let li = document.createElement('li')
            li.textContent = 'No Results'
            ul.appendChild(li)
        }
    }
}

let search = new Search({el: document.querySelector('.search')});