import {Filter} from './index.js'
import Color from '../Color.js'

class AvgGrayscale extends Filter {
    filterColor({r,g,b,a}) {
        const avgColor = (r + g + b) / 3

        return new Color({r: avgColor, g: avgColor, b: avgColor, a})
    }
}

export default AvgGrayscale