import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueCompositionApi from './plugins/VueCompositionApi';
import store from './store';

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  vuetify,
  VueCompositionApi,
  store,
  render: h => h(App)
}).$mount('#app')
