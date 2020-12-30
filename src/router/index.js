import Vue from 'vue'
import Router from 'vue-router'
import ProductManagement from '../view/ProductManagement/ProductManagement'
import BasicLayout from '../layout/BasicLayout'
import ShopInfo from '../view/ShopInfo/ShopInfo'
import OrderInfo from '../view/OrderInfo/OrderInfo'
import Login from '../view/Auth/Login'

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    name: 'home',
    component: BasicLayout,
    children: [
      {
        path: '/order-info',
        name: 'order-info',
        component: OrderInfo
      },
      {
        path: '/product-management',
        name: 'product-management',
        component: ProductManagement
      },
      {
        path: '/my-info',
        name: 'my-info',
        component: ShopInfo
      }
    ]
  }]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || sessionStorage.getItem('token')) {
    next()
  } else {
    next({name: 'login', replace: true})
  }
})

export default router
