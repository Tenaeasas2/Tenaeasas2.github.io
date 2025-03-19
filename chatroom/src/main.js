import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css'
Vue.config.productionTip = false

Vue.use(element)
Vue.use(Vant)

import { chatCompletion } from './services/api.js'
Vue.prototype.$chatCompletion = chatCompletion

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')