import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const City = () => import('views/city/City')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/city/:id',
    name: 'City',
    component: City
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
