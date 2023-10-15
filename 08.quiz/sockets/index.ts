const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

import QuizGame from "./quiz";

const app = express();
const server = createServer(app);

// This needs to match the client url of the running app instance
const clientAppUrl = "http://localhost:5173";

let serverOptions = {};
if (process.env.NODE_ENV !== "production") {
    serverOptions = {
        ...serverOptions,
        cors: {
            origin: clientAppUrl, // cors is enabled for socketed connections on localhost:5173
        },
    }
}

const io = new Server(server, serverOptions);

const game = new QuizGame();

io.on("connection", (socket: any) => {
    console.log("🔌 Connection established", socket.id)
    const clientId = socket.id;

    // We make sure all players also get the current players
    updatePlayers();

    // ******************************
    // Player events
    // ******************************
    socket.on("player:ready", (name: string) => {
        game.addPlayer({ id: clientId, name });
        updatePlayers();
        console.log("🔌 Player ready", socket.id);
    });

    socket.on("player:answer", (answer: number) => {
        const currentQuestion = game.getCurrentQuestion();
        game.addAnswer(clientId, currentQuestion, answer);
        console.log(`🔌 Player ${socket.id} answered ${answer}. Correct answer is: ${currentQuestion.correctAnswer}`)
        if (currentQuestion.correctAnswer === answer) {
            game.addScore(clientId);
        }
    });

    // ******************************
    // Quiz events
    // ******************************
    socket.on("quiz:select", async (id: string) => {
        console.log("🔌 quiz:select")
        const response = await fetch(`http://localhost:3000/api/quiz/${id}`);
        const data = await response.json();
        game.setQuestions(data);
    })

    socket.on("quiz:start", () => {
        console.log("🔌 quiz:start")
        game.setQuestion(0);
        sendQuestion();
    });

    // ******************************
    // Socket events
    // ******************************
    socket.on("disconnect", () => {
        game.removePlayer(socket.id);
        updatePlayers();
        console.log(`🔌 Client ${clientId} disconnected.`);
    });
});


// ******************************
// Quiz related emits
// ******************************
const sendQuestion = () => {
    startTimer(10000, sendAnswers);
    console.log("🔌 quiz:stateChange", "question"); ''
    io.emit("quiz:stateChange", "question");
    console.log("🔌 quiz:currentQuestion", game.getCurrentQuestion());
    io.emit("quiz:currentQuestion", game.getCurrentQuestion());
};

const sendAnswers = () => {
    updatePlayers();
    console.log("🔌 quiz:stateChange", "answer");
    io.emit("quiz:stateChange", "answer");
    const currentAnswers = game.getAnswersByQuestion(game.getCurrentQuestion());
    console.log("🔌 quiz:answers", currentAnswers);
    io.emit("quiz:answers", currentAnswers);

    const currentQuestionIndex = game.currentQuestion;

    if (game.getQuestions().length - 1 > currentQuestionIndex) {
        game.setQuestion(currentQuestionIndex + 1);
        if (currentQuestionIndex % 3 === 0) {
            stopTimer();
            sendScoreBoard();
        } else {
            startTimer(3000, sendQuestion);
        }
    } else {
        updatePlayers();
        startTimer(1000, quizEnd);
    }
};

const sendScoreBoard = () => {
    console.log("🔌 quiz:stateChange", "scoreboard");
    io.emit("quiz:stateChange", "scoreboard");
    startTimer(2000, sendQuestion);
};

const quizEnd = () => {
    console.log("🔌 quiz:scoreboard", 'game.getAnswers()');
    io.emit("quiz:scoreboard", game.getAnswers());
    console.log("🔌 quiz:stateChange", "end");
    io.emit("quiz:stateChange", "end");
};

// ******************************
// Player emits
// ******************************
const updatePlayers = () => {
    console.log("🔌 players:update", game.getPlayers());
    io.emit("players:update", game.getPlayers());
};

// ******************************
// Timer emits
// ******************************
const startTimer = (timeInMs: number, callback: Function | undefined) => {
    console.log("🔌 timer:start", timeInMs);
    io.emit("timer:start", timeInMs);
    game.startTimer(timeInMs / 1000, () => {
        stopTimer();
        if (callback) callback();
    });
};

const stopTimer = () => {
    console.log("🔌 timer:stop");
    io.emit("timer:stop");
};

// ******************************
// Listen on the port for events
// ******************************
server.listen(4000, () => {
    console.log("🔌 Server is running on port 4000");
});
