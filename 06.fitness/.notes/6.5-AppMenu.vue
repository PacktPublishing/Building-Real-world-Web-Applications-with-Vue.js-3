<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { useSupabaseClient } from "@/composables/supabase";

import AppMenu from "./components/AppMenu.vue";

const userStore = useUserStore();
onMounted(async () => {
  const { data } = await useSupabaseClient.auth.getSession();

  if (data && data.session) userStore.setUserSession(data.session);

  useSupabaseClient.auth.onAuthStateChange((_, _session) => {
    userStore.setUserSession(_session);
  });
});
</script>

<template>
  <v-app>
    <app-menu />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
