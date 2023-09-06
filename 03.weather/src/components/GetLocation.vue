<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

import WeatherReport from "./WeatherReport.vue";

type Geolocation = {
  latitude: number;
  longitude: number;
};

const coords: Ref<Geolocation | undefined> = ref();
const geolocationBlockedByUser: Ref<boolean> = ref(false);

const getGeolocation = async (): Promise<void> => {
  await navigator?.geolocation?.getCurrentPosition(
    async (position: { coords: Geolocation }) => {
      coords.value = position.coords;
    },
    (error: { message: string }) => {
      geolocationBlockedByUser.value = true;
      console.error(error.message);
    }
  );
};

onMounted(async () => {
  await getGeolocation();
});
</script>
<template>
  <WeatherReport v-if="coords && !geolocationBlockedByUser" :coords="coords" />
  <div v-if="geolocationBlockedByUser">User denied access</div>
</template>
