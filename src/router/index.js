import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import HTMLView from '../views/HTMLView.vue'
import CSSView from '../views/CSSView.vue'
import MarkdownView from '../views/MarkdownView.vue'
import JavascriptView from '../views/JavascriptView.vue'
import ProfileView from '../views/ProfileView.vue'
import Favorites from '../views/Favorites.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login-view',
    component: LoginView
  },
  {
    path: '/favorites',
    name: '/favorites-view',
    component: Favorites
  },
  {
    path: '/signup',
    name: 'signup-view',
    component: SignUpView
  },
  {
    path: '/html',
    name: 'html-view',
    component: HTMLView
  },
  {
    path: '/css',
    name: 'css-view',
    component: CSSView
  },
  {
    path: '/markdown',
    name: 'markdown-view',
    component: MarkdownView
  },
  {
    path: '/javascript',
    name: 'javascript-view',
    component: JavascriptView
  },
  {
    path: '/javascript/:title',
    name: 'JavaScriptLesson',
  },
  {
    path: '/profile',
    name: 'profile-view',
    component: ProfileView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
