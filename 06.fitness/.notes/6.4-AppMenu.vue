<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const { userIsLoggedIn } = storeToRefs(userStore);
</script>

<template>
  <v-list dense v-if="userIsLoggedIn">
    <v-list-item @click="userStore.logout()">
      <template v-slot:prepend>
        <v-icon icon="mdi-account-arrow-right"></v-icon>
      </template>
      <v-list-item-title>Log out</v-list-item-title>
    </v-list-item>
  </v-list>
  <v-list dense v-else>
    <v-list-item>
      <template v-slot:prepend>
        <v-icon icon="mdi-account"></v-icon>
      </template>
      <router-link to="/login">
        <v-list-item-title>Login</v-list-item-title>
      </router-link>
    </v-list-item>
  </v-list>
</template>
