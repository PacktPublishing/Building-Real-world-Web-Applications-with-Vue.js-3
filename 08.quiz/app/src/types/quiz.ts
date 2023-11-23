export type Question = {
    id?: string,
    question: string,
    answer_1: string,
    answer_2: string,
    answer_3: string,
    answer_4: string,
    correct: number
}

export type QuizHead = {
    id?: string,
    created_at?: string,

}

export type Quiz = QuizHead & {
    questions: Question[]
}

export type Player = {
    id: string,
    name: string | undefined,
    score: number,
}

export type Answer = {
    clientId: string,
    currentQuestion: Question,
    answer: number,
    timeRemaining: number,
}

export type Timer = { remaining: number, running: boolean }