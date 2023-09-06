<script setup lang="ts">
import { useRouter } from "vue-router";
import CookingInstructions from "@/components/CookingInstructions.vue";

const router = useRouter();
const recipeId = Number(router.currentRoute.value.params.id);
</script>

<template>
  <cooking-instructions :id="recipeId" :active-panel="1" />
</template>
