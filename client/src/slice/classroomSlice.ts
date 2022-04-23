import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Classroom, ClassroomState } from "../models/states/ClassroomState";
import { teacherDashboardService } from "../services/TeacherService";

export const retrieveClassroomList = createAsyncThunk(
  "classroom/retrieveClassroomList",
  async (): Promise<ClassroomState> => {
    const response: Classroom[] =
      await teacherDashboardService.getClassrooms();
    return { isLoading: false, classroomList: response };
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
        return { ...payload }
      }
    );
  },
});

export default classroomSlice.reducer;
