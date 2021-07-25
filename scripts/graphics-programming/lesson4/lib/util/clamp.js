// Math.clamp may be standardized in the future: 
// <https://rwaldron.github.io/proposal-math-extensions/#sec-math.clamp>
const clamp = (x, min, max) => Math.min(Math.max(x, min), max)

export default clamp