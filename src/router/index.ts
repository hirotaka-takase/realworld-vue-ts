import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/setting',
    name: 'setiing',
    component: () => import('@/views/Setting.vue'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/Editor.vue'),
  },
  {
    path: '/@:username',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
