import Vue from 'vue'
import App from './App'
import httpUnit from './common/httpUnit.js'
import URL from './common/url.config.js'
import myTabbar from '@/components/my-tabBar/my-tabBar.vue'  
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$http = httpUnit
Vue.prototype.$url = URL 
Vue.config.productionTip = false

//注册全局组件  
Vue.component('myTabbar', myTabbar);  
App.mpType = 'app'

const app = new Vue({
	...App,
	//挂载
	store
})
app.$mount()
