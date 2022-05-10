import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { UserLoginRequest } from "../models/requests/UserRequest";
import { AuthState } from "../models/states/AuthState";
import { authenticationService } from "../services/AuthService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: UserLoginRequest) => {
    const response: AuthState = await authenticationService.login(user);
    return response;
  },
);

let initialState: AuthState = {
  username: "",
  firstName: "",
  lastName: "",
  token: "",
  email: "",
  role: "",
};

const user = localStorage.getItem("user");
if (user !== null) {
  initialState = JSON.parse(user);
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state = initialState;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(loginUser.pending, (state: AuthState) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state: AuthState, { payload }) => {
      return { ...state, ...payload, isLoading: false };
    });

    builder.addCase(loginUser.rejected, (state: AuthState, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
