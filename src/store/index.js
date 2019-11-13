import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: localStorage.Username || '',
    gender: localStorage.Gender || '',
    lastLogin: localStorage.LastLogin || '',
  },
  mutations: {
    setUser(state) {
      state.username = localStorage.Username;
      state.gender = localStorage.Gender;
      state.lastLogin = localStorage.LastLogin;
    },
  },
  actions: {},
  modules: {},
});
