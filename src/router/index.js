import Vue from 'vue'
import Router from 'vue-router'
import ProductManagement from '../view/ProductManagement/ProductManagement'
import BasicLayout from '../layout/BasicLayout'
import ShopInfo from '../view/ShopInfo/ShopInfo'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: BasicLayout,
    children: [
      {
        path: 'product-management',
        name: 'product-management',
        component: ProductManagement
      },
      {
        path: 'my-info',
        name: 'my-info',
        component: ShopInfo
      }
    ]
  }]
})
