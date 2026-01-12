import type { RouterScrollBehavior } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
    const appConfig = useAppConfig(),
        router = nuxtApp.$router as { options: { scrollBehavior: RouterScrollBehavior } }

    // eslint-disable-next-line max-params -- Vue Router scrollBehavior requires 3 parameters
    router.options.scrollBehavior = (to, from, savedPosition) => {
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
                            el: to.hash,
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

        // Default: scroll to top
        return { top: 0 }
    }
})
