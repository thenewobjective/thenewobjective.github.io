import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: {
                include: '*/**/*.md',
                exclude: ['**/index.md']
            }
        }),
        pages: defineCollection({
            type: 'page',
            source: {
                include: '*.md',
                exclude: ['index.md']
            }
        }),
        categoryIndexes: defineCollection({
            type: 'page',
            source: {
                include: '*/index.md'
            }
        })
    }
})
