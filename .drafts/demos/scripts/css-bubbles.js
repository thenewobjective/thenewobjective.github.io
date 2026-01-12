import { qs } from '../query.js'

let container = qs('.demo-bubbles')

function rand(min, max) {
    return Math.random() * (max - min) + min
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function updateLeft(e) {
    e.target.style.left = `${randInt(10, container.offsetWidth - 10)}px`
}

// There is no repeater concept in HTML yet
function createRandomBubbles() {
    let bubble = document.createElement('div')
    bubble.classList.add('bubble')

    Array.from({ length: 80 }).forEach((_, i) => {
        let t = bubble.cloneNode(true)
        t.style.animationDelay = `${rand(0, 5)}s`
        t.style.left = `${randInt(10, container.offsetWidth - 10)}px`
          t.classList.add(`size${randInt(0, 2)}`)
        t.addEventListener('animationiteration', updateLeft, false)
        container.appendChild(t)
    })
}

createRandomBubbles()
