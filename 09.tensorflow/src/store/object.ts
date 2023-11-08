import { ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from "pinia";
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

import config from '@/config';

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

    const detect = async (img: any, className?: string) => {
        try {
            detected.value = []
            const result = await cocoSsdModel.detect(img)
            const filter = className ? (item: DetectedObject) => (item.score >= config.DETECTION_ACCURACY_THRESHOLD && item.class === className) : () => true
            detected.value = result.map((item: DetectedObject) => item).filter(filter).sort((a: DetectedObject, b: DetectedObject) => b.score - a.score)
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

    // Full list of available classes listed as displayName on the following link:
    // https://raw.githubusercontent.com/tensorflow/tfjs-models/master/coco-ssd/src/classes.ts
    // const objects: string[] = ["person", "backpack", "umbrella", "handbag", "tie", "suitcase", "sports ball", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "orange", "broccoli", "carrot", "chair", "couch", "potted plant", "bed", "dining table", "toilet", "tv", "laptop", "remote", "cell phone", "microwave", "oven", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"];
    const objects: string[] = ["person", "toothbrush"];

    return { loadModel, isModelLoading, isModelLoaded, detected, detect, objects }
})