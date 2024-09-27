import { Skeleton } from 'antd'

import styles from './post-list.module.scss'

export const renderSkeletons = () => {
  return Array(5)
    .fill(0)
    .map((_, index) => (
      <li key={index} className={styles.item}>
        <Skeleton active avatar title paragraph={{ rows: 2 }} />
      </li>
    ))
}
