<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { Routine } from "@/types/fitness";
import { VDatePicker } from "vuetify/labs/VDatePicker";

import { useFitnessStore } from "@/store/fitness";
const fitnessStore = useFitnessStore();

import { useAppStore } from "@/store/app";
const appStore = useAppStore();

const showDialogDate: Ref<boolean> = ref(false);
const selectedDate: Ref<any[] | undefined> = ref(undefined);

const formattedDate: Ref<string> = computed(() => {
  if (selectedDate?.value?.length) {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(selectedDate.value[0]);
  }
  return "";
});

import AddRoutine from "./AddRoutine.vue";
import ExerciseGrouping from "./ExerciseGrouping.vue";

const routines: Ref<Routine[]> = ref([]);
const showDialogRoutine: Ref<boolean> = ref(false);

const addRoutineToExercise= (newRoutine: any) => {
  showDialogRoutine.value = false;
  routines.value.push(newRoutine);
};

const canSaveWorkout = computed(() => {
  return routines.value.length > 0;
});

const reset = () => {
  routines.value = [];
  selectedDate.value = undefined;
};

const saveWorkout = () => {
  if (selectedDate.value && routines.value?.length > 0) {
    fitnessStore.saveWorkout({
      date: selectedDate.value,
      routines: routines.value,
    });
    appStore.showDialog({
      title: "Success",
      contents: "Workout saved successfully",
    });
    reset();
  } else {
    appStore.showDialog({
      title: "Error",
      contents: "Please select a date and add at least one routine",
    });
  }
};
</script>
<template>
  <v-container>
    <v-row class="mb-6 align-center justify-space-between">
      <v-btn @click="showDialogDate = true">
        <span v-if="selectedDate">Change date</span>
        <span v-else>Select date</span>
      </v-btn>
      <h4 class="text-h5">{{ formattedDate }}</h4>

      <v-dialog v-model="showDialogDate" center>
        <v-date-picker
          v-model="selectedDate"
          show-adjacent-months
          @click:cancel="showDialogDate = false"
          @click:save="showDialogDate = false"
          style="margin: 0 auto"
        ></v-date-picker>
      </v-dialog>
    </v-row>
    
    <exercise-grouping
        :key="index"
        v-for="(row, index) in routines"
        :exercise-id="row.exercise || 'Unknown'"
        :routines="row?.routines"
        class="mb-6"
      />

    <v-row class="mb-6">
      <v-btn
        block
        size="x-large"
        @click="showDialogRoutine = true"
        v-if="selectedDate"
      >
        Add routine
      </v-btn>
      <v-dialog v-model="showDialogRoutine" fullscreen>
        <v-card>
          <v-card-text>
            <add-routine @add="addRoutineToExercise" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="showDialogRoutine = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row class="mb-6">
      <v-btn
        block
        size="x-large"
        :disabled="!canSaveWorkout"
        @click="saveWorkout"
        v-if="selectedDate"
        >Save workout</v-btn
      >
    </v-row>
  </v-container>
</template>
