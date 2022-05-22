import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Lesson, LessonState } from "../models/states/LessonState";
import { studentService } from "../services/StudentService";
import { teacherDashboardService } from "../services/TeacherService";

export const retrieveStudentLessonList = createAsyncThunk(
  "lesson/retrieveStudentLessonList",
  async (classroomId: string): Promise<Lesson[]> => {
    const response: Lesson[] = await studentService.getLessons(classroomId);
    return response;
  }
);

export const retrieveStudentLesson = createAsyncThunk(
  "lesson/retrieveStudentLesson",
  async ({
    lessonId,
    classroomId,
  }: {
    lessonId: string;
    classroomId: string;
  }): Promise<Lesson> => {
    const response: Lesson = await studentService.getLesson(
      classroomId,
      lessonId
    );
    return response;
  }
);

export const retrieveLessonList = createAsyncThunk(
  "lesson/retrieveLessonList",
  async (classroomId: string): Promise<Lesson[]> => {
    const response: Lesson[] = await teacherDashboardService.getLessons(
      classroomId
    );
    return response;
  }
);

export const retrieveLesson = createAsyncThunk(
  "lesson/retrieveLesson",
  async ({
    lessonId,
    classroomId,
  }: {
    lessonId: string;
    classroomId: string;
  }): Promise<Lesson> => {
    const response: Lesson = await teacherDashboardService.getLesson(
      classroomId,
      lessonId
    );
    return response;
  }
);

export const addLesson = createAsyncThunk(
  "lesson/addLesson",
  async ({
    classroomId,
    lesson,
  }: {
    classroomId: string;
    lesson: Lesson;
  }): Promise<Lesson> => {
    const response: Lesson = await teacherDashboardService.postLesson(
      classroomId,
      lesson
    );
    return response;
  }
);

export const updateLesson = createAsyncThunk(
  "lesson/updateLesson",
  async ({
    lesson,
    lessonId,
    classroomId,
  }: {
    classroomId: string;
    lesson: Lesson;
    lessonId: string;
  }): Promise<Lesson> => {
    const response: Lesson = await teacherDashboardService.updateLesson(
      classroomId,
      lessonId,
      lesson
    );
    return response;
  }
);

export const deleteLesson = createAsyncThunk(
  "lesson/deleteLesson",
  async ({
    lessonId,
    classroomId,
  }: {
    lessonId: string;
    classroomId: string;
  }): Promise<string> => {
    const response: string = await teacherDashboardService.deleteLesson(
      classroomId,
      lessonId
    );
    return response;
  }
);

const initialState: LessonState = {
  isLoading: false,
  lessonList: [],
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<LessonState>) => {
    builder.addCase(retrieveStudentLessonList.pending, (state: LessonState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveStudentLessonList.fulfilled,
      (state: LessonState, { payload }) => {
        return { ...state, lessonList: payload, isLoading: false };
      }
    );

    builder.addCase(retrieveStudentLesson.pending, (state: LessonState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveStudentLesson.fulfilled,
      (state: LessonState, { payload }) => {
        const index: number = state.lessonList.findIndex(
          (lesson) => lesson.id === payload.id
        );

        if (index === -1) {
          state.lessonList.push(payload);
        } else {
          state.lessonList[index] = payload;
        }
        state.isLoading = false;
      }
    );

    builder.addCase(retrieveLessonList.pending, (state: LessonState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveLessonList.fulfilled,
      (state: LessonState, { payload }) => {
        return { ...state, lessonList: payload, isLoading: false };
      }
    );

    builder.addCase(retrieveLesson.pending, (state: LessonState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveLesson.fulfilled,
      (state: LessonState, { payload }) => {
        const index: number = state.lessonList.findIndex(
          (lesson) => lesson.id === payload.id
        );

        if (index === -1) {
          state.lessonList.push(payload);
        } else {
          state.lessonList[index] = payload;
        }
        state.isLoading = true;
      }
    );

    builder.addCase(addLesson.pending, (state: LessonState) => {
      state.isLoading = true;
    });

    builder.addCase(addLesson.fulfilled, (state: LessonState, { payload }) => {
      return {
        ...state,
        isLoading: false,
        lessonList: [payload, ...state.lessonList],
      };
    });

    builder.addCase(updateLesson.pending, (state: LessonState, { payload }) => {
      state.isLoading = true;
    });

    builder.addCase(
      updateLesson.fulfilled,
      (state: LessonState, { payload }) => {
        const index = state.lessonList.findIndex(
          (lesson) => lesson.id === payload.id
        );
        state.lessonList[index] = payload;
        state.isLoading = false;
      }
    );

    builder.addCase(
      deleteLesson.fulfilled,
      (state: LessonState, { payload }) => {
        return {
          ...state,
          lessonList: state.lessonList.filter((item) => item.id !== payload),
        };
      }
    );
  },
});

export default lessonSlice.reducer;
