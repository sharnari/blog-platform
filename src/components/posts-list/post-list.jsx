import { useEffect } from "react";
import { fetchArticles } from "../../features/articles/articlesSlice";
import PostItem from "../post-item";

import styles from "./post-list.module.scss";
import { useDispatch, useSelector } from "react-redux";

const PostList = () => {
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);
  return (
    <div className="container">
      <ul className={styles.posts}>
        {articles.map((el, index) => (
          <li key={index} className={styles.item}>
            <PostItem post={el} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
