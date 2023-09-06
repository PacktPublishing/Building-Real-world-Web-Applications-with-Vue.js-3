import { boot } from 'quasar/wrappers';
import { session } from './supabase';

export default boot(({ router }) => {
  router.beforeEach((to) => {
    if (to.matched.some((record) => record.meta.requiresAuth ?? false)) {
      if (!session.value) {
        return { name: 'auth', query: { redirect: to.fullPath } };
      }
    }
  });
});
