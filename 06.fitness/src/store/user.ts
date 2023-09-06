import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useSupabaseClient } from '@/composables/supabase'
import router from '@/router'

import type { UserSession } from '@/types/user'

export const useUserStore = defineStore('user', () => {

  const session: Ref<UserSession | null> = ref(null);

  const login = async (email: string, callback?: Function): Promise<void> => {
    const { data, error } = await useSupabaseClient.auth.signInWithOtp({ email });
    if (error) {
      console.error('Login error:', error.message);
      throw new Error('Login failed');
    }
    if (data) {
      setUserSession(data);
    }
    if (typeof callback === 'function') callback();
  }

  const logout = async (callback?: Function): Promise<void> => {
    const { error } = await useSupabaseClient.auth.signOut();
    if (error) {
      console.error('Logout error:', error?.message);
      throw new Error('Logout failed');
    }
    router.push('/login');
    if (typeof callback === 'function') callback();
  }

  const setUserSession = (data: UserSession | any): void => {
    session.value = data;
  }

  const insertProfile = async (session: UserSession | any): Promise<void> => {
    try {
      const { error } = await useSupabaseClient
        .from('profiles')
        .upsert({ id: session.user.id, email_address: session.user.email, updated_at: new Date() })
        .select()
        
        if (error) throw error;
      } catch (error: any) {
      console.error(error.message);
      return error;
    }
  }

  const userIsLoggedIn = computed(() => {
    if (session.value?.expires_at) {
      const expiresAt = new Date(0).setUTCSeconds(session.value.expires_at);
      const now = new Date().getSeconds();
      return now < expiresAt;
    }
    return false
  })

  return { session, userIsLoggedIn, insertProfile, login, logout, setUserSession }
})
