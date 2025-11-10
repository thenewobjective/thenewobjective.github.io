<script setup lang="ts">
import type { TimelineItem } from '#ui/types'

defineProps<{
  items: TimelineItem[]
}>()
</script>

<template>
  <UTimeline :items="items" orientation="vertical">
    <!-- Pass through all named slots -->
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </UTimeline>
</template>
