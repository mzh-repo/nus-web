import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      component: () => import('../views/dashboard/material'),
      children: [
        {
          path: '/dashboard',
          name: '首页',
          selectIcon: '首页-选中',
          component: () => import(/* webpackChunkName: "dashboard" */ '../views/alerts'),
        },
        {
          path: '/dashboard',
          name: '首页',
          selectIcon: '首页-选中',
          component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard'),
        },
        {
          path: '/dashboard',
          name: '首页',
          selectIcon: '首页-选中',
          component: () => import(/* webpackChunkName: "dashboard" */ '../views/management'),
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  ],
});
