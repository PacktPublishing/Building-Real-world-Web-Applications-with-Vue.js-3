<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { useCategoriesStore } from 'src/stores/categories';
import { useExpensesStore } from 'src/stores/expenses';
import { storeToRefs } from 'pinia';
import type { ExpenseWithCategory } from 'src/types/expenses';

const categoriesStore = useCategoriesStore();
const { categories } = storeToRefs(categoriesStore);

const expensesStore = useExpensesStore();

const loading: Ref<boolean> = ref(true);

onMounted(async () => {
  if (categories.value.length === 0) {
    await getCategories();
  }
});

const getCategories = async () => {
  try {
    loading.value = true;
    categoriesStore.getCategories();
  } catch (error) {
    const { message } = error as Error;
    console.error(message);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="masonry">
    <div class="column masonry-container">
      <div class="hidden flex-break"></div>
      <div class="flex-break"></div>
      <div class="flex-break"></div>
      <div class="flex-break"></div>

      <div
        class="masonry-cell"
        tabindex="0"
        v-for="category in categories"
        :key="category.id"
      >
        <q-card
          clickable
          class="q-ma-sm"
          :style="{ backgroundColor: category.color }"
        >
          <q-card-section>
            <div class="text-h6">{{ category.name }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.masonry {
  .flex-break {
    flex: 1 0 100% !important;
    width: 0 !important;
  }

  $x: 4;

  @for $i from 1 through ($x - 1) {
    .masonry-container > div:nth-child(#{$x}n + #{$i}) {
      order: #{$i};
    }
  }

  .masonry-container > div:nth-child(#{$x}n) {
    order: #{$x};
  }

  .masonry-container {
    height: 700px;

    .masonry-cell {
      width: 25%;
      padding: 1px;
    }
  }
}
</style>
