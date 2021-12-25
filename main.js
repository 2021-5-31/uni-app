import App from './App'
import module from './ajax/api/index.js'
import rulesMixin from './common/rulesMixin/index.js'
import saveLikeMixin from './common/saveLikeMixin/index.js'
import store from './store/index.js'
import {router,RouterMount} from './router.js'  //路径换成自己的


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$api = module
Vue.use(rulesMixin)
Vue.use(saveLikeMixin)
Vue.use(router)
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

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