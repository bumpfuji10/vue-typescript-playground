import { createRouter, createWebHistory } from 'vue-router'
import Home  from '../views/pages/Home.vue'
import About from '../views/pages/About.vue'
import ArticleShow from '../views/pages/ArticleShow.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/articles/:id',
      name: 'ArticleShow',
      component: ArticleShow,
      props: true
    },
  ]
})

export default router
