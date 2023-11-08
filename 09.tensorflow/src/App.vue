<template>
  <v-app>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
      <v-dialog v-model="dialogVisible" width="auto">
        <v-card>
          <v-card-title>{{ dialogTitle }}</v-card-title>
          <v-card-text
            ><div v-html="dialogMessage" />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="appStore.hideDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
const appStore = useAppStore();
const { dialogVisible, dialogTitle, dialogMessage } = storeToRefs(appStore);
</script>
