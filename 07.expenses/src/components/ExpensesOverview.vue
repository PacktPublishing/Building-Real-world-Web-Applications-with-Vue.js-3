<script setup lang="ts">
import { computed } from 'vue';
import { useExpensesStore } from 'src/stores/expenses';
import { storeToRefs } from 'pinia';
import { Expense } from 'src/types/expenses';

const expensesStore = useExpensesStore();

const { expenses } = storeToRefs(expensesStore);

interface Props {
  categoryId: string;
}

const props = defineProps<Props>();

const totalPerCategory = computed(() => {
  return expenses.value.filter(
    (expense: Expense) => expense.category_id === props.categoryId
  );
});
</script>

<template>
  <q-card-section>
    Total:
    {{ totalPerCategory }}
  </q-card-section>
</template>
