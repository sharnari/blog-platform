import { useDispatch, useSelector } from 'react-redux'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { Avatar, Skeleton, Flex, Popconfirm, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import likeIcon from '../../assets/like.svg'
import likeActiveIcon from '../../assets/like-active.svg'
import {
  fetchArticle,
  setEditMode,
  fetchDeleteArticle,
  fetchDeleteLike,
  fetchSetLike,
} from '../../features/articles/articlesSlice'
import { useNavigate } from 'react-router-dom'

import styles from './article.module.scss'

const Article = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const post = useSelector((state) => state.articles.currentArticle)
  const userName = useSelector((state) => state.auth.userInfo?.username)

  const [favorited, setFavorited] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    dispatch(fetchArticle(slug))
  }, [dispatch, slug])

  useEffect(() => {
    if (post) {
      setFavorited(post.favorited)
      setFavoritesCount(post.favoritesCount)
    }
  }, [post])

  const onConfirm = async () => {
    dispatch(fetchDeleteArticle(slug))
    navigate('/')
  }

  const handlerLike = () => {
    if (favorited) {
      dispatch(fetchDeleteLike(post.slug))
      setFavoritesCount((prevCount) => prevCount - 1)
    } else {
      dispatch(fetchSetLike(post.slug))
      setFavoritesCount((prevCount) => prevCount + 1)
    }
    setFavorited((prev) => !prev)
  }

  const EditDelete = (
    <Flex gap={15}>
      <Popconfirm
        placement="rightTop"
        title="Are you sure to delete this article?"
        cancelText="No"
        okText="Yes"
        onConfirm={onConfirm}
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      <Button
        onClick={() => {
          dispatch(setEditMode(true))
          navigate(`/articles/${slug}/edit`)
        }}
      >
        Edit
      </Button>
    </Flex>
  )

  if (!post) {
    return (
      <section className={styles.item}>
        <Skeleton active avatar title paragraph={{ rows: 5 }} />
      </section>
    )
  }

  const createdAt = format(new Date(post.createdAt), 'MMMM d, yyyy')

  return (
    <section className={styles.item}>
      <div className={styles.postHeader}>
        <div className={styles.postName}>
          <h5 className={styles.title}>{post.title}</h5>
          <div className={styles.likes}>
            <button onClick={handlerLike}>
              <img src={favorited ? likeActiveIcon : likeIcon} alt="like" className={styles.likeIcon} />
            </button>
            <span className={styles.likesCount}> {favoritesCount}</span>
          </div>
          <div className={styles.tagsContainer}>
            <ul className={styles.tagsList}>
              {post.tagList?.map((el, index) => (
                <li key={index} className={styles.tagItem}>
                  {el}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
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
          {post.author.username === userName && EditDelete}
        </div>
      </div>
      <div className="post-body">
        <p className={[styles.postBodyText, styles.textСlamp].join(' ')}>{post.description}</p>
      </div>
      <div className={styles.articleText}>
        <Markdown>{post.body}</Markdown>
      </div>
    </section>
  )
}

export default Article
