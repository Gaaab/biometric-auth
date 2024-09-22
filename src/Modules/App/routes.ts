import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/app',
  component: () => import('src/Modules/App/Layout.vue'),
  meta: { auth: true },
  redirect: { name: 'app.dashboard' },
  children: [
    {
      path: '',
      name: 'app.dashboard',
      component: () => import('src/Modules/App/Pages/Dashboard.vue'),
    },
    {
      path: 'profile',
      name: 'app.profile',
      component: () => import('src/Modules/App/Pages/Profile.vue'),
    },
  ],
}

export default route
