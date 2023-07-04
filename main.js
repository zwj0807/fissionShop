import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from "uview-ui"
import store from './store'

Vue.use(uView)
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		unit: 'rpx'
	},
})

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif