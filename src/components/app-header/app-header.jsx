import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Typography, ConfigProvider } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { logOutUser } from '../../features/auth/authSlice'
import { setEditMode } from '../../features/articles/articlesSlice'
import { routesName } from "../../router/routes"

import styles from './app-header.module.scss'

const { Title } = Typography

const theme = {
  token: {
    colorPrimary: '#52C41A',
    colorPrimaryHover: '#389E0D',
    colorPrimaryActive: '#237804',
    defaultGhostBorderColor: '#52C41A',
  },
}

const AppHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.auth.userInfo)
  const token = useSelector((state) => state.auth.token)
  const [isError, setIsError] = useState(false)

  const hanldeLogOut = () => {
    dispatch(logOutUser())
    navigate('/sign-in')
  }

  const setMode = () => {
    dispatch(setEditMode(false))
  }

  return (
    <div className={styles.header}>
      <div className={styles.nameBlog}>
        <Link style={{ textDecoration: 'none' }} to={routesName.pathArticle}>
          <h1>Realworld Blog</h1>
        </Link>
      </div>
      {!token ? (
        <nav className={styles.NavButton}>
          <Link style={{ color: 'black' }} to={routesName.pathSignIn}>
            <Button className={styles.SignIn} type="text">
              <Title level={4} className={styles.sign}>
                Sing In
              </Title>
            </Button>
          </Link>
          <ConfigProvider theme={theme}>
            <Link to={routesName.pathSignUp} style={{ color: '#52C41A' }}>
              <Button className={styles.SignUp}>
                <Title level={4} className={styles.sign}>
                  Sign Up
                </Title>
              </Button>
            </Link>
          </ConfigProvider>
        </nav>
      ) : (
        <nav className={styles.NavButton}>
          <ConfigProvider theme={theme}>
            <Link to={routesName.pathNewArticle}>
              <Button className={styles.SignUp} onClick={setMode}>
                <Title level={4} className={styles.sign}>
                  Create article
                </Title>
              </Button>
            </Link>
          </ConfigProvider>
          <Link to={routesName.pathProfile}>
            <Button className={styles.SignIn} type="text">
              <Title level={4} className={styles.sign}>
                {userInfo?.username}
              </Title>
              <Avatar
                size={48}
                src={!isError && userInfo?.image ? userInfo.image : null}
                icon={isError || !userInfo?.image ? <UserOutlined /> : null}
                onError={() => setIsError(true)}
              />
            </Button>
          </Link>
          <Button className={styles.SignOutStyle} type="text" onClick={hanldeLogOut}>
            <Title level={4} className={styles.sign}>
              <Link style={{ color: 'black' }} to="#">
                Log Out
              </Link>
            </Title>
          </Button>
        </nav>
      )}
    </div>
  )
}

export default AppHeader
