<script setup lang="ts">
import { useData } from 'vitepress'

const { title } = useData()
</script>

<template>
    <div :key="title" class="giscus">
        <component :is="'script'" src="https://giscus.app/client.js"
            data-repo="thenewobjective/thenewobjective.github.io" data-repo-id="MDEwOlJlcG9zaXRvcnkyNTY4OTk0MjY="
            data-category="General" data-category-id="DIC_kwDOD0_5Ys4CW9Wa" data-mapping="og:title" data-strict="0"
            data-reactions-enabled="1" data-emit-metadata="0" data-input-position="top" data-lang="en"
            data-theme="transparent_dark" data-loading="lazy" crossorigin="anonymous" async />
    </div>
</template>
