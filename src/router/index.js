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
import LessonPage from '../components/LessonPage.vue'
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
    path: '/html/:title',
    name: 'HTMLLesson',
    component: LessonPage
  },
  {
    path: '/css',
    redirect: '/css/Introduction',
    name: 'css-view',
    component: CSSView
  },
  {
    path: '/css/:title',
    name: 'CSSLesson',
    component: LessonPage
  },
  {
    path: '/markdown',
    redirect: '/markdown/Introduction',
    name: 'markdown-view',
    component: MarkdownView
  },
  {
    path: '/markdown/:title',
    name: 'MarkdownLesson',
    component: LessonPage
  },
  {
    path: '/javascript',
    redirect: '/javascript/Introduction',
    name: 'javascript-view',
    component: JavascriptView
  },
  {
    path: '/javascript/:title',
    name: 'JavaScriptLesson',
    component: LessonPage
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
