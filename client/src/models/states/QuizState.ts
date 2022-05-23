export interface Quiz {
  id?: string;
  name: string;
  state: "IN_REVIEW" | "ACTIVE" | "ARCHIVED";
}

export interface QuizState {
  quizList: Quiz[];
  isLoading: boolean;
}
