<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

import { useCharacterSearch } from "@/composables/marvelApi";
import type { Character } from "@/types/marvel";

import LoadingIndicator from "./LoadingIndicator.vue";
import CharacterCard from "./CharacterCard.vue";
import Pagination from "./Pagination.vue";
import SearchForm from "./SearchForm.vue";

const searchQuery: Ref<string> = ref("");

const isSearching: Ref<boolean> = ref(false);
const data: Ref<Character[] | undefined> = ref();
const currentPage: Ref<number | string> = ref(0);
const totalPages: Ref<number> = ref(0);

const getCharacterSearch = async (query: string, page: number = 0) => {
  if (query !== "") {
    isSearching.value = true;
    searchQuery.value = query;
    const search = await useCharacterSearch(query, page);

    currentPage.value = search?.offset / search?.limit || 0;
    totalPages.value = Math.ceil(search.total / search.limit);

    data.value = search.results;
    isSearching.value = false;
  } else {
    searchReset();
  }
};

const searchReset = (): void => {
  searchQuery.value = "";
  currentPage.value = 0;
  totalPages.value = 0;
  data.value = undefined;
};

const search = (query: string) => {
  getCharacterSearch(query);
};
</script>
