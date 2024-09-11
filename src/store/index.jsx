import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "../features/articles/articlesSlice";

export default configureStore({
  reducer: {
    articles: articleReducer,
  },
});
