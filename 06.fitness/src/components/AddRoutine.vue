<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import type { Routine } from "@/types/fitness";
import SelectExercise from "./SelectExercise.vue";

const emit = defineEmits(["add"]);

const routine: Ref<Routine> = ref({ exercise: "", routines: [] });
const exercise = ref(null);
const weight: Ref<Number> = ref(0);
const repetitions: Ref<Number> = ref(0);

const panel = ref([0]);

const addRow = () => {
  routine.value.routines.push({
    weight: weight.value,
    repetitions: repetitions.value,
  });
};

const removeRow = (index: number) => {
  routine.value.routines.splice(index, 1);
};

const resetForm = () => {
  exercise.value = null;
  weight.value = 0;
  repetitions.value = 0;
};

const add = () => {
  emit("add", routine.value);
  resetForm();
};

watch(exercise, () => {
  routine.value = { exercise: exercise.value, routines: [] };
});
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>Add routine</v-card-title>
      <v-form>
        <v-container>
          <select-exercise v-model="exercise" />
        </v-container>

        <v-expansion-panels v-model="panel" multiple v-if="exercise">
          <v-expansion-panel>
            <v-expansion-panel-title>Add</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="4" sm="5" class="align-center">
                  <v-text-field
                    label="Weight"
                    type="number"
                    autofocus
                    v-model="weight"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" sm="5" class="align-center">
                  <v-text-field
                    label="Reps"
                    type="number"
                    v-model="repetitions"
                  ></v-text-field>
                </v-col>

                <v-spacer />
                <v-col
                  cols="4"
                  sm="2"
                  class="justify-end align-center actionButtons"
                >
                  <v-btn
                    type="submit"
                    color="primary"
                    @click.prevent="addRow"
                    icon="mdi-plus"
                  />
                </v-col>
              </v-row>
            </v-expansion-panel-text> </v-expansion-panel
          ><v-expansion-panel>
            <v-expansion-panel-title
              >Summary

              <template v-slot:actions="{ expanded }">
                <v-badge
                  v-if="routine.routines.length > 0"
                  :content="routine.routines.length"
                  color="error"
                >
                  <v-icon
                    :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  ></v-icon>
                </v-badge>
                <v-icon
                  v-else
                  :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                ></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row v-for="(entry, index) in routine.routines" :key="index">
                <v-col cols="4" sm="5" class="justify-end align-center">
                  {{ entry.weight }}
                </v-col>
                <v-col cols="4" sm="5" class="justify-end align-center">
                  {{ entry.repetitions }}
                </v-col>

                <v-spacer />
                <v-col
                  cols="4"
                  sm="2"
                  class="justify-end align-center actionButtons"
                >
                  <v-btn
                    type="submit"
                    size="x-small"
                    @click.prevent="removeRow(index)"
                    icon="mdi-trash-can-outline"
                  />
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-form>
      <v-card-actions>
        <v-btn
          type="submit"
          block
          size="large"
          color="primary"
          :disabled="routine.routines.length === 0"
          @click.prevent="add"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-row .actionButtons {
  visibility: hidden;
}

.v-row:focus .actionButtons,
.v-row:hover .actionButtons {
  visibility: visible;
}
</style>
