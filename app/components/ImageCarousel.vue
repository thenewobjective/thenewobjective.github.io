<script setup lang="ts">
const props = defineProps<{
    items: Array<{
        src: string
        alt: string
        caption?: string
    }>
}>()
</script>

<template>
    <UCarousel v-slot="{ item }" arrows dots :items="items" class="w-[90%] mx-auto mb-8" :ui="{ item: 'basis-1/3' }">
        <div class="relative">
            <UPopover mode="click">
                <img :src="item.src" :alt="item.alt" class="w-full object-contain rounded-lg cursor-zoom-in" loading="lazy">
                <template #content>
                    <img :src="item.src" :alt="item.alt" class="max-w-[90vw] max-h-[90vh] p-4">
                </template>
            </UPopover>

            <div v-if="item.caption" class="mt-2">
                <p class="text-center text-sm">{{ item.caption }}</p>
            </div>
        </div>
    </UCarousel>
</template>
