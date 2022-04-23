import { buttonUnstyledClasses } from "@mui/base";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { ClassroomState } from "../models/states/ClassroomState";
import { teacherDashboardService } from "../services/TeacherService";

export const retrieveClassroomList = createAsyncThunk(
  "classroom/retrieveClassroomList",
  async () => {
    const response: ClassroomState =
      await teacherDashboardService.getClassrooms();
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
    builder.addCase(
      retrieveClassroomList.pending,
      (state: ClassroomState) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      retrieveClassroomList.fulfilled,
      (state: ClassroomState, {payload}) => {
        state.isLoading = false;
        state.classroomList = payload.classroomList;
      }
    );
  },
});

export default classroomSlice.reducer;
