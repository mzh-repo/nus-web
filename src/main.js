import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echart from 'echarts';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './libs/api';
import './assets/icons';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$echart = echart;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (
    to.path === '/login'
    || to.path === '/alerts'
    || to.path === '/dashboard'
    || to.path === '/management'
  ) {
    next();
  } else {
    next('/alerts');
  }
});
