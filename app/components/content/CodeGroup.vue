<script setup lang="ts">
import { useSlots, computed, type VNode } from 'vue'
import type { TabsItem } from '@nuxt/ui'

const slots = useSlots(),
  codeBlocks = computed(() => {
    if (!slots.default) return { items: [], vnodes: [] }

    const children = slots.default(),
      tabs: TabsItem[] = [],
      vnodes: VNode[] = []

    children.forEach((child: VNode) => {
      const idx = children.indexOf(child)

      // Check if it's a code block - could be wrapped in AsyncComponentWrapper
      if (child.props && (child.props.language || child.props.lang)) {
        // This is a code block (possibly wrapped)
        const props = child.props,
          meta = props.meta || props.filename || '',
          language = props.language || props.lang || '',
          filename = props.filename || '',
          // Parse the label from filename or meta (e.g., "[config.js]" or "config.js")
          label = filename || meta.match(/\[([^\]]+)\]/)?.[1] || meta || language || `Tab ${vnodes.length + 1}`

        tabs.push({
          label,
          value: String(vnodes.length),
          slot: `code-${vnodes.length}`
        })

        vnodes.push(child)
        return
      }

      // Fallback: Check if it's a component by type
      if (child.type && typeof child.type === 'object') {
        const componentType = child.type as { __name?: string, name?: string },
          componentName = componentType.__name || componentType.name

        if (componentName === 'ProsePre' || componentName === 'ProseCode') {
          // Extract the language and label from the meta or props
          const props = child.props || {},
            meta = props.meta || props.filename || '',
            language = props.language || props.lang || ''

          // Parse the label from meta (e.g., "[config.js]" or "config.js")
          let label = meta.match(/\[([^\]]+)\]/)?.[1] || meta || language || `Tab ${vnodes.length + 1}`

          // If no explicit label, use filename or language
          if (!label || label === `Tab ${vnodes.length + 1}`)
            label = props.filename || language || `Tab ${vnodes.length + 1}`

          tabs.push({
            label,
            value: String(vnodes.length),
            slot: `code-${vnodes.length}`
          })

          vnodes.push(child)
        }
      }
    })

    return { items: tabs, vnodes }
  })
</script>

<template>
  <UTabs :items="codeBlocks.items" class="code-group">
    <template v-for="(item, index) in codeBlocks.items" :key="item.value" #[`code-${index}`]>
      <component :is="codeBlocks.vnodes[index]" />
    </template>
  </UTabs>
</template>

<style scoped>
.code-group :deep(pre) {
  margin-top: 0 !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
</style>
