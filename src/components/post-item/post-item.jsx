import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchDeleteLike, fetchSetLike } from '../../features/articles/articlesSlice'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'

import styles from './post-item.module.scss'

import likeIcon from '../../assets/like.svg'
import likeActiveIcon from '../../assets/like-active.svg'

const PostItem = ({ post }) => {
  const dispatch = useDispatch()
  const [favorited, setFavorited] = useState(post.favorited)
  const [favoritesCount, setFavoritesCount] = useState(post.favoritesCount)

  useEffect(() => {
    if (post) {
      setFavorited(post.favorited)
      setFavoritesCount(post.favoritesCount)
    }
  }, [post])

  const handlerLike = async () => {
    try {
      if (favorited) {
        dispatch(fetchDeleteLike(post.slug))
        setFavoritesCount((prevCount) => prevCount - 1)
        setFavorited(false)
        dispatch(fetchSetLike(post.slug))
        setFavoritesCount((prevCount) => prevCount + 1)
        setFavorited(true)
      }
    } catch (error) {console.error(error)}
  }

  const createdAt = format(new Date(post.createdAt), 'MMMM d, yyyy')

  return (
    <React.Fragment>
      <div className={styles.postHeader}>
        <div className={styles.postName}>
          <Link to={`/articles/${post.slug}`} className={styles.title}>
            {post.title}
          </Link>
          <div className={styles.likes}>
            <button type="button" onClick={handlerLike}>
              <img src={favorited ? likeActiveIcon : likeIcon} alt="like" className={styles.likeIcon} />
            </button>
            <span className={styles.likesCount}> {favoritesCount}</span>
          </div>
          <div className={styles.tagsContainer}>
            <ul className={styles.tagsList}>
              {post.tagList?.map((el) => (
                <li key={uniqid(el.createdAt)} className={styles.tagItem}>
                  {el}
                </li>
              ))}
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
        <p className={[styles.postBodyText, styles.textСlamp].join(' ')}>{post.description}</p>
      </div>
    </React.Fragment>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string),
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      following: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PostItem
