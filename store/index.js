import Vue from "vue"
import Vuex from 'vuex'
import userInfo from './modules/user-info.js'
import setHistorySearch from './modules/save-history-search.js'
import setlabelList from './modules/label.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules:{
		userInfo,
		setHistorySearch,
		setlabelList,
	},
})
export default store