<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { supabase } from 'boot/supabase';
import { useRouter } from 'vue-router';

const loading: Ref<boolean> = ref(false);
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const errorMessage: Ref<string> = ref('');

const router = useRouter();

const handleLogin = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    if (data) {
      router.push('/');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      errorMessage.value = error.message;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form class="q-pa-lg column flex-center flex" @submit.prevent="handleLogin">
    <q-card flat>
      <q-card-section class="q-gutter-md">
        <div><p>Sign in with your email address and password</p></div>
        <q-input
          lazy-rules
          :rules="[
            (val, rules) =>
              rules.email(val) || 'Please enter a valid email address',
          ]"
          type="email"
          label="Your email"
          v-model="email"
        />
        <q-input type="password" label="Your password" v-model="password" />
      </q-card-section>
      <p class="text-negative">{{ errorMessage }}</p>
      <q-card-actions class="q-gutter-md justify-center">
        <q-btn
          type="submit"
          color="primary"
          :label="loading ? 'Loading' : 'Log in'"
          :disabled="loading"
        />
      </q-card-actions>
    </q-card>
  </form>
</template>
