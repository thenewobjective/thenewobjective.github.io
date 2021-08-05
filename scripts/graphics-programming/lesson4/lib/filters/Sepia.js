import Filter from './Filter.js'
import Color from '../Color.js'

class Sepia extends Filter {
    filterColor({color: {r,g,b,a}}) {
        return new Color({
            r: 0.393*r + 0.769*g + 0.189*b, 
            g: 0.349*r + 0.686*g + 0.168*b,
            b: 0.272*r + 0.534*g + 0.131*b,
            a
        })
    }
}

export default Sepia