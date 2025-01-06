import {qs} from '../query.js'

class SpinnerBubbles {
    constructor() {
        this.el = qs('.spinner-bubbles-canvas')

        this.centerX = this.el.offsetWidth / 2
        this.centerY =  this.el.offsetHeight / 2

        this.inpBubbleCount = qs('.spinner-bubbles_balls')
        this.inpBubbleCount.addEventListener('input', this.onBallChange.bind(this))
        this.bubbleCount = this.inpBubbleCount.valueAsNumber

        this.inpCoilCount = qs('.spinner-bubbles_coils')
        this.inpCoilCount.addEventListener('input', this.onCoilChange.bind(this))
        this.coilCount = this.inpCoilCount.valueAsNumber

        this.inpBubbleRadius = qs('.spinner-bubbles_ball-radius')
        this.inpBubbleRadius.addEventListener('input', this.onBallRadiusChange.bind(this))
        this.bubbleRadius = this.inpBubbleRadius.valueAsNumber

        this.inpBubblingCount = qs('.spinner-bubbles_bubbling-count')
        this.inpBubblingCount.addEventListener('input', this.onBubblingCountChange.bind(this))
        this.bubblingCount = this.inpBubblingCount.valueAsNumber

        this.bubbles = []
        this.init()
    }

    init(){
        this.bubbles = Array.from({length: this.bubbleCount}).map((_,i) =>
            new Bubble(i, this.bubbleRadius, this.bubblingCount, this.coilCount, this.bubbleCount)
        )
        this.el.innerHTML = ''
        this.bubbles.forEach(bubble => {
            this.el.appendChild(bubble.el)
        })
    }

    onBallChange() {
        this.bubbleCount = this.bubbleCount = this.inpBubbleCount.valueAsNumber
        this.init()
    }

    onCoilChange() {
        this.coilCount = this.inpCoilCount.valueAsNumber
        this.init()
    }

    onBallRadiusChange() {
        this.bubbleRadius = this.inpBubbleRadius.valueAsNumber
        this.init()
    }

    onBubblingCountChange() {
        this.bubblingCount = this.inpBubbleCount.valueAsNumber
        this.init()
    }

    render() {
        window.requestAnimationFrame(this.render.bind(this))

        this.bubbles.forEach(bubble => {
            bubble.update(this.coilCount, this.bubblingCount, this.centerX, this.centerY)
        })
    }
}

class Bubble {
    constructor(index, radius, bubblingCount, coilCount, bubbleCount) {
        const pic =  Math.PI * coilCount,
              pic2 = pic * 2;

        this.index = index
        this.theta = index * (bubblingCount + pic2) / bubbleCount;
        this.x = 0;
        this.y = 0;
        this.radius = radius;
        this.el = document.createElement('div')
        this.el.classList.add('spinner-bubble')
    }

    update(coilCount, bubblingCount, centerX, centerY) {
        const pic =  Math.PI * coilCount,
              pic2 = pic * 2
        this.theta += 0.03

        // positioning

        if(this.theta > (bubblingCount + pic2))
            this.theta -= (bubblingCount + pic2);

        if(this.theta < pic2) {
            this.y = this.radius * (this.theta/pic - 1);
            const r1 = Math.sqrt(this.radius**2 - this.y**2);
            this.x = r1 * Math.cos(this.theta);
            this.z = r1 * Math.sin(this.theta);
        } else {
            this.y = this.radius - 2 * this.radius * (this.theta - pic2) / bubblingCount;
            this.x = 0;
            this.z = 0;
        }

        const perspective = 500 / (300 - this.z)
        if(perspective < 0)
            this.x = -10000;

        this.el.style.top = `${centerY + perspective * this.y}px`;
        this.el.style.left = `${centerX + perspective * this.x}px`;
        this.el.style.width = `${perspective * 31}px`;
        this.el.style.height = `${perspective * 31}px`;
        // translate zIndex to remin above canvas
        this.el.style.zIndex = `${Math.round(this.z) + 100}`;

        const pixelRadius = Math.round(Math.max(0, this.z * this.radius) / 512)

        if(pixelRadius > 1) {
            this.el.style.filter = `blur(${pixelRadius}px)`
        } else {
            this.el.style.filter = `blur(0)`
        }
    }
}

let spinnerBubbles = new SpinnerBubbles()

spinnerBubbles.render()
