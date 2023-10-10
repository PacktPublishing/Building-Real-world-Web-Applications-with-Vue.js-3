<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import { useSupabaseClient } from "@/composables/supabase";

import AppMenu from "./components/AppMenu.vue";

const userStore = useUserStore();
const appStore = useAppStore();

const { dialog } = storeToRefs(appStore);

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
      <v-dialog v-model="dialog.visible" :fullscreen="dialog.fullscreen">
        <v-card>
          <v-card-title>{{ dialog.title }}</v-card-title>
          <v-card-text><p v-html="dialog.contents"></p> </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="appStore.hideDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>
