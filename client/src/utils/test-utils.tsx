// test-utils.jsx
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import your own reducer
import authReducer from "../slice/authSlice";
import lessonReducer from "../slice/lessonSlice";
import classroomReducer from "../slice/lessonSlice";
import questionReducer from "../slice/questionSlice";
import quizReducer from "../slice/quizSlice";
import { AuthState } from "../models/states/AuthState";
import { LessonState } from "../models/states/LessonState";
import { QuestionState } from "../models/states/QuestionState";
import { QuizState } from "../models/states/QuizState";

function render(
  ui: any,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        auth: authReducer,
        lesson: lessonReducer,
        classroom: classroomReducer,
        question: questionReducer,
        quiz: quizReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: {
    [x: string]: any;
    preloadedState: any;
    store?:
      | EnhancedStore<
          {
            auth: AuthState;
            lesson: LessonState;
            classroom: LessonState;
            question: QuestionState;
            quiz: QuizState;
          },
          AnyAction
        >
      | undefined;
  }
) {
  function Wrapper({ children }: { children: any }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
