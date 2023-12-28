import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/slices/authSlice";
import { TypedUseSelectorHook } from "react-redux";

export const rootStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
