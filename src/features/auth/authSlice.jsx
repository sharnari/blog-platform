import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://blog.kata.academy/api",
  timeout: 1000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const registerUser = createAsyncThunk(
  'users/register',
  async (userData) => {
    const response = await apiClient.post('/users', {user: userData});
    return response.data;
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userInfo: null,
    statusLoading: null,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.statusLoading = null
      state.userInfo = action.payload.user;
      console.log("Answer:", action.payload.user);
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.statusLoading = null
      state.error = action.error.message;
    })
  }
})

export default userSlice.reducer;