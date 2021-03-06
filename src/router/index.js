import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login.vue';

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: () => import('../views/dashboard/material'),
      children: [
        {
          path: '/alerts',
          name: 'alerts',
          selectIcon: 'alerts-select',
          component: () => import('../views/alerts'),
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          selectIcon: 'dashboard-select',
          component: () => import('../views/dashboard'),
        },
        {
          path: '/management',
          name: 'management',
          selectIcon: 'management-select',
          component: () => import('../views/management'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
