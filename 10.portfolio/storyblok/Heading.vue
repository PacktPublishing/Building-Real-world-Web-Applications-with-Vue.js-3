<template>
  <div v-editable="blok" v-if="blok" class="heading">
    {{ blok.headline }}
  </div>
</template>

<script setup lang="ts">
defineProps({ blok: Object });
</script>
