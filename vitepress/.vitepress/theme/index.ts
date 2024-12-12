import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(PrimeVue, {
            theme: {
                preset: Aura
            }
        })
        //  app.component('TestButton', TestButton)
    }
} satisfies Theme
