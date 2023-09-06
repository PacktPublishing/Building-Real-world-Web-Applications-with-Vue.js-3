// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useSupabaseClient } from '@/composables/supabase'

const loginRoute = { name: 'Login' };
const loggedInRoute = { name: 'Home' };

const loginGuard = async (to: any, from: any, next: Function) => {
  const { data } = await useSupabaseClient.auth.getSession();
  if (data.session) {
    next();
  } else {
    next(loginRoute);
  }
}

const loggedInGuard = async (to: any, from: any, next: Function) => {
  const { data } = await useSupabaseClient.auth.getSession();
  if (data.session) {
    next(loggedInRoute);
  } else {
    next();
  }
}

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
        beforeEnter: loginGuard
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        beforeEnter: loggedInGuard
      },
      {
        path: 'track',
        name: 'Track',
        component: () => import(/* webpackChunkName: "track" */ '@/views/Track.vue'),
        beforeEnter: loginGuard
      },
      {
        path: 'graph',
        name: 'Graph',
        component: () => import(/* webpackChunkName: "graph" */ '@/views/Graph.vue'),
        beforeEnter: loginGuard
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
