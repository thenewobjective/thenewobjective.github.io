<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute(),
    items = computed<NavigationMenuItem[]>(() => [
        { label: 'Resume', to: '/resume', active: route.path === '/resume' },
        { label: 'Publications', to: '/publications', active: route.path === '/publications' },
        { label: 'Connect', to: '/connect', active: route.path === '/connect' },
        { label: 'About', to: '/about', active: route.path === '/about' }
    ]),
    socialItems = computed<NavigationMenuItem[]>(() => [
        { to: '/feed.xml', icon: 'mdi-rss', target: '_blank' },
        { to: 'https://github.com/mlhaufe', icon: 'mdi-github', target: '_blank' },
        { to: 'https://x.com/mlhaufe', icon: 'mdi-twitter', target: '_blank' },
        { to: 'https://mastodon.social/@mlhaufe', icon: 'mdi-mastodon', target: '_blank' },
        { to: 'https://www.linkedin.com/in/michaelhaufe/', icon: 'mdi-linkedin', target: '_blank' },
        { to: 'https://www.instagram.com/mlhaufe/', icon: 'mdi-instagram', target: '_blank' }
    ])
</script>

<template>
    <UHeader title="The New Objective">
        <template #title>
            <img src="/images/icons/icon.png" alt="The New Objective Logo" class="inline-block h-8 w-8 mr-2 rounded-md">
            The New Objective
        </template>

        <UNavigationMenu :items="items" />

        <template #right>
            <UContentSearchButton :collapsed="false" />

            <UColorModeSwitch />

            <UNavigationMenu :items="socialItems" />
        </template>
    </UHeader>
</template>
