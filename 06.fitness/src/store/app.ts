// Utilities
import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

interface DialogOptions {
  title: string;
  contents: string | HTMLElement;
  fullscreen?: boolean;
}

interface Dialog extends DialogOptions {
  visible: boolean;
}

export const useAppStore = defineStore('app', () => {

  const drawer: Ref<boolean> = ref(false);

  const toggleDrawer = (newValue?: boolean): void => {
    if (typeof newValue === 'boolean') {
      drawer.value = newValue;
    } else {
      drawer.value = !drawer.value;
    }
  }

  const pageTitle: Ref<string> = ref('Home');

  const navigateToPage = (page: string): void => {
    const title: string = page.slice(1).charAt(0).toUpperCase() + page.slice(2)
    pageTitle.value = title || 'Home';
    toggleDrawer(false);
    router.push(page);
  }

  const dialog: Ref<Dialog> = ref({
    title: '',
    contents: '',
    visible: false,
    fullscreen: false,
  });

  const showDialog = (options: DialogOptions = { title: '', contents: '' }): void => {
    dialog.value = { ...options, visible: true };
  }

  const hideDialog = (): void => {
    dialog.value = {
      title: '',
      contents: '',
      visible: false,
      fullscreen: false,
    };
  }

  return { drawer, pageTitle, toggleDrawer, navigateToPage, dialog, showDialog, hideDialog }
})

