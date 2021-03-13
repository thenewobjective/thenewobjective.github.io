const qsa = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)]
const qs = (sel, ctx) => (ctx || document).querySelector(sel)

export {qs,qsa}
