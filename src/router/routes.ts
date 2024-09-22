import { RouteRecordRaw } from 'vue-router'
import AuthRoutes from 'src/Modules/Auth/routes'
import AppRoutes from 'src/Modules/App/routes'

const routes: RouteRecordRaw[] = []

routes.push(AuthRoutes)
routes.push(AppRoutes)

routes.push({
  path: '/:catchAll(.*)*',
  component: () => import('src/Modules/Error/ErrorNotFound.vue'),
})

export default routes
