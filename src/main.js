import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import echart from 'echarts';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './libs/api';
import './assets/icons';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$echart = echart;
Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    const token = localStorage.getItem('Authorization');
    if (!token || token === 'null' || token === '') {
      next('/login');
    }
    next();
  }
});
