// lib/util/clamp.js
const clamp = ({ x, min, max }) => Math.min(Math.max(x, min), max)

export default clamp
