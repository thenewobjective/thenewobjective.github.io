import {Filter} from './index.js'
import Color from '../Color.js'
import randomInt from '../util/randomInt.js'

class Noise extends Filter {
    filterColor(color) {
        return new Color({
            r: randomInt({max: 255}),
            g: randomInt({max: 255}),
            b: randomInt({max: 255}),
            a: 255
        })
    }
}

export default Noise