import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog'
import Good from '../views/Good'
import Register from '../views/Register'
import LogIn from '../views/LogIn'
import PersonalArea from '../views/user/PersonalArea'
import PostLayout from '../views/posts/PostLayout'
import List from '../views/posts/List'
import PostPage from '../views/posts/PostPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/shop',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/good',
    name: 'Good',
    component: Good
  },
  {
    path: '/user',
    name: 'PersonalArea',
    component: PersonalArea,
    props: true
  },
  {
    path: '/posts',
    component: PostLayout,
    children: [
      {
        path: '',
        name: 'Posts',
        component: List
      },
      {
        path: ':id',
        name: 'PostPage',
        component: PostPage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
