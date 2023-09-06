<script setup lang="ts">
import ExpenseAdd from 'src/components/ExpenseAdd.vue';
import CategoryOverview from 'src/components/CategoryOverview.vue';
</script>

<template>
  <q-page class="column items-center justify-center">
    <h1 class="text-h1">Expenses</h1>
    <expense-add />
    <category-overview />
  </q-page>
</template>
