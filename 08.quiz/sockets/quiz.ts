import type { Player, Question, Answer, Timer } from './types/quiz';
class QuizGame {
  players: Player[];
  questions: Question[];
  answers: Answer[];
  currentQuestion: number;
  timer: Timer

  constructor() {
    this.players = [];
    this.questions = [];
    this.answers = [];
    this.currentQuestion = 0;
    this.timer = {
      remaining: 0,
      running: false,
    };
  }

  // ******************************
  // Player methods
  // ******************************

  addPlayer(player: { id: string, name: string }): void {
    this.players.push({ ...player, score: 0 });
  }

  removePlayer(id: string): void {
    const index = this.players.findIndex((player) => player.id === id);
    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  getPlayers(): Player[] {
    return this.players;
  }

  // ******************************
  // Player scoring methods
  // ******************************  
  addScore(id: string): void {
    const index = this.players.findIndex((player: Player) => player.id === id);
    if (index !== -1) {
      this.players[index].score++;
    }
  }

  // ******************************
  // Answer methods
  // ******************************
  addAnswer(clientId: string, currentQuestion: Question, answer: number): void {
    this.answers.push({ clientId, currentQuestion, answer, timeRemaining: this.timer.remaining || 0 });
  }

  getAnswersByQuestion(currentQuestion: Question): Answer[] {
    return this.answers.filter((answer) => answer.currentQuestion === currentQuestion);
  }

  getAnswers(): Answer[] {
    return this.answers;
  }

  // ******************************
  // Question methods
  // ******************************

  setQuestions(questions: Question[]): void {
    this.questions = questions;
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  setQuestion(index: number): void {
    this.currentQuestion = index;
  }

  getCurrentQuestion(): Question {
    return this.questions[this.currentQuestion];

  }
  // ******************************
  // Timer methods
  // ******************************
  getTimer(): Timer {
    return this.timer;
  }

  startTimer(duration: number, callback?: Function): void {
    if (!this.timer.running) {
      this.timer.remaining = duration;
      this.timer.running = true;

      const timerInterval = setInterval((): void => {
        this.timer.remaining--;
        if (this.timer.remaining <= 0) {
          clearInterval(timerInterval);
          this.timer.running = false;
          if (callback) {
            callback();
          }
        }
      }, 1000);
    }
  }

  isTimerRunning(): boolean {
    return this.timer.running;
  }
}

export default QuizGame