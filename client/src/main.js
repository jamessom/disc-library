import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import { securedAxiosInstance, plainAxiosInstance } from './services/api';
import './assets/css/main.css';

Vue.config.productionTip = false;

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: '<App/>',
});
