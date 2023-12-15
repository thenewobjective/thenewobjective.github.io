import {Filter} from './index.js'
import Color from '../Color.js'

class Grayscale extends Filter {
    filterColor({r,g,b,a}) {
        const luminance = 0.2126*r + 0.7152*g + 0.0722*b
        return new Color({r: luminance, g: luminance, b: luminance, a})
    }
}

export default Grayscale
