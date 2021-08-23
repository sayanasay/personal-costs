import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'
import modal from './plugins/Modal'
import popup from './plugins/Popup'

Vue.config.productionTip = false

Vue.use(modal)
Vue.use(popup)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
