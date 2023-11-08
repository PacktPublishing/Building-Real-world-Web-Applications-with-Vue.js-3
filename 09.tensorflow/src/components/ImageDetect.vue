<template>
  <v-container>
    <StatusCheckSimple @model-loaded="modelLoaded = true" />
    <v-file-input
      @change="inputFromFile"
      v-model="image"
      accept="image/png, image/jpeg"
      :disabled="!modelLoaded"
    />
    <v-img :src="url" height="100"></v-img>
    <v-btn @click="detectObject">Detect</v-btn>
    <div v-if="detected">
      <v-list>
        <v-list-item v-for="(item, index) in detected" :key="index">
          <v-list-item-title>{{ item.class }} </v-list-item-title>
          <v-list-item-subtitle
            >Confidence
            {{ roundNumber(item.score * 100, 2) }}%</v-list-item-subtitle
          >
        </v-list-item>
      </v-list>
      <TextToSpeech :message="speech" v-if="speech"></TextToSpeech>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";

import StatusCheckSimple from "./StatusCheck.vue";
import TextToSpeech from "./TextToSpeech.vue";

const image: Ref<File | any | undefined> = ref(undefined);
const imageToDetect: Ref<HTMLImageElement | undefined> = ref(undefined);
const url: Ref<string | undefined> = ref(undefined);

const modelLoaded: Ref<boolean> = ref(false);

import { useObjectStore } from "@/store/object";
import { storeToRefs } from "pinia";
const objectStore = useObjectStore();
const { detected } = storeToRefs(objectStore);
const { detect } = objectStore;

const detectObject = async (): Promise<void> => {
  await detect(imageToDetect.value);
};

const inputFromFile = (event: any): void => {
  const file = event.target.files[0];
  image.value = [file];
  imageToDetect.value = dataToImageData(file);
};

const dataToImageData = (dataBlob: Blob | MediaSource): HTMLImageElement => {
  const objUrl = URL.createObjectURL(dataBlob);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(img.src);
  };
  img.src = objUrl;
  url.value = objUrl;
  return img;
};

const roundNumber = (num: number, decimals: number): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

const uniqueObjects = computed(() => {
  return detected.value
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((v) => v.class);
});

const speech = computed(() => {
    const lf = new Intl.ListFormat('en');

    return uniqueObjects.value.length > 0
      ? `I have recognized the following item${
        uniqueObjects.value.length === 1 ? "" : "s"
        } on the image: ${lf.format(uniqueObjects.value)}.`
      : "";
  });
</script>
