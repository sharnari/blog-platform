import PostList from "../posts-list";
import AppHeader from "../app-header";
import { Pagination, ConfigProvider } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { changePageOfPagination } from '../../features/articles/articlesSlice'
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
  const dispatch = useDispatch()
  const changePage = (page) => dispatch(changePageOfPagination(page))
  const currentItemOfPagination = useSelector(state => state.articles.pagination.currentItem)
  return (
    <div className={styles.App}>
      <AppHeader />
      <PostList />
      <ConfigProvider theme={theme}>
        <Pagination
          className={styles.pagination}
          align="center"
          defaultCurrent={1}
          total={50}
          onChange={changePage}
          current={currentItemOfPagination}
        />
      </ConfigProvider>
    </div>
  );
}

export default App;
