<template>
  <div
    ref="container"
    class="list"
  >
    <badge
      v-for="(item, i) in list"
      :key="i"
      :msg="item"
    />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { eventBus } from '../main';
import Badge from './Badge';

export default {
  name: 'List',
  props: {
    list: { type: Array, required: true },
  },
  components: {
    Badge
  },
  setup() {
    const container = ref(null);

    const scrollToEnd = () => {
      container.value.scroll({
        top: container.value.scrollHeight,
        behavior: 'smooth'
      });
    }

    eventBus.$on('new-message', () => scrollToEnd());

    return {
      container,
      scrollToEnd
    }
  },
};
</script>

<style lang="scss" scoped>
  .list {
    overflow-y: scroll;
    width: 98%;
    z-index: 0;
    padding: 40px;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-button {
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: white;
    }
    &::-webkit-scrollbar-track-piece {
      background-color: white;
      right: 0;
    }
    &::-webkit-scrollbar-thumb {
      height: 100px;
      background-color: lightgray;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-corner {
      background-color: white;
    }
  }
</style>
