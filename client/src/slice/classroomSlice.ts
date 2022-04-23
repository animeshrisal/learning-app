import { createSlice } from "@reduxjs/toolkit";
import { ClassroomState } from "../models/states/ClassroomState";

const initialState: ClassroomState[] = [];

export const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
});

export default classroomSlice.reducer;