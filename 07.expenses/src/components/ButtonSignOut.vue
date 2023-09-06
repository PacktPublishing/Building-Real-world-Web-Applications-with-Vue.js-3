<script setup lang="ts">
import { supabase } from 'src/boot/supabase';
import { useRouter } from 'vue-router';
const router = useRouter();
const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    router.go(0);
  }
};
</script>

<template>
  <q-btn @click="signOut()">Sign out</q-btn>
</template>
