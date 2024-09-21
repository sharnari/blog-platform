import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "../features/articles/articlesSlice";
import authReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    articles: articleReducer,
    auth: authReducer,
  },
});
