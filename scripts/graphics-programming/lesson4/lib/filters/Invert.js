import Filter from './Filter.js'
import Color from '../Color.js'

class Invert extends Filter {
    filterColor({color: {r,g,b,a}}) {
        return new Color({r: 255-r, g: 255-g, b: 255-b, a})
    }
}

export default Invert