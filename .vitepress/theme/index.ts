import DefaultTheme from 'vitepress/theme'
import './index.css'
import type { Theme } from 'vitepress'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import MyLayout from './Layout.vue'
import { redirects } from './redirects';

export default {
    extends: DefaultTheme,
    enhanceApp({ app, router }) {
        app.use(PrimeVue, {
            theme: {
                preset: Aura
            }
        })
        //  app.component('TestButton', TestButton)

        router.onBeforeRouteChange = (to: string) => {
            const path = to.replace(/\.html$/i, ''),
                toPath = redirects[path];

            if (toPath) {
                setTimeout(() => { router.go(toPath); })
                return false;
            } else {
                return true;
            }
        }
    },
    Layout: MyLayout
} satisfies Theme
