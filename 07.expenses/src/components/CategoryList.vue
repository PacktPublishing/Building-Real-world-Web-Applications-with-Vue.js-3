<script setup>
import { onMounted, ref } from 'vue';
import { useCategoriesStore } from 'src/stores/categories';
import { storeToRefs } from 'pinia';

const categoriesStore = useCategoriesStore();

const { categories } = storeToRefs(categoriesStore);

const loading = ref(true);

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
    console.error(error.message);
  } finally {
    loading.value = false;
  }
};

const removeOwnCategory = async (categoryId) => {
  try {
    loading.value = true;
    categoriesStore.removeCategory(categoryId);
  } catch (error) {
    console.error(error.message);
  } finally {
    getCategories();
    loading.value = false;
  }
};
</script>
<template>
  <q-list dense class="categories">
    <q-item v-for="category in categories" :key="category.id">
      <q-item-section :style="{ backgroundColor: category.color }">
        <q-card-section class="flex row justify-between">
          <div class="text-h6">{{ category.name }}</div>
          <q-btn
            flat
            v-if="category.profile_id"
            @click="removeOwnCategory(category.id)"
          >
            <q-icon name="clear" />
          </q-btn>
        </q-card-section>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped>
.categories {
  min-width: 400px;
  max-width: 80vw;
}
</style>
