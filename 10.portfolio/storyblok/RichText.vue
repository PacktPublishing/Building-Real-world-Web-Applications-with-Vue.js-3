<script setup lang="ts">
const props = defineProps({
  blok: { type: Object as () => { body: any }, required: true },
});
const richTextBody = computed(() => renderRichText(props.blok.body));
</script>

<template>
  <div v-editable="blok" class="prose">
    <div v-html="richTextBody" />
  </div>
</template>

<style scoped>
.prose {
  line-height: 1.8em;
}
</style>