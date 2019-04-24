// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'vue-image-swipe/dist/vue-image-swipe.css'
import 'vue-blu/dist/css/vue-blu.min.css'
import VueBlu from 'vue-blu'
import ElementUI from 'element-ui'
import '../theme/index.css'
import VueImageSwipe from 'vue-image-swipe'

import store from './store'
import axios from 'axios';
import router from './router'
import App from './App'



//import 'element-ui/lib/theme-chalk/index.css'




Vue.use(VueBlu)
Vue.use(ElementUI)
Vue.use(VueImageSwipe)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
