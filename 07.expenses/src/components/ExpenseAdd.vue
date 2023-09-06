<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';

import { useCategoriesStore } from 'src/stores/categories';
import { useExpensesStore } from 'src/stores/expenses';
import { storeToRefs } from 'pinia';

const categoriesStore = useCategoriesStore();
const { categories } = storeToRefs(categoriesStore);

const expensesStore = useExpensesStore();

const showDialog: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const fCategoryName: Ref<string> = ref('');
const fAmount: Ref<number> = ref(0);
const fDescription: Ref<string> = ref('');

const categorieValues = computed(() =>
  categories.value.map((c: { name: string }) => c.name)
);

const fCategoryId = computed(() => {
  const category = categories.value.find(
    (c: { name: string }) => c.name === fCategoryName.value
  );
  return category ? category.id : '';
});

const upsertCategory = async () => {
  if (fCategoryId.value && fAmount.value && fDescription.value) {
    try {
      loading.value = true;
      expensesStore.upsertExpense({
        category_id: fCategoryId.value,
        amount: fAmount.value,
        description: fDescription.value,
      });
    } catch (error: unknown) {
      const { message } = error as Error;
      console.error(message);
    } finally {
      resetForm();
      showDialog.value = false;
      loading.value = false;
    }
  }
};

const resetForm = () => {
  fCategoryName.value = '';
  fAmount.value = 0;
  fDescription.value = '';
};
</script>
<template>
  <q-dialog v-model="showDialog" no-backdrop-dismiss>
    <q-card class="q-py-md">
      <form
        class="q-pa-md column flex-center flex"
        @submit.prevent="upsertCategory"
      >
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add expense</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-input
            id="amount"
            label="Amount"
            type="number"
            min="0"
            step="any"
            v-model="fAmount"
            :rules="[(val) => val > 0 || 'Amount must be greater than 0']"
          />
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="fCategoryName"
            :options="categorieValues"
            label="Please select a category"
            :rules="[(val) => val > 0 || 'A category is required']"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            id="description"
            label="Description"
            type="text"
            v-model="fDescription"
            :rules="[(val) => !!val || 'Description is required']"
          />
        </q-card-section>
        <q-card-actions class="q-gutter-md" align="center">
          <q-btn
            type="submit"
            color="primary"
            :label="loading ? 'Saving ...' : 'Add Expense'"
            :disabled="loading"
          />
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="accent" @click="showDialog = true" />
  </q-page-sticky>
</template>

<style scoped>
form > div {
  min-width: calc(400px - 32px);
  max-width: 80vw;
}
</style>
