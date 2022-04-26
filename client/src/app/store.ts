import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import classroomReducer from '../slice/classroomSlice';
import lessonReducer from '../slice/lessonSlice';
import quizReducer from '../slice/quizSlice';
import questionReducer from '../slice/questionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classroom: classroomReducer,
    lesson: lessonReducer,
    quiz: quizReducer,
    question: questionReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
