import { useDispatch, useSelector } from 'react-redux'
import Markdown from "react-markdown";
import { format } from "date-fns";
import { Avatar, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import likeIcon from "../../assets/like.svg";
import { fetchArticle } from "../../features/articles/articlesSlice";

import styles from "./article.module.scss";

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.articles.currentArticle)
  useEffect(() => {
    dispatch(fetchArticle(slug))
  }, [dispatch, slug]);

  if (!post) {
    return (
      <section className={styles.item}>
        <Skeleton active avatar title paragraph={{ rows: 5 }} />
        </section>
    );
  }

  const createdAt = format(new Date(post.createdAt), "MMMM d, yyyy");
  return (
    <section className={styles.item}>
      <div className={styles.postHeader}>
        <div className={styles.postName}>
          <h5 className={styles.title}>{post.title}</h5>
          <div className={styles.likes}>
            <img src={likeIcon} alt="like" className={styles.likeIcon} />
            <span className={styles.likesCount}> {post.favoritesCount}</span>
          </div>
          <div className={styles.tagsContainer}>
            <ul className={styles.tagsList}>
              {post.tagList?.map((el, index) => {
                return (
                  <li key={index} className={styles.tagItem}>
                    {el}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={styles.postAuthor}>
          <div className={styles.authorInfo}>
            <p className={styles.name}>{post.author.username}</p>
            <p className={styles.date}>{createdAt}</p>
          </div>
          <Avatar
            size={58}
            src={post.author.image ? post.author.image : null}
            icon={!post.author.image ? <UserOutlined /> : null}
          />
        </div>
      </div>
      <div className="post-body">
        <p className={[styles.postBodyText, styles.textСlamp].join(" ")}>
          {post.description}
        </p>
      </div>
      <div className={styles.articleText}>
        <Markdown>{post.body}</Markdown>
      </div>
    </section>
  );
};

export default Article;
