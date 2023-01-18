import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "../views/HomePage/articlesSlice";
import articleByIdSlice from "../views/ArticlePage/articleByIdSlice";

const store = configureStore({
  reducer: {
    articlesSlice,
    articleByIdSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
