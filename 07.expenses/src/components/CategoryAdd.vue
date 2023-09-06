<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useCategoriesStore } from 'src/stores/categories';
const categoriesStore = useCategoriesStore();

const showDialog: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const fName: Ref<string> = ref('');
const fColor: Ref<string> = ref('');
const fId: Ref<string> = ref('');

const upsertCategory = async (): Promise<void> => {
  const name: string = fName.value;
  const color: string = fColor.value;
  const id: string | undefined = fId.value === '' ? undefined : fId.value;
  if (name && color) {
    try {
      loading.value = true;
      categoriesStore.upsertCategory({ name, color, id });
    } catch (error: unknown) {
      const { message } = error as Error;
      console.error(message);
    } finally {
      showDialog.value = false;
      loading.value = false;
    }
  }
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
          <div class="text-h6">Add category</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-input
            id="name"
            label="Name"
            type="text"
            v-model="fName"
            :rules="[(val) => !!val || 'Name is required']"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            id="color"
            label="Color"
            v-model="fColor"
            :rules="[(val) => !!val || 'A color is required']"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="fColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-item v-if="fColor">
          <q-item-section :style="{ backgroundColor: fColor }">
            <q-card-section>
              <div class="text-h6">{{ fName }}</div>
            </q-card-section>
          </q-item-section>
        </q-item>
        <q-card-actions class="q-gutter-md" align="center">
          <q-btn
            type="submit"
            color="primary"
            :label="loading ? 'Saving ...' : 'Add Category'"
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
