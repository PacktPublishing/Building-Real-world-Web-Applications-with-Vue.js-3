<script setup lang="ts">
// import AppMenu from "@/components/AppMenu.vue";
</script>

<template>
  <v-layout>
    <!-- <AppMenu /> -->
    <v-container class="main">
      <main>
        <router-view />
      </main>
    </v-container>
    <v-footer app><span class="text-light-green">My Meal Planner</span>&nbsp;- &copy; {{ new Date().getFullYear() }}</v-footer>
  </v-layout>
</template>

<style scoped>
/* .main {
  margin: 80px auto 40px;
} */
</style>
