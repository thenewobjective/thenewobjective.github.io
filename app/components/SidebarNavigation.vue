<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute(),
    { data: categoryIndexes } = await useAsyncData('category-indexes', () =>
        queryCollection('categoryIndexes').select('path', 'title').all()
    ),
    { data: allContent } = await useAsyncData('allContent', () =>
        queryCollection('content').select('path', 'title', 'description', 'meta').all()
    ),
    menuItems = computed<NavigationMenuItem[]>(() => {
        const items = (categoryIndexes?.value ?? []).map((category) => {
            const categoryName = category.path.replace('/', ''),
                categoryPages = allContent.value!
                    .filter(page =>
                        page.path.startsWith(`/${categoryName}/`) &&
                        page.path !== category.path
                    ),
                children = categoryPages
                    .slice()
                    // eslint-disable-next-line max-params
                    .sort((sortA, sortB) => sortA.title.localeCompare(sortB.title))
                    .map(page => ({
                        label: page.title,
                        to: page.path,
                        description: page.description || ''
                    }))

            return {
                label: category.title,
                to: category.path,
                icon: getIconForCategory(categoryName),
                children: children.length > 0 ? children : undefined,
                defaultOpen: route.path.startsWith(`/${categoryName}/`) || route.path === category.path
            }
        })

        return items
            .slice()
            // eslint-disable-next-line max-params
            .sort((sortA, sortB) => sortA.label.localeCompare(sortB.label))
    })

function getIconForCategory(categoryName: string): string {
    const iconMap: Record<string, string> = {
        astrobiology: 'i-lucide-telescope',
        dreamwork: 'i-lucide-moon',
        graphicsProgramming: 'i-lucide-image',
        humanityVsNature: 'i-lucide-trees',
        mindscape: 'i-lucide-brain',
        music: 'i-lucide-music',
        requirementsEngineering: 'i-lucide-clipboard-list',
        socialIssues: 'i-lucide-users',
        softwareSystemsEngineering: 'i-lucide-code',
        systemAdministration: 'i-lucide-server',
        typesAndProgrammingLanguages: 'i-lucide-terminal',
        uncategorized: 'i-lucide-folder',
        usmc: 'i-lucide-shield',
        warAndPeace: 'i-lucide-scroll-text',
        webDevelopment: 'i-lucide-globe'
    }

    return iconMap[categoryName] || 'i-lucide-folder'
}
</script>

<template>
    <UNavigationMenu orientation="vertical" :items="menuItems" :highlight="true" class="sidebar-navigation w-full" />
</template>
