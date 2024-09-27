import { useEffect } from 'react'
import { fetchArticles } from '../../features/articles/articlesSlice'
import PostItem from '../post-item'
import styles from './post-list.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { renderSkeletons } from './post-list-skeleton'

const PostList = () => {
  const articles = useSelector((state) => state.articles.articles)
  const currentItemOfPagination = useSelector((state) => state.articles.pagination.currentItem)
  const statusLoading = useSelector((state) => state.articles.statusLoading)
  const statusError = useSelector((state) => state.articles.statusError)
  const offset = currentItemOfPagination * 5 - 5
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticles(offset))
  }, [dispatch, offset])

  return (
    <div className="container">
      <ul className={styles.posts}>
        {!statusLoading && !statusError
          ? articles.map((el, index) => (
              <li key={index} className={styles.item}>
                <PostItem post={el} />
              </li>
            ))
          : renderSkeletons()}
      </ul>
    </div>
  )
}

export default PostList
