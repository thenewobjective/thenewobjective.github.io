import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
    // eslint-disable-next-line max-params -- Vue Router scrollBehavior requires 3 parameters
    scrollBehavior(to, from, savedPosition) {
        const appConfig = useAppConfig()

        // If there's a saved position (browser back/forward), use it
        if (savedPosition)
            return savedPosition

        // If navigating to a hash anchor
        if (to.hash) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const element = document.querySelector(to.hash)
                    if (element) {
                        resolve({
                            el: element,
                            behavior: 'smooth'
                        })
                    }
                    else {
                        // Fail silently if element not found
                        resolve({ top: 0 })
                    }
                }, appConfig.scrollBehavior?.anchorDelay || 300)
            })
        }

        // Default: scroll to top after the next paint so layout shifts from
        // async data loading (useAsyncData watchers, sidebar rendering, etc.)
        // don't push the viewport down after the scroll is applied.
        // (vue-router discards the result if the route changed meanwhile.)
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                nextTick(() => resolve({ left: 0, top: 0, behavior: 'instant' as ScrollBehavior }))
            })
        })
    }
}
