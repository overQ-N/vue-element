import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const City = () => import('views/city/City')
const Msite = () => import('views/msite/Msite')
const Search = () => import('views/search/Search')
const Order = () => import('views/order/Order')
const Profile = () => import('views/profile/Profile')
const Food = () => import('views/food/Food')
Vue.use(VueRouter)

const routes = [
  {
    // 城市列表页
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // 城市搜索页
    path: '/city/:id',
    name: 'City',
    component: City
  },
  {
    // 商铺首页
    path: '/msite',
    component: Msite,
    meta: {
      isTab: true
    }
  },
  {
    // 搜索页面
    path: '/search',
    component: Search,
    meta: {
      isTab: true
    }
  },
  {
    // 订单
    path: '/order',
    component: Order,
    meta: {
      isTab: true
    }
  },
  {
    // 个人中心
    path: '/profile',
    component: Profile,
    meta: {
      isTab: true
    }
  },
  {
    // 食品列表
    path: '/food',
    component: Food
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
