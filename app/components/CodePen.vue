<script setup lang="ts">
const { user, id } = defineProps<{ user: string, id: string }>()
</script>

<template>
    <iframe class="codepen" :src="`https://codepen.io/${user}/embed/${id}?height=317&theme-id=dark&default-tab=result`"
        scrolling="no" :title="id" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy"
        referrerpolicy="origin" />
</template>

<style scoped>
.codepen {
    height: 4in;
    width: 100%;
}
</style>
