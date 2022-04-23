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
  },
});

export default classroomSlice.reducer;
