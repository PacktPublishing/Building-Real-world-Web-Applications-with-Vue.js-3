<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
  maxPagesShown?: number;
  currentPage: number;
  path: string;
}>();

const isOnFirstPage = props.currentPage === 0;
const isOnLastPage = props.currentPage === props.totalPages;
</script>
<template>
    <nav v-if="totalPages > 1" class="flex justify-center my-8">
      <span class="mr-4">
        <RouterLink :to="`${path}`" v-if="!isOnFirstPage">First</RouterLink>
        <span v-else class="opacity-50" aria-hidden="true">First</span>
      </span>
      <span class="mr-4">
        <RouterLink :to="`${path}${ currentPage - 1}`" v-if="!isOnFirstPage">Previous</RouterLink>
        <span v-else class="opacity-50" aria-hidden="true">Previous</span>
      </span>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <span class="ml-4">
        <RouterLink :to="`${path}${ currentPage + 1}`"  v-if="!isOnLastPage">Next</RouterLink>
        <span v-else class="opacity-50" aria-hidden="true">Next</span>
      </span>
      <span class="ml-4">
        <RouterLink :to="`${path}${totalPages - 1}`" v-if="!isOnLastPage">Last</RouterLink>
        <span v-else class="opacity-50" aria-hidden="true">Last</span>
      </span>
    </nav>
</template>
