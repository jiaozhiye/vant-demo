/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 09:24:43
 */
import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import '@/config/use';
import '@/router/permission';

import App from './app';

// 关闭生产环境的提示
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
