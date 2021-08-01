import Filter from './Filter.js'
import Color from '../Color.js'

class Grayscale extends Filter {
    filterColor({color: {r,g,b,a}}) {
        return new Color({r: 0.2126*r, g: 0.7152*g, b: 0.0722*b, a})
    }
}

export default Grayscale