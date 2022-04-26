import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Question, QuestionState } from "../models/states/QuestionState";
import { teacherDashboardService } from "../services/TeacherService";

export const retrieveQuestionList = createAsyncThunk(
  "question/retrieveQuestionList",
  async ({
    classroomId,
    quizId,
  }: {
    classroomId: string;
    quizId: string;
  }): Promise<Question[]> => {
    const response: Question[] = await teacherDashboardService.getQuestions(
      classroomId,
      quizId
    );
    return response;
  }
);

export const retrieveQuestion = createAsyncThunk(
  "question/retrieveQuestion",
  async ({
    quizId,
    questionId,
    classroomId,
  }: {
    quizId: string;
    questionId: string;
    classroomId: string;
  }): Promise<Question> => {
    const response: Question = await teacherDashboardService.getQuestion(
      classroomId,
      quizId,
      questionId
    );
    return response;
  }
);

export const addQuestion = createAsyncThunk(
  "question/addQuestion",
  async ({
    classroomId,
    quizId,
    question,
  }: {
    classroomId: string;
    quizId: string;
    question: Question;
  }): Promise<Question> => {
    const response: Question = await teacherDashboardService.postQuestion(
      classroomId,
      quizId,
      question
    );
    return response;
  }
);

const initialState: QuestionState = {
  isLoading: false,
  questionList: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<QuestionState>) => {
    builder.addCase(retrieveQuestionList.pending, (state: QuestionState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveQuestionList.fulfilled,
      (state: QuestionState, { payload }) => {
        return { ...state, questionList: payload, isLoading: false };
      }
    );

    builder.addCase(retrieveQuestion.pending, (state: QuestionState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveQuestion.fulfilled,
      (state: QuestionState, { payload }) => {
        const index: number = state.questionList.findIndex(
          (question) => question.id === payload.id
        );

        if (index === -1) {
          state.questionList.push(payload);
        } else {
          state.questionList[index] = payload;
        }
        state.isLoading = true;
      }
    );

    builder.addCase(addQuestion.pending, (state: QuestionState) => {
      state.isLoading = true;
    });

    builder.addCase(addQuestion.fulfilled, (state: QuestionState, payload) => {
      return {
        ...state,
        isLoading: false,
        lessonList: [payload, ...state.questionList],
      };
    });
  },
});

export default questionSlice.reducer;
