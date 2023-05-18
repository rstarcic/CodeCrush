import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import HTMLView from '../views/HTMLView.vue'
import CSSView from '../views/CSSView.vue'
import MarkdownView from '../views/MarkdownView.vue'
import JavascriptView from '../views/JavascriptView.vue'
import ProgrammingLanguageView from '../views/ProgrammingLanguageView.vue'

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
    path: '/programming-language',
    name: 'programming-language-view',
    component: ProgrammingLanguageView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
