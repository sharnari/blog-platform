import PostList from "../posts-list";
import AppHeader from "../app-header";
import { Pagination, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changePageOfPagination } from "../../features/articles/articlesSlice";
import { ErrorMessage } from "../error-message/error-message";
import Article from "../article";
import { useEffect } from "react";
import SignIn from '../sign-in'
import SignUp from '../sign-up'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import styles from "./App.module.scss";

const theme = {
  token: {
    colorBgContainer: "#EBEEF3",
  },
  components: {
    Pagination: {
      colorPrimary: "#EBEEF3",
      itemActiveBg: "#4096ff",
      colorPrimaryHover: "none",
    },
  },
};

function App() {
  const dispatch = useDispatch();
  const changePage = (page) => dispatch(changePageOfPagination(page));
  const currentItemOfPagination = useSelector(
    (state) => state.articles.pagination.currentItem
  );
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const statusError = useSelector((state) => state.articles.statusError);
  const pageSize = 5;
  const { contextHolder, showError } = ErrorMessage();

  useEffect(() => {
    if (statusError) {
      showError(statusError);
    }
  }, [statusError, showError]);

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
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
