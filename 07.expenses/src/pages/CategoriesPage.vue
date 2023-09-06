<script setup lang="ts">
import CategoryList from 'src/components/CategoryList.vue';
import CategoryAdd from 'src/components/CategoryAdd.vue';
</script>

<template>
  <q-page class="column items-center justify-center">
    <h1 class="text-h1">Categories</h1>
    <category-list />
    <category-add />
  </q-page>
</template>
