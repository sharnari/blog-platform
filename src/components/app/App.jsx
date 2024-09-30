import PostList from '../posts-list'
import AppHeader from '../app-header'
import { Pagination, ConfigProvider } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { changePageOfPagination } from '../../features/articles/articlesSlice'
import { ErrorMessage } from '../error-message/error-message'
import Article from '../article'
import { useEffect, useState, useMemo } from 'react'
import SignIn from '../sign-in'
import SignUp from '../sign-up'
import EditProfile from '../edit-profile'
import NotFound from '../not-found'
import CreateArticle from '../create-article'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { setSignIn, getCurrentUser, setToken } from '../../features/auth/authSlice'
import { routesName } from '../../router/routes'

import styles from './App.module.scss'

const theme = {
  token: {
    colorBgContainer: '#EBEEF3',
  },
  components: {
    Pagination: {
      colorPrimary: '#EBEEF3',
      itemActiveBg: '#4096ff',
      colorPrimaryHover: 'none',
    },
  },
}

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const changePage = (page) => dispatch(changePageOfPagination(page))
  const currentItemOfPagination = useSelector((state) => state.articles.pagination.currentItem)
  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const statusError = useSelector((state) => state.articles.statusError)
  const token = useSelector((state) => state.auth.token)
  const pageSize = 5
  const { contextHolder, showError } = ErrorMessage()

  const storedToken = useMemo(() => localStorage.getItem('token'), []);
  
  useEffect(() => {
    if (storedToken) {
      dispatch(setSignIn(true));
      dispatch(getCurrentUser(storedToken));
      dispatch(setToken(storedToken));
    }
    setLoading(false);
  }, [dispatch, storedToken]);

  useEffect(() => {
    if (statusError) {
      showError(statusError)
    }
  }, [statusError, showError])

 if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Router>
      <div className={styles.App}>
        {contextHolder}
        <AppHeader />
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route
            path="/articles"
            element={
              <>
                <PostList />
                <ConfigProvider theme={theme}>
                  <Pagination
                    className={styles.pagination}
                    align="center"
                    defaultCurrent={1}
                    total={articlesCount}
                    onChange={changePage}
                    current={currentItemOfPagination}
                    showSizeChanger={false}
                    pageSize={pageSize}
                  />
                </ConfigProvider>
              </>
            }
          />
          <Route path={`/${routesName.pathArticle}/:slug` } element={<Article />} />
          <Route path={`/${routesName.pathSignIn}` } element={!token ? <SignIn /> : <Navigate to={`/${routesName.pathArticle}` } replace />} />
          <Route path={`/${routesName.pathSignUp}` } element={!token ? <SignUp /> : <Navigate to={`/${routesName.pathArticle}` } replace />} />
          <Route path={`/${routesName.pathProfile}` } element={token ? <EditProfile /> : <Navigate to={`/${routesName.pathSignUp}` } replace />} />
          <Route path={`/${routesName.pathNewArticle}` } element={token ? <CreateArticle /> : <Navigate to={`/${routesName.pathSignIn}` } replace />} />
          <Route path={`/${routesName.pathArticle}/:slug/edit` } element={token ? <CreateArticle /> : <Navigate to={`/${routesName.pathSignIn}` } replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
