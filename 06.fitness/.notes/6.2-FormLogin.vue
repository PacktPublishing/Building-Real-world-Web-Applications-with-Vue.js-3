<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const showDialog: Ref<boolean> = ref(false);
const email: Ref<string> = ref("");

const login = () => {
  userStore.login(email.value);
  showDialog.value = true;
};

const resetForm = () => {
  showDialog.value = false;
};
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            autofocus
          ></v-text-field>
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" fullscreen>
      <v-card>
        <v-card-title>One Time Password login</v-card-title>
        <v-card-text
          ><p>
            We've sent a one time password login the the following email
            address: <strong>{{ email }}</strong
            >. Using the link in the email, you can proceed to the app and you
            can close this browser window.
          </p>
          <p>
            If this is not the correct email address, please try again.
          </p></v-card-text
        >
        <v-card-actions>
          <v-btn color="primary" @click="resetForm">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
