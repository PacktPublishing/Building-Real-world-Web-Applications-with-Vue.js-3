// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
            },
            {
                path: '/lobby',
                name: 'lobby',
                component: () => import(/* webpackChunkName: "lobby" */ '../views/Lobby.vue')
            },
            {
                path: '/start/:id',
                name: 'start',
                component: () => import(/* webpackChunkName: "start" */ '../views/Start.vue')
            },
            {
                path: '/question',
                name: 'question',
                component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue')
            },
            {
                path: '/answer',
                name: 'answer',
                component: () => import(/* webpackChunkName: "answer" */ '../views/Answer.vue')
            },
            {
                path: '/scoreboard',
                name: 'scoreboard',
                component: () => import(/* webpackChunkName: "scoreboard" */ '../views/ScoreBoard.vue')
            },
            {
                path: '/final',
                name: 'final',
                component: () => import(/* webpackChunkName: "final" */ '../views/FinalScore.vue')
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router