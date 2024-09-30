import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { routesName } from "../../router/routes"


const articlesURL = `/${routesName.pathArticle}`

const apiClient = axios.create({
  baseURL: 'https://blog.kata.academy/api',
  timeout: 1000,
  headers: {
    accept: 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const fetchArticles = createAsyncThunk(`${routesName.pathArticle}/fetchActicles`, async function (offset) {
  const response = await apiClient.get(`${articlesURL}`, {
    params: {
      limit: 5,
      offset: offset,
    },
  })
  if (response.status < 200 || response.status > 299) {
    throw new Error(`Could not fetch ${articlesURL} received ${response.status}`)
  }
  return await response.data
})

export const fetchArticle = createAsyncThunk(`${routesName.pathArticle}/fetchActicle`, async function (slug) {
  const response = await apiClient.get(`/${routesName.pathArticle}/${slug}`)
  if (response.status < 200 || response.status > 299) {
    throw new Error(`Could not fetch /${routesName.pathArticle}/${slug} received ${response.status}`)
  }
  return await response.data.article
})

export const fetchMakeArticle = createAsyncThunk(`${routesName.pathArticle}/makeArticle`, async function (articleData) {
  const response = await apiClient.post(`/${routesName.pathArticle}`, articleData)
  return response.data
})

export const fetchUpdateArticle = createAsyncThunk(`${routesName.pathArticle}/updateArticle`, async function ({ articleData, slug }) {
  const response = await apiClient.put(`/${routesName.pathArticle}/${slug}`, articleData)
  return response.data
})

export const fetchDeleteArticle = createAsyncThunk(`${routesName.pathArticle}/deleteArticle`, async function (slug) {
  const response = await apiClient.delete(`/${routesName.pathArticle}/${slug}`)
  return response.data
})

export const fetchSetLike = createAsyncThunk(`${routesName.pathArticle}/setLike`, async function (slug) {
  const response = await apiClient.post(`/${routesName.pathArticle}/${slug}/favorite`)
  return response.data
})

export const fetchDeleteLike = createAsyncThunk(`${routesName.pathArticle}/deleteLike`, async function (slug) {
  const response = await apiClient.delete(`/${routesName.pathArticle}/${slug}/favorite`)
  return response.data
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    pagination: {
      currentItem: 1,
    },
    articles: [],
    currentArticle: null,
    articlesCount: null,
    statusLoading: null,
    statusError: null,
    modeEdit: false,
  },
  reducers: {
    changePageOfPagination(state, action) {
      state.pagination.currentItem = action.payload
    },
    setEditMode(state, action) {
      state.modeEdit = action.payload
    },
    setCurrentArticle(state, action) {
      state.currentArticle = action.payload
    },
    updateArticle(state, action) {
      const updatedArticle = action.payload
      const index = state.articles.findIndex((article) => article.slug === updatedArticle.slug)
      if (index !== -1) {
        state.articles[index] = updatedArticle
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.statusLoading = true
        state.statusError = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.statusLoading = false
        state.statusError = null
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.statusLoading = false
        state.statusError = 'Error fetching articles'
        console.log(state.statusError)
      })

      .addCase(fetchArticle.pending, (state) => {
        state.statusLoading = true
        state.statusError = null
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.statusLoading = false
        state.statusError = null
        state.currentArticle = action.payload
      })
      .addCase(fetchArticle.rejected, (state) => {
        state.statusLoading = false
        state.statusError = 'Error fetching article'
        console.log(state.statusError)
      })

      .addCase(fetchMakeArticle.pending, (state) => {
        state.statusLoading = true
        state.statusError = null
      })
      .addCase(fetchMakeArticle.fulfilled, (state, action) => {
        state.statusLoading = false
        state.statusError = null
        console.log('answer to make article: ', action.payload)
      })
      .addCase(fetchMakeArticle.rejected, (state, action) => {
        state.statusLoading = false
        state.statusError = action.error.message
      })

      .addCase(fetchUpdateArticle.pending, (state) => {
        state.statusLoading = true
        state.statusError = null
      })
      .addCase(fetchUpdateArticle.fulfilled, (state) => {
        state.statusLoading = false
        state.statusError = null
      })
      .addCase(fetchUpdateArticle.rejected, (state, action) => {
        state.statusLoading = false
        state.statusError = action.error.message
      })

      .addCase(fetchDeleteArticle.pending, (state) => {
        state.statusLoading = true
        state.statusError = null
      })
      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.statusLoading = false
        state.statusError = null
      })
      .addCase(fetchDeleteArticle.rejected, (state, action) => {
        state.statusLoading = false
        state.statusError = action.error.message
      })

      .addCase(fetchSetLike.pending, (state) => {
        state.statusError = null
      })
      .addCase(fetchSetLike.fulfilled, (state) => {
        state.statusLoading = false
        state.statusError = null
      })
      .addCase(fetchSetLike.rejected, (state, action) => {
        state.statusLoading = false
        state.statusError = action.error.message
      })

      .addCase(fetchDeleteLike.pending, (state) => {
        state.statusError = null
      })
      .addCase(fetchDeleteLike.fulfilled, (state) => {
        state.statusLoading = false
        state.statusError = null
      })
      .addCase(fetchDeleteLike.rejected, (state, action) => {
        state.statusLoading = false
        state.statusError = action.error.message
      })
  },
})

export const { changePageOfPagination, setEditMode, setCurrentArticle, updateArticle } = articlesSlice.actions

export default articlesSlice.reducer
