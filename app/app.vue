<script setup lang="ts">
// SEO and meta configuration
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - The New Objective` : 'The New Objective'
    }
})

useSeoMeta({
    title: 'The New Objective',
    description: 'The New Objective is the personal website of Michael L Haufe.',
    ogTitle: 'The New Objective',
    ogDescription: 'The New Objective is the personal website of Michael L Haufe.',
    ogSiteName: 'The New Objective',
    ogImage: 'https://thenewobjective.com/images/icons/android-chrome-512x512.png',
    twitterCard: 'summary_large_image'
})

const route = useRoute(),
    { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content')),
    { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('content'), {
        server: false
    }),
    searchTerm = ref(''),
    appConfig = useAppConfig(),

    // Scroll to anchor after hydration delay
    scrollToHash = (hash: string) => {
        if (!hash)
            return

        setTimeout(() => {
            const element = document.querySelector(hash)
            if (element)
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })

            // Fail silently if element not found
        }, appConfig.scrollBehavior?.anchorDelay || 300)
    }

// Check for query parameter and open search, and handle hash anchors on mount
onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('q')) {
        const searchButton = document.querySelector('button[aria-label*="Search"], button[class*="search"], button[data-search]')
        if (searchButton) {
            (searchButton as HTMLElement).click()
            setTimeout(() => {
                const searchInput = document.querySelector('*[role="dialog"] input')
                if (searchInput) {
                    const query = urlParams.get('q')
                    if (query) {
                        (searchInput as HTMLInputElement).value = query
                        searchTerm.value = query
                        const event = new Event('input', { bubbles: true })
                        searchInput.dispatchEvent(event)
                    }
                }
            }, 100)
        }
    }

    // Handle hash anchor on initial page load
    if (window.location.hash)
        scrollToHash(window.location.hash)
})

// Watch for query parameter changes
watch(() => route.query.q, (queryTerm) => {
    if (queryTerm && typeof queryTerm === 'string') {
        const searchButton = document.querySelector('button[aria-label*="Search"], button[class*="search"], button[data-search]')
        if (searchButton) {
            (searchButton as HTMLElement).click()
            setTimeout(() => {
                const searchInput = document.querySelector('input[placeholder*="Search"], input[type="search"]')
                if (searchInput) {
                    (searchInput as HTMLInputElement).value = queryTerm
                    searchTerm.value = queryTerm
                    const event = new Event('input', { bubbles: true })
                    searchInput.dispatchEvent(event)
                }
            }, 100)
        }
    }
})

// Watch for hash changes in the route
watch(() => route.hash, (newHash) => {
    if (newHash)
        scrollToHash(newHash)
})
</script>

<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>

        <LazyUContentSearch v-model:search-term="searchTerm" :files="files" :navigation="navigation"
            :fuse="{ resultLimit: 42 }" />
    </UApp>
</template>
