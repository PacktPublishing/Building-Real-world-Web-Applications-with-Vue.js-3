import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    selfId: '',
    connected: false,
    consoleEvents: [],
    welcomeEvents: [],
    players: [],
    quizStatus: null,
    quizCurrentQuestion: {
        question: '',
        answers: [],
    },
    quizAnswers: [],
    quizScoreboard: [],
    timerRunTime: 0,
    timerIsRunning: false,
    timerKey: 0,
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io(URL);

socket.on("connect", () => {
    state.connected = true;
    state.selfId = socket.id;
});

socket.on("disconnect", () => {
    state.connected = false;
});

socket.on("console", (...args) => {
    state.consoleEvents.push(args);
});

socket.on("welcome", (...args) => {
    state.welcomeEvents.push(args);
});

socket.on("players:update", (args) => {
    state.players = args;
});

socket.on("quiz:stateChange", (args) => {
    state.quizStatus = args;
})

socket.on("quiz:currentQuestion", (args) => {
    state.quizCurrentQuestion = args;
})

socket.on("quiz:answers", (args) => {
    state.quizAnswers = args;
})

socket.on("quiz:scoreboard", (args) => {
    state.quizScoreboard = args;
})

socket.on("timer:start", (args) => {
    state.timerKey++;
    state.timerRunTime = args;
    state.timerIsRunning = true;
})

socket.on("timer:stop", (args) => {
    state.timerIsRunning = false;
})