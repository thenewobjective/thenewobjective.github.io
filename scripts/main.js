import Gallery from './Gallery.js'
import Comments from './Comments.js'
import {qsa, qs} from './query.js'

let galleries = qsa('.gallery').map(item => new Gallery({ el:item })),
    comments = new Comments({el: qs('.comments')})

let activeItem = qs('.site-nav_item[data-active]')
if(activeItem)
    activeItem.scrollIntoView()