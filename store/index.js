import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
		token:''
	},
	mutations: {	
		setToken(state, val){
			state.token = val;
		}
	},
	actions: {
		actionSetToken({commit},val){
			commit('setToken',val);
		}
	}
})

export default store