<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import FormLogin from 'src/components/FormLogin.vue';
import FormSignUp from 'src/components/FormSignUp.vue';

const tab: Ref<'login' | 'sign-up'> = ref('login');
</script>

<template>
  <div class="column items-center justify-center">
    <h1 class="text-h2">Home</h1>
    <q-card class="column">
      <q-tabs
        v-model="tab"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Log in" />
        <q-tab name="sign-up" label="Sign up" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <FormLogin />
        </q-tab-panel>
        <q-tab-panel name="sign-up">
          <FormSignUp />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
