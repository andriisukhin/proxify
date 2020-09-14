<template>
  <div
    class="badge"
    :class="msg.owner"
  >
    <vue-typed-js
      :strings="[msg.text]"
      :showCursor="false"
      @onComplete="complete"
    >
      <span class="typing"/>
    </vue-typed-js>
  </div>
</template>

<script>
import { VueTypedJs } from 'vue-typed-js';
import { eventBus } from '../main';

export default {
  name: 'Badge',
  components: {
    VueTypedJs
  },
  props: {
    msg: { type: Object, required: true }
  },
  setup() {
    const complete = () => {
      eventBus.$emit('typed');
    }
    return {
      complete
    }
  }
};
</script>

<style lang="scss" scoped>
  .badge {
    display: inline-block;
    clear: both;
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 2px;
  }

  .him {
    background: #eee;
    float: left;
    & + .me {
      border-bottom-right-radius: 5px;
    }
  }

  .me {
    float: right;
    background: #0084ff;
    color: #fff;
    & + .me {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    &:last-of-type {
      border-bottom-right-radius: 30px;
    }
  }
  
</style>
