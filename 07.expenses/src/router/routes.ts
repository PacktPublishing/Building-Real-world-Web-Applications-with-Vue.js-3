import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AccountPage.vue') }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/categories',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CategoriesPage.vue') }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/expenses',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ExpensesPage.vue') }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('pages/AuthPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
