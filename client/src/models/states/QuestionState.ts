export interface Question {
  id?: string;
  question: string;
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
  fourthChoice: string;
  correctChoice: Number;
  order?: string;
}

export interface QuestionState {
  questionList: Question[];
  isLoading: boolean;
}
