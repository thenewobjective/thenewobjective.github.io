<script setup>
const { user, id } = defineProps(['user', 'id'])
</script>

<template>
    <iframe class="codepen" :src="`https://codepen.io/${user}/embed/${id}?height=317&theme-id=dark&default-tab=result`"
        scrolling="no" :title="id" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy"
        referrerpolicy="origin"></iframe>
</template>

<style scoped>
.codepen {
    height: 4in;
    width: 100%;
}
</style>
