import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: () => import('../views/LobbyView.vue')
    },
    {
      path: '/start/:id',
      name: 'start',
      component: () => import('../views/StartView.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('../views/QuestionView.vue')
    },
    {
      path: '/answer',
      name: 'answer',
      component: () => import('../views/AnswerView.vue')
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: () => import('../views/ScoreBoardView.vue')
    },
    {
      path: '/final',
      name: 'final',
      component: () => import('../views/FinalScoreView.vue')
    },
  ]
})

export default router
