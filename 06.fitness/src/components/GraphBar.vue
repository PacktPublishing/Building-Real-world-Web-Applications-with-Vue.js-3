<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

import type { GraphData } from "@/types/graph";
import { useGraphStore } from "@/store/graph";

const graphStore = useGraphStore();

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
const chartData: Ref<GraphData> = ref({ labels: [], datasets: []});

const chartOptions = {
  responsive: true,
};

onMounted(async () => {
  const res = await graphStore.getGraphMonthlyAverage();
  if (res?.labels && res?.datasets) {
    chartData.value = {
      labels: res.labels,
      datasets: res.datasets,
    };
  }
});
</script>
<template>
  <Bar
    id="bar-chart-id"
    :options="chartOptions"
    :data="chartData"
    v-if="chartData && chartData.datasets"
  />
</template>
