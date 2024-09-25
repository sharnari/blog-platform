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

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const registerUser = createAsyncThunk(
  'users/register',
  async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  }
)

export const loginUser = createAsyncThunk(
  'users/login',
  async (userData) => {
    const response = await apiClient.post('/users/login', userData);
    return response.data;
  }
)

export const getCurrentUser = createAsyncThunk(
  'users/current',
  async (token) => {
    const response = await apiClient.get('/user', token);
    return response.data;
  }
)

export const updateUser = createAsyncThunk(
  'users/update',
  async (userData) => {
    const response = await apiClient.put('/user', userData);
    return response.data;
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userInfo: null,
    statusLoading: null,
    error: null,
    signInAuth: false,
  },
  reducers: {
    setSignIn(state, action) {
      state.signInAuth = action.payload
    },

    logOutUser(state) {
      state.signInAuth = false
      localStorage.removeItem("token");
      state.userInfo = null
    },

    setError(state, action) {
      state.error = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
      state.statusLoading = 'loading'
      state.error = null
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.statusLoading = null
      state.userInfo = action.payload.user;
      localStorage.setItem("token", action.payload.user.token);
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.statusLoading = null
      state.error = action.error.message.includes('422') ?
       'Такой пользователь уже существует!' : action.error.message
    })
    .addCase(loginUser.pending, (state) => {
      state.statusLoading = 'loading'
      state.error = null
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.statusLoading = null
      state.userInfo = action.payload.user;
      localStorage.setItem("token", action.payload.user.token);
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message
      state.statusLoading = null
    })

    .addCase(getCurrentUser.pending, (state) => {
      state.statusLoading = 'loading'
      state.error = null
    })
    .addCase(getCurrentUser.fulfilled, (state, action) => {
      state.userInfo = action.payload.user;
      state.signInAuth = true;
      state.statusLoading = null
    })
    .addCase(getCurrentUser.rejected, (state, action) => {
      state.statusLoading = null
      state.error = action.error.message + '. Не удалсь загрузить изображение пользователя'
    })
    .addCase(updateUser.pending, (state) => {
      state.statusLoading = 'loading'
      state.error = null
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.userInfo = action.payload.user
      state.statusLoading = null
      console.log('answer server: ', action.payload)
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message;
    })
  }
})

export const { setSignIn, logOutUser, setError } = userSlice.actions;

export default userSlice.reducer;