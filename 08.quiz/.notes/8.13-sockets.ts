import { reactive } from "vue";
import type { Player, QuizQuestion, Answer } from "./types/quiz";
import { io } from "socket.io-client";

const URL: string | Location = process.env.NODE_ENV === "production" ? window.location : "http://localhost:4000";
export const socket = io(URL);

type QuizState = {
    selfId: string,
    connected: boolean,
    consoleEvents: any[],
    players: Player[],
    quizStatus: string,
    quizCurrentQuestion: QuizQuestion,
    quizAnswers: Answer[],
}

export const state: QuizState = reactive({
    selfId: '',
    connected: false,
    consoleEvents: [],
    players: [],
    quizStatus: '',
    quizCurrentQuestion: {
        question: '',
        answers: [],
    },
    quizAnswers: [],
});

socket.on("connect", (): void => {
    state.connected = true;
    state.selfId = socket.id;
});

socket.on("disconnect", (): void => {
    state.connected = false;
});

socket.on("console", (...args: any): void => {
    state.consoleEvents.push(args);
});

socket.on("players:update", (args: Player[]): void => {
    state.players = args;
});

socket.on("quiz:stateChange", (args: string): void => {
    state.quizStatus = args;
})

socket.on("quiz:currentQuestion", (args: QuizQuestion): void => {
    state.quizCurrentQuestion = args;
})

socket.on("quiz:answers", (args: Answer[]): void => {
    state.quizAnswers = args;
})