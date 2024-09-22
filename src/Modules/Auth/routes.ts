import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/',
  component: () => import('src/Modules/Auth/Layout.vue'),
  meta: { redirectGuest: true },
  redirect: { name: 'auth.login' },
  children: [
    {
      path: 'login',
      name: 'auth.login',
      component: () => import('src/Modules/Auth/Pages/Login.vue'),
    },
  ],
}

export default route
