<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-btn
        @click="restart"
        x-large
        color="secondary"
        v-if="ended"
      >
        Restart
      </v-btn>
    </v-app-bar>
    <v-content>
      <list
        class="list-container"
        :list="messages"
      />
      <controlers
        :button-text="started  ? 'Send Message' : `Let's chat`"
        :disabled-field="!started || ended"
        :disabled-button="ended"
        v-model="text"
        @message="started ? send() : startChat()"
      />
    </v-content>
  </v-app>
</template>

<script>
import { useGetters, useActions, useMutations } from 'vuex-composition-helpers';
import { ref, watch } from '@vue/composition-api';
import { eventBus } from './main';
import List from './components/List';
import Controlers from './components/Controlers';

export default {
  name: 'App',
  components: {
    List,
    Controlers,
  },
  setup() {
    const text = ref('');

    const { messages, started, ended } = useGetters({
      messages: 'messages',
      started: 'started',
      ended: 'ended'
    })

    const { sendMessage, getMessages, getAllMessages } = useActions({
      sendMessage: 'sendMessage',
      getMessages: 'getMessages',
      getAllMessages: 'getAllMessages',
    })

    const { start, restart } = useMutations({
      start: 'start',
      restart: 'cleanState'
    });

    const send = () =>  {
      sendMessage({
        text: text.value,
        owner: 'me'
      })
      text.value = ''
    }

    const startChat = () => {
      start();
      getAllMessages();
    }

    watch(messages, () => eventBus.$emit('new-message'));

    eventBus.$on('typed',() => getMessages());

    return {
      text,
      messages,
      send,
      startChat,
      started,
      ended,
      restart
    }
  },
};
</script>

<style lang="scss">
  html, body {
    height: 100vh;
    overflow: hidden!important;
    font-family: Helvetica, Arial, sans-serif;
  }
  .list-container {
    height: calc(100vh - 200px);
  }
</style>
