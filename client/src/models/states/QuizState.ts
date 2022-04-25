export interface Quiz {
    id?: string;
    name: string;
    state: number;
}

export interface QuizState{
    quizList: Quiz[];
    isLoading: boolean;
}
