import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 默认导入是toast下的index.js文件
import toast from 'components/common/toast'
//安装toast插件
Vue.use(toast)

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
