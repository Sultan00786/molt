// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./slices/codeSlice";

export const store = configureStore({
  reducer: {
    code: codeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch