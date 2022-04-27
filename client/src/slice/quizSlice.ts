import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Quiz, QuizState } from "../models/states/QuizState";
import { teacherDashboardService } from "../services/TeacherService";

export const retrieveQuizList = createAsyncThunk(
  "quiz/retrieveQuizList",
  async (classroomId: string): Promise<Quiz[]> => {
    const response: Quiz[] = await teacherDashboardService.getQuizzes(
      classroomId
    );
    return response;
  }
);

export const retrieveQuiz = createAsyncThunk(
  "quiz/retrieveQuiz",
  async ({
    quizId,
    classroomId,
  }: {
    quizId: string;
    classroomId: string;
  }): Promise<Quiz> => {
    const response: Quiz = await teacherDashboardService.getQuiz(
      classroomId,
      quizId
    );
    return response;
  }
);

export const addQuiz = createAsyncThunk(
  "quiz/addQuiz",
  async ({
    classroomId,
    quiz,
  }: {
    classroomId: string;
    quiz: Quiz;
  }): Promise<Quiz> => {
    const response: Quiz = await teacherDashboardService.postQuiz(
      classroomId,
      quiz
    );
    return response;
  }
);

export const setQuizAsActive = createAsyncThunk(
  "quiz/setQuizAsActive",
  async ({
    quizId,
    classroomId,
  }: {
    classroomId: string;
    quizId: string;
  }): Promise<Quiz> => {
    const response: Quiz = await teacherDashboardService.setQuizAsActive(
      classroomId,
      quizId
    );
    return response;
  }
);

export const setQuizAsArchived = createAsyncThunk(
  "quiz/setQuizAsArchived",
  async ({
    quizId,
    classroomId,
  }: {
    classroomId: string;
    quizId: string;
  }): Promise<Quiz> => {
    const response: Quiz = await teacherDashboardService.setQuizAsArchived(
      classroomId,
      quizId
    );
    return response;
  }
);

const initialState: QuizState = {
  isLoading: false,
  quizList: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<QuizState>) => {
    builder.addCase(retrieveQuizList.pending, (state: QuizState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveQuizList.fulfilled,
      (state: QuizState, { payload }) => {
        return { ...state, quizList: payload, isLoading: false };
      }
    );

    builder.addCase(retrieveQuiz.pending, (state: QuizState) => {
      state.isLoading = true;
    });

    builder.addCase(retrieveQuiz.fulfilled, (state: QuizState, { payload }) => {
      const index: number = state.quizList.findIndex(
        (quiz) => quiz.id === payload.id
      );

      if (index === -1) {
        state.quizList.push(payload);
      } else {
        state.quizList[index] = payload;
      }
      state.isLoading = true;
    });

    builder.addCase(addQuiz.pending, (state: QuizState) => {
      state.isLoading = true;
    });

    builder.addCase(addQuiz.fulfilled, (state: QuizState, payload) => {
      return {
        ...state,
        isLoading: false,
        lessonList: [payload, ...state.quizList],
      };
    });

    builder.addCase(setQuizAsActive.pending, (state: QuizState, payload) => {
      state.isLoading = true;
    });

    builder.addCase(
      setQuizAsActive.fulfilled,
      (state: QuizState, { payload }) => {
        const index = state.quizList.findIndex(
          (quiz) => quiz.id === payload.id
        );
        state.quizList[index] = payload;
        state.isLoading = false;
      }
    );

    builder.addCase(setQuizAsArchived.pending, (state: QuizState, payload) => {
      state.isLoading = true;
    });

    builder.addCase(
      setQuizAsArchived.fulfilled,
      (state: QuizState, { payload }) => {
        const index = state.quizList.findIndex(
          (quiz) => quiz.id === payload.id
        );
        state.quizList[index] = payload;
        state.isLoading = false;
      }
    );
  },
});

export default quizSlice.reducer;
