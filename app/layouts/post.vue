<script setup lang="ts">
const route = useRoute(),
    { data: page } = await useAsyncData(route.path, () =>
        queryCollection('content').path(route.path).select('title', 'description', 'meta', 'body').first(), {
        watch: [() => route.path]
    }),
    title = computed(() => page.value?.title as string),
    postDate = computed(() => page.value?.meta.date
        ? new Date(page.value.meta.date as string).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        : ''
    ),
    featuredImage = computed(() => page.value?.meta.featuredImage as string | undefined),
    // Get category from the route path (first segment after /)
    category = route.path.split('/')[1],
    // Get category-aware prev/next navigation
    { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
        // Use the content collection for all surroundings
        return queryCollectionItemSurroundings('content', route.path, {
            fields: ['title', 'description', 'meta']
        })
    }, {
        watch: [() => route.path]
    })

// Set post-specific SEO meta tags
useHead(() => ({
    title: page.value?.title,
    meta: [
        { name: 'description', content: page.value?.description || 'The New Objective is the personal website of Michael L Haufe.' },
        { property: 'og:title', content: page.value?.title || 'The New Objective' },
        { property: 'og:description', content: page.value?.description || 'The New Objective is the personal website of Michael L Haufe.' },
        { property: 'og:url', content: `https://thenewobjective.com${route.path}` },
        { property: 'og:image', content: featuredImage.value ? `https://thenewobjective.com${featuredImage.value}` : 'https://thenewobjective.com/images/icons/android-chrome-512x512.png' },
        ...(page.value?.meta?.date ? [{ property: 'article:published_time', content: page.value.meta.date as string }] : []),
        { property: 'article:author', content: 'Michael L Haufe' },
        ...(category ? [{ property: 'article:section', content: category }] : [])
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
            <UPageAside>
                <SidebarNavigation />
                <USeparator />
                <ULink to="https://brave.com/the327">
                    <img src="/media-library/brave/brave-banner.png" title="Be brave" alt="Be brave">
                </ULink>
            </UPageAside>
        </template>

        <UPageHeader :title="title" :description="postDate" />

        <UPageBody class="page-body">
            <img v-if="featuredImage" :src="featuredImage" :alt="`Featured image for ${title}`"
                class="mb-6 rounded-lg shadow-lg">

            <ContentRenderer :value="page!" />

            <USeparator v-if="surround?.filter(Boolean).length" />

            <UContentSurround :surround="(surround as any)" />

            <PostComments :title="title" />
        </UPageBody>

        <template #right>
            <UPageAside>
                <UContentToc :links="page?.body?.toc?.links" />
            </UPageAside>
        </template>
    </UPage>

    <SiteFooter />
</template>
