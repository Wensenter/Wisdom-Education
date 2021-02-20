import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export const asyncRoutes = {
  'registrationManagement': {
      path: 'registrationManagement',
      name: 'registrationManagement',
      meta: { title: '校园注册管理' },
      component: () => import('../views/registrationManagement')
  },
  'functionManagement': {
    path: 'functionManagement',
    name: 'functionManagement',
    meta: { title: '产品功能管理' },
    component: () => import('../views/registrationManagement')
  },
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//修复路由重复push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

//重置路由
const createRouter = () => new VueRouter({
  routes: routes,
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
