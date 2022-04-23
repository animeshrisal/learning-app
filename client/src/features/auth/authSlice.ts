import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  username?: string;
  firstName?: string;
  lastName?: string;
  jwt?: string;
  email?: string;
  role?: "USER" | "TEACHER" | "ADMIN" | "";
}

const initialState: AuthState = {
  username: "",
  firstName: "",
  lastName: "",
  jwt: "",
  email: "",
  role: "",
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthState, action: PayloadAction<AuthState>) => {
            state = action.payload;
        }
    }
})

export const { login } = authSlice.actions;

export default authSlice.reducer;