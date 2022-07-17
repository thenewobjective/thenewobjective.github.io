import Figure from './Figure.js'
import Comments from './Comments.js'
import {qsa, qs} from './query.js'

let comments = new Comments({el: qs('.comments')}),
    figures = qsa('figure')
        .map(figure => new Figure({ el: figure }))

if(qs('.mermaid')) {
    const script = Object.assign(document.createElement('script'), {
        src: '/scripts/mermaid.min.js'
    })
    document.head.appendChild(script)

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
}

// This Chrome bug seems to still exist as of 2022-07-17
// https://stackoverflow.com/a/38588927/153209
(() => {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (window.location.hash && isChrome) {
        setTimeout(function () {
            var hash = window.location.hash;
            window.location.hash = "";
            window.location.hash = hash;
        }, 300);
    }
})();