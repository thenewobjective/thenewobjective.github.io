import Figure from './Figure.js'
import Comments from './Comments.js'
import Search from './Search.js'
import {qsa, qs} from './query.js'

let comments = new Comments({el: qs('.comments')}),
    figures = qsa('figure')
        .map(figure => new Figure({ el: figure }))

let search = qsa('.search')
    .map(form => new Search({el: form}))