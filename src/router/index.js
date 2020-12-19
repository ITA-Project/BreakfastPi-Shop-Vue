import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ProductManagement from '../view/ProductManagement/ProductManagement'
import Home from '../view/Home'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'hello-world',
        name: 'hello-world',
        component: HelloWorld
      }, {
        path: 'product-management',
        name: 'product-management',
        component: ProductManagement
      }
    ]
  }]
})
