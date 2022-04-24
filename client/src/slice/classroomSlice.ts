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

export const retrieveClassroom = createAsyncThunk(
  "classroom/retrieveClassroom",
  async (classroomId: string): Promise<Classroom> => {
    const response: Classroom = await teacherDashboardService.getClassroom(
      classroomId
    );
    return response;
  }
);

export const addClassroom = createAsyncThunk(
  "classroom/addClassroom",
  async (classroom: Classroom): Promise<Classroom> => {
    const response: Classroom = await teacherDashboardService.postClassroom(
      classroom
    );
    return response;
  }
);

export const updateClassroom = createAsyncThunk(
  "classroom/updateClassroom",
  async ({
    classroom,
    classroomId,
  }: {
    classroom: Classroom;
    classroomId: string;
  }): Promise<Classroom> => {
    const response: Classroom = await teacherDashboardService.updateClassroom(
      classroom,
      classroomId
    );
    return response;
  }
);

export const deleteClassroom = createAsyncThunk(
  "classroom/deleteClassroom",
  async (classroomId: string): Promise<string> => {
    const response: string = await teacherDashboardService.deleteClassroom(
      classroomId
    );
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

    builder.addCase(retrieveClassroom.pending, (state: ClassroomState) => {
      state.isLoading = true;
    });

    builder.addCase(
      retrieveClassroom.fulfilled,
      (state: ClassroomState, { payload }) => {
        const index: number = state.classroomList.findIndex(
          (classroom) => classroom.id === payload.id
        );

        if (index === -1) {
          state.classroomList.push(payload);
        } else {
          state.classroomList[index] = payload;
        }
        state.isLoading = true;
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
