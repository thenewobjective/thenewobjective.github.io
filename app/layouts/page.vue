<script setup lang="ts">
const route = useRoute(),
    { data: page } = await useAsyncData(route.path, async () => {
        // Try pages collection first (for root .md files)
        let page = await queryCollection('pages').path(route.path).select('title', 'description', 'meta', 'body').first()

        // If not found, try categoryIndexes collection (for category/index.md files)
        // Need to check both with and without trailing slash
        if (!page) {
            const pathWithSlash = route.path.endsWith('/') ? route.path : `${route.path}/`
            page = await queryCollection('categoryIndexes').path(pathWithSlash).select('title', 'description', 'meta', 'body').first()
        }

        return page
    }, {
        watch: [() => route.path]
    })

// Set page-specific SEO meta tags
useHead(() => ({
    title: page.value?.title,
    meta: [
        { name: 'description', content: page.value?.description || 'The New Objective is the personal website of Michael L Haufe.' },
        { property: 'og:title', content: page.value?.title || 'The New Objective' },
        { property: 'og:description', content: page.value?.description || 'The New Objective is the personal website of Michael L Haufe.' },
        { property: 'og:url', content: `https://thenewobjective.com${route.path}` },
        { property: 'og:image', content: page.value?.meta?.featuredImage ? `https://thenewobjective.com${page.value.meta.featuredImage}` : 'https://thenewobjective.com/images/icons/android-chrome-512x512.png' }
    ],
    link: [
        { rel: 'canonical', href: `https://thenewobjective.com${route.path}` }
    ]
}))
</script>

<template>
    <SiteHeader />

    <UPage class="page">
        <template #left>
            <UPageAside class="max-w-fit">
                <SidebarNavigation />
                <USeparator />
                <ULink to="https://brave.com/the327" target="_blank" class="flex justify-center py-4">
                    <img src="/media-library/brave/brave-banner.png" title="Be brave" alt="Be brave">
                </ULink>
                <USeparator />
                <ULink to="https://ko-fi.com/S6S81UP2DK" target="_blank" class="flex justify-center py-4">
                    <img src="https://storage.ko-fi.com/cdn/kofi3.png?v=6" class="border-0 h-9"
                        alt="Buy Me a Coffee at ko-fi.com">
                </ULink>
            </UPageAside>
        </template>

        <UPageHeader :title="page?.title" />

        <UPageBody class="page-body">
            <ContentRenderer v-if="page" :value="page" />
            <div v-else>
                <p>Page not found</p>
            </div>
        </UPageBody>

        <template #right>
            <UPageAside>
                <UContentToc :links="page?.body?.toc?.links" />
            </UPageAside>
        </template>
    </UPage>

    <SiteFooter />
</template>
