<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import type { Ref } from 'vue'
import { state } from '@/socket'

const timerInterval: Ref<number> = ref(0)
const percLeft: Ref<number> = ref(0)

const timerIsRunning = computed((): boolean => {
  return state.timerIsRunning
})
const timerRunTime = computed((): number => {
  return state.timerRunTime
})

const timerKey = computed((): number => {
  return state.timerKey
})

watch(timerIsRunning, (newStatus, oldStatus) => {
  console.log('timerIsRunning changed from', oldStatus, 'to', newStatus)
  if (newStatus === true) {
    console.log('timer is running')
    calculatePercentageOfTimeLeft(timerRunTime.value)
  }
  if (newStatus === false) {
    console.log('timer is not running')
  }
})

const calculatePercentageOfTimeLeft = (totalMilliseconds: number): void => {
  let currentTime: number = 0
  const interval: number = 200
  timerInterval.value = setInterval((): void => {
    currentTime += interval
    percLeft.value = 100 - parseFloat((currentTime / totalMilliseconds) * 100)
    if (currentTime >= totalMilliseconds) clearInterval(timerInterval.value)
  }, interval)
}

onBeforeMount(() => {
  clearInterval(timerInterval.value)
})
</script>
<template>
  <div class="timer" :key="`timer-${timerKey}`">
    <div class="bar" :style="`width: ${percLeft}%`"
    :class="{ 'bg-warning': percLeft < 30 && percLeft > 15, 'bg-error': percLeft <= 15 }" />
  </div>
</template>

<style scoped>
.timer {
  position: relative;
  width: 100%;
  height: 30px;
}

.bar {
  margin: 0 auto;
  height: 100%;
  background-color: #fff;
  border-radius: 15px;
  transition: all 400ms ease-in-out;
}
</style>
