import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import classroomReducer from '../slice/classroomSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classroom: classroomReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
