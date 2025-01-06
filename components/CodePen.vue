<script setup>
const { user, id } = defineProps(['user', 'id'])
</script>

<template>
    <iframe :src="`https://codepen.io/${user}/embed/${id}?height=317&theme-id=dark&default-tab=result`" scrolling="no"
        :title="id" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy"
        referrerpolicy="origin"></iframe>
</template>

<style scoped>
.codepen {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    overflow: hidden;

    & iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
