import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useAppStore = defineStore('app', () => {

  const navigateToPage = (page: string): void => {
    router.push(page);
  }

  const dialogVisible: Ref<boolean> = ref(false);

  const dialogTitle: Ref<string> = ref('');
  const dialogMessage: Ref<string> = ref('');

  const showDialog = (title: string, message: string): void => {
    dialogVisible.value = true;
    dialogTitle.value = title;
    dialogMessage.value = message;
  }

  const hideDialog = (): void => {
    dialogVisible.value = false;
    dialogTitle.value = '';
    dialogMessage.value = '';
  }

  return { navigateToPage, dialogVisible, showDialog, hideDialog, dialogTitle, dialogMessage }
})
