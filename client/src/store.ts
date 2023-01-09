import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import peopleReducer from "./components/people-list/people-list-slice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
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
