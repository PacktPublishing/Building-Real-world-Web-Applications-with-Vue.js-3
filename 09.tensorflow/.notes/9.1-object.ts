import { ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from "pinia";
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

type DetectedObject = {
    bbox: [number, number, number, number],
    class: string,
    score: number,
}

let cocoSsdModel: any | undefined = undefined;

export const useObjectStore = defineStore('object', () => {
    const isModelLoaded: Ref<boolean> = ref(false);
    const isModelLoading: Ref<boolean> = ref(false);

    const detected: Ref<DetectedObject[]> = ref([]);

    const detect = async (img: any) => {
        try {
            detected.value = []
            const result = await cocoSsdModel.detect(img)
            detected.value = result.map((item: DetectedObject) => item)
        } catch (e) {
            // handle error if model is not loaded
        }
    };

    const loadModel = async () => {
        if (!cocoSsdModel) {
            isModelLoading.value = true
            cocoSsdModel = await cocoSsd.load()
            isModelLoading.value = false
            isModelLoaded.value = true
        }
    }
    loadModel();

    return { loadModel, isModelLoading, isModelLoaded, detected, detect }
})