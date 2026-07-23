<script setup lang="ts">
import { useSlots, computed } from 'vue'

const props = withDefaults(defineProps<{
    src: string
    alt: string
    caption?: string
    href?: string
    zoom?: boolean
}>(), {
    zoom: true
})

const slots = useSlots()
const isSvg = computed(() => props.src.endsWith('.svg'))
const hasCaption = computed(() => !!(props.caption || slots.default))
</script>

<template>
    <figure class="my-5">
        <ProseImg :src="src" :alt="alt" :zoom="zoom" :class="isSvg ? 'max-w-[900px]' : 'max-w-lg'" />
        <figcaption v-if="hasCaption" class="text-center text-sm text-muted mt-2">
            <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer" class="hover:underline">
                <slot v-if="slots.default" />
                <template v-else>{{ caption }}</template>
            </a>
            <template v-else>
                <slot v-if="slots.default" />
                <span v-else>{{ caption }}</span>
            </template>
        </figcaption>
    </figure>
</template>
