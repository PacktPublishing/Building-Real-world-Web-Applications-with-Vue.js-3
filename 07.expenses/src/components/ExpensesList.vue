<script setup lang="ts">
interface Props {
  expenses: {
    id: string;
    description: string;
    amount: number;
    created_at: Date;
  }[];
}

const props = defineProps<Props>();

const formatDate = (date: Date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};
</script>
<template>
  <q-list dense class="expenses" v-if="expenses">
    <q-item v-for="expense in expenses" :key="expense.id">
      <q-item-section>
        <q-card-section class="flex row justify-between">
          <div>{{ expense.description }}</div>
          <div>{{ expense.amount }}</div>
          <div>{{ formatDate(expense.created_at) }}</div>
        </q-card-section>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped>
.expenses {
  min-width: 400px;
  max-width: 80vw;
}
</style>
