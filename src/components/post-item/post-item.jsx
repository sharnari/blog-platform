import React from "react";
import { format } from "date-fns";
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import styles from "./post-item.module.scss";

import likeIcon from "../../assets/like.svg";


const PostItem = ({ post }) => {
  const createdAt = format(new Date(post.createdAt), "MMMM d, yyyy")
  return (
    <React.Fragment>
      <div className={styles.postHeader}>
        <div className={styles.postName}>
          <Link to={`/articles/${post.slug}`} className={styles.title}>{post.title}</Link>
          <div className={styles.likes}>
            <img src={likeIcon} alt="like" className={styles.likeIcon} />
            <span className={styles.likesCount}> {post.favoritesCount}</span>
          </div>
          <div className={styles.tagsContainer}>
            <ul className={styles.tagsList}>
              {
              post.tagList?.map((el, index) => {
                return <li key={index} className={styles.tagItem}>{el}</li>  
              })
              }
            </ul>
          </div>
        </div>
        <div className={styles.postAuthor}>
          <div className={styles.authorInfo}>
            <p className={styles.name}>{post.author.username}</p>
            <p className={styles.date}>{createdAt}</p>
          </div>
          <Avatar size={58} src={post.author.image ? post.author.image : null} icon={!post.author.image ? <UserOutlined /> : null} />
        </div>
      </div>
      <div className="post-body">
        <p className={[styles.postBodyText, styles.textСlamp].join(' ')}>{post.description}</p>
      </div>
    </React.Fragment>
  );
};

export default PostItem;
