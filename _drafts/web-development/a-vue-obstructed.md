Some complaints:

1. css can't reference the custom tag 'feather-icon' as it compiles away.
2. using a class name of the same name for transparency to get around limitation
3. Like #1, also can't reference the attributes as it compiles away as well. thus forced to use redundant class name 

```vue
<style scoped>
.player {
  box-sizing: border-box;
  background-color: brown;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 2in;
}

.player > .feather-icon.play {
  border: 1px solid blue;
}
</style>

<template>
  <article class="player">
    <audio src="/media/bach-test.ogg"></audio>
    <feather-icon icon="skip-back" />
    <feather-icon class="play" icon="play" />
    <feather-icon icon="pause" />
    <feather-icon icon="square" />
    <feather-icon icon="skip-forward" />
    <feather-icon icon="upload" />
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FeatherIcon from './FeatherIcon.vue'

@Component({
  components: { FeatherIcon }
})
export default class Player extends Vue {
  @Prop() private msg!: string;
}
</script>
```