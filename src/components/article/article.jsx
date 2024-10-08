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
import { routesName } from "../../router/routes"

import styles from './article.module.scss'

const Article = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const post = useSelector((state) => state.articles.currentArticle)
  const userName = useSelector((state) => state.auth.userInfo?.username)
  const token = useSelector((state) => state.auth.token)
  const [isError, setIsError] = useState(false)

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

  const handlerLike = async () => {
    let success = false
    if (favorited) {
      success = dispatch(fetchDeleteLike(post.slug))
      if (success) {
        setFavoritesCount((prevCount) => prevCount - 1)
      }
    } else {
      success = dispatch(fetchSetLike(post.slug))
      if (success) {
        setFavoritesCount((prevCount) => prevCount + 1)
      }
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
          navigate(`/${routesName.pathArticle}/${slug}/edit`)
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
            {token ? (
              <button className={styles.hiddenButton} onClick={handlerLike}>
                <img src={favorited ? likeActiveIcon : likeIcon} alt="like" className={styles.likeIcon} />
              </button>
            ) : (
              <img src={favorited ? likeActiveIcon : likeIcon} alt="like" className={styles.likeIcon} />
            )}
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
              src={!isError && post.author?.image ? post.author.image : null}
            icon={isError || !post.author?.image ? <UserOutlined /> : null}
            onError={() => setIsError(true)}
              
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
