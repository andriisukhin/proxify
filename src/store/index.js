import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

const URL = '/mockData/messages.json';

Vue.use(Vuex);

export default function () {
  const store = new Vuex.Store({
    state: {
      msgIndex: 0,
      allMessages: null,
      messages: [],
      questionMode: false,
      started: false,
      ended: false,
    },
    getters: {
      messages({ messages }) {
        return messages;
      },
      started({ started }) {
        return started;
      },
      ended({ ended }) {
        return ended;
      },
      lastMessage(state) {
        return state.msgIndex === state.allMessages.length;
      }
    },
    mutations: {
      setAllMessages(state, payload) {
        state.allMessages = payload;
      },
      setMessages(state, payload) {
        state.messages.push(payload);
      },
      setMsgIndex(state) {
        state.msgIndex++;
      },
      setQuestionMode(state, payload) {
        state.questionMode = payload;
      },
      start(state) {
        state.started = true;
      },
      end(state) {
        state.ended = true;
      },
      cleanState(state) {
        state.msgIndex = 0;
        state.messages = [];
        state.allMessages = null;
        state.questionMode = false;
        state.started = false;
        state.ended = false;
      }
    },
    actions: {
      async getAllMessages({ commit, dispatch }) {
        const data = await axios.get(URL);
        commit('setAllMessages', data.data.messages);
        dispatch('getMessages');
      },
      getMessages({ state, commit, getters }) {
        if (getters.lastMessage) {
          commit('end');
          return;
        }
        if (state.questionMode) return;
        const msg = state.allMessages.slice(state.msgIndex, state.msgIndex + 1)[0];
        commit('setMessages', msg);
        commit('setMsgIndex');
        commit('setQuestionMode', msg.ask ? true : false);
      },
      sendMessage({ commit }, payload) {
        commit('setMessages', payload);
        commit('setQuestionMode', false);
      }
    }
  });
  return store;
}