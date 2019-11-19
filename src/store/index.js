import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: localStorage.userData ? JSON.parse(localStorage.userData) : '',
  },
  mutations: {
    setUser(state) {
      state.userData = localStorage.userData ? JSON.parse(localStorage.userData) : '';
    },
  },
  actions: {},
  modules: {},
});
