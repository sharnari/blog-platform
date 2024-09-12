import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const articlesURL = "/articles";

const apiClient = axios.create({
  baseURL: "https://blog.kata.academy/api",
  timeout: 1000,
  headers: {
    accept: "application/json",
  },
});

export const fetchArticles = createAsyncThunk(
  "articles/fetchActicles",
  async function (offset) {
    const response = await apiClient.get(`${articlesURL}`, {
      params: {
        limit: 5,
        offset: offset,
      },
    });
    if (!response.status >= 200 && !response.status <= 299) {
      throw new Error(
        `Could not fetch ${articlesURL} received ${response.status}`
      );
    }
    return await response.data;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    pagination: {
      currentItem: 1,
    },
    articles: [],
    articlesCount: null,
    statusLoading: null,
    statusError: null,
  },
  reducers: {
    changePageOfPagination(state, action) {
      state.pagination.currentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.statusLoading = true;
        state.statusError = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.statusError = null;
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.statusLoading = false;
        state.statusError = "Error fetching articles";
        console.log(state.statusError);
      });
  },
});

export const { changePageOfPagination } = articlesSlice.actions;

export default articlesSlice.reducer;
