import Figure from './Figure.js'
import { qsa } from './query.js'

let figures = qsa('figure')
    .map(figure => new Figure({ el: figure }));

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
