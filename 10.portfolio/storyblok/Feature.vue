<script setup lang="ts">
defineProps({ blok: {
  type: Object as () => { name: string, image: any, link: any },
} });
</script>

<template>
  <div v-editable="blok" v-if="blok" class="text-center">
    <ULink :to="blok.link.cached_url">
      <img
        v-if="blok.image"
        :src="blok.image.filename + '/m/200x0'"
        :alt="blok.image.alt"
      />
    </ULink>
    <header class="text-xl">
      {{ blok.name }}
    </header>
  </div>
</template>