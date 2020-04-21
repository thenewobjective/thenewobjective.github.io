import Gallery from './Gallery.js'
import {qsa} from './query.js'

qsa('.gallery').forEach(item => new Gallery({ el:item }))