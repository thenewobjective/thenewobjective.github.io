<script setup lang="ts">
// Shared page shell: header, left sidebar, right table-of-contents, and footer.
// The default slot renders the page's center column content.
// Pages publish their TOC links via usePageToc() (see ~/composables/pageToc).
const tocLinks = usePageToc()
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

        <slot />

        <template #right>
            <UPageAside>
                <UContentToc v-if="tocLinks?.length" :links="tocLinks" />
            </UPageAside>
        </template>
    </UPage>

    <SiteFooter />
</template>
