import Vue from 'vue'
import App from './App'
//import router from './router.js'
import router from './router/index.js'
import store from './store'
//import ElementUI from 'element-ui'
import './plugins/element.js'




// 引入全局配置文件
//import $conf from './common/config/config.js'
//Vue.prototype.$conf = $conf
import config from './common/config/configer'
Vue.prototype.$config = config

Vue.config.productionTip = false

new Vue({
  router,
  store,
  config,
  render: h => h(App)
}).$mount("#app")
