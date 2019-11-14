import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: localStorage.Username || '',
    gender: localStorage.Gender || '',
    lastLogin: localStorage.LastLogin || '',
    account: localStorage.Account || '',
    userData: localStorage.userData ? JSON.parse(localStorage.userData) : '',
  },
  mutations: {
    setUser(state) {
      state.username = localStorage.Username;
      state.gender = localStorage.Gender;
      state.lastLogin = localStorage.LastLogin;
      state.account = localStorage.Account;
      state.userData = localStorage.userData ? JSON.parse(localStorage.userData) : '';
    },
  },
  actions: {},
  modules: {},
});
