import Figure from './Figure.js'
import Comments from './Comments.js'
import {qsa, qs} from './query.js'

let comments = new Comments({el: qs('.comments')}),
    figures = qsa('figure')
        .map(figure => new Figure({ el: figure }))

// <https://mermaid-js.github.io/>
// TODO: <https://github.com/mermaid-js/mermaid/issues/856>
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        // diagramPadding:20,
        htmlLabels:false,
        useMaxWidth:false,
        width: '100%'
    }
});