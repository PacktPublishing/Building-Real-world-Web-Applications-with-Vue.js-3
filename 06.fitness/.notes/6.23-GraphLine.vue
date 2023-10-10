<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

import type { GraphData } from "@/types/graph";
import { useGraphStore } from "@/store/graph";

const graphStore = useGraphStore();

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData: Ref<GraphData> = ref({ labels: [], datasets: [] });

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
  <Line
    id="line-chart-id"
    :options="chartOptions"
    :data="chartData"
    v-if="chartData && chartData.datasets"
  />
</template>
