<script setup lang="ts">
const { id } = defineProps<{ id: string }>()
</script>

<template>
    <article class="youtube">
        <iframe :src="`https://www.youtube.com/embed/${id}`" frameborder="0" allowfullscreen />
    </article>
</template>

<style scoped>
.youtube {
    position: relative;
    padding-bottom: 56.25%;

    padding-top: 30px;
    height: 0;
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
