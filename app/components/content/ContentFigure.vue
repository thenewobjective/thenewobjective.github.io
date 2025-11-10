<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
    src: string
    alt: string
    caption?: string
    href?: string
}>()

const slots = useSlots()
</script>

<template>
    <figure>
        <UPopover mode="click">
            <img :src="src" :alt="alt" class="mx-auto max-w-lg cursor-zoom-in">
            <template #content>
                <img :src="src" :alt="alt" class="max-w-[90vw] max-h-[90vh] p-4">
            </template>
        </UPopover>
        <figcaption class="text-center">
            <a v-if="href" :href="href" target="_blank">
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
