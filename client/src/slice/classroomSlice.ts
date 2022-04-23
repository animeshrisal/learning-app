import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Classroom, ClassroomState } from "../models/states/ClassroomState";
import { teacherDashboardService } from "../services/TeacherService";

export const retrieveClassroomList = createAsyncThunk(
  "classroom/retrieveClassroomList",
  async (): Promise<Classroom[]> => {
    const response: Classroom[] = await teacherDashboardService.getClassrooms();
    return response;
  }
);

export const addClassroom = createAsyncThunk(
  "classroom/addClassroom",
  async (): Promise<Classroom> => {
    const response: Classroom = await teacherDashboardService.postClassroom({});
    return response;
  }
);

export const updateClassroom = createAsyncThunk(
  "classroom/addClassroom",
  async (): Promise<Classroom> => {
    const response: Classroom = await teacherDashboardService.updateClassroom(
      {},
      "a"
    );
    return response;
  }
);

export const deleteClassroom = createAsyncThunk(
  "classroom/deleteClassroom",
  async (): Promise<string> => {
    const response: string = await teacherDashboardService.deleteClassroom("a");
    return response;
  }
);

const initialState: ClassroomState = {
  isLoading: false,
  classroomList: [],
};

export const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ClassroomState>) => {
    builder.addCase(retrieveClassroomList.pending, (state: ClassroomState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveClassroomList.fulfilled,
      (state: ClassroomState, { payload }) => {
        return { ...state, classroomList: payload, isLoading: false };
      }
    );

    builder.addCase(addClassroom.pending, (state: ClassroomState) => {
      state.isLoading = true;
    });

    builder.addCase(
      addClassroom.fulfilled,
      (state: ClassroomState, { payload }) => {
        return {
          ...state,
          isLoading: state.isLoading,
          classroomList: [payload, ...state.classroomList],
        };
      }
    );

    builder.addCase(
      updateClassroom.pending,
      (state: ClassroomState, { payload }) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      updateClassroom.fulfilled,
      (state: ClassroomState, { payload }) => {
        const index = state.classroomList.findIndex(
          (classroom) => classroom.id === payload.id
        );
        state.classroomList[index] = payload;
        state.isLoading = false;
      }
    );

    builder.addCase(
      updateClassroom.fulfilled,
      (state: ClassroomState, { payload }) => {
        const index = state.classroomList.findIndex(
          (classroom) => classroom.id === payload.id
        );
        state.classroomList[index] = payload;
        state.isLoading = false;
      }
    );

    builder.addCase(
      deleteClassroom.fulfilled,
      (state: ClassroomState, { payload }) => {
        return {
          ...state,
          classroomList: state.classroomList.filter(
            (item) => item.id !== payload
          ),
        };
      }
    );
  },
});

export default classroomSlice.reducer;
