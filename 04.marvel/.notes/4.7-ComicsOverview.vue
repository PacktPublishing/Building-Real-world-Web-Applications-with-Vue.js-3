<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import type { Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useComics } from "@/composables/marvelApi";
import type { Comic } from "@/types/marvel";

import LoadingIndicator from "./LoadingIndicator.vue";
import ComicCard from "./ComicCard.vue";
import Pagination from "./Pagination.vue";

const route = useRoute();
const router = useRouter();

// … abbreviated
const getComics = async (page: number = 0) => {
  try {
    isLoading.value = true;
    const comics = await useComics(page);

    currentPage.value = comics?.offset / comics?.limit || 0;
    totalPages.value = Math.ceil(comics.total / comics.limit);

    data.value = comics.results;
    isLoading.value = false;
  } catch (e) {
    router.push("/error");
  }
};

// … abbreviated
</script>
