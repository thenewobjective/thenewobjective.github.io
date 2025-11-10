export default defineAppConfig({
    ui: {
        blogPost: {
            slots: {
                // removing the aspect ratio
                // ref: https://ui.nuxt.com/docs/components/blog-post#theme
                header: 'aspect-auto'
            }
        },
        colors: {
            primary: 'blue',
            secondary: 'purple',
            neutral: 'zinc'
        }
    }
})
