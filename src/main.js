import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'plugins/vant'
import 'assets/style/variable.less'
import Fastclick from 'fastclick'
Fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
