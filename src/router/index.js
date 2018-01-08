import Vue from 'vue'
import Router from 'vue-router'
const Home = reslove => require(['../pages/Home/Home.vue'],reslove)
const Cart = reslove => require(['../pages/Cart/Cart.vue'],reslove)
const Category = reslove => require(['../pages/Category/Category.vue'],reslove)
const Mine = reslove => require(['../pages/Mine/Mine.vue'],reslove)


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/category',
      component: Category
    },
    {
      path:'/mine',
      component: Mine
    }
  ]
})
