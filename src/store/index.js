import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import order from './modules/order'
import createPersisedState from 'vuex-persistedstate'
// import './actions'
// import './getters'
// import './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createPersisedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    order
  }
})
