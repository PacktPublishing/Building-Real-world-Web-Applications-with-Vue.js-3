<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const errorMessage: Ref<string> = ref("");

onMounted((): void => {
  errorMessage.value = route.query.info as string;
});
</script>
<template>
  <article
    class="p-4 mx-4 my-24 bg-white rounded-lg shadow-xl place-content-center text-slate-800"
  >
    <header>
      <h1 class="pb-5 text-lg font-semibold">Oops! 🫢</h1>
    </header>
    {{ errorMessage }}
  </article>
</template>
