import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setSignIn } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import { ErrorMessage } from '../error-message/error-message'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { setError } from '../../features/auth/authSlice'

import styles from './sign-in.module.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userError = useSelector((state) => state.auth.error)
  const userInfo = useSelector((state) => state.auth.userInfo)
  const [signInSuccess, setSignInSuccess] = useState(false)

  const { contextHolder, showError } = ErrorMessage()

  const onFinish = (values) => {
    const userData = {
      user: {
        email: values.email,
        password: values.password,
      },
    }
    console.log('Success:', userData)
    dispatch(loginUser(userData))
    console.log('userError: ', userError)
    if (!userError) {
      setSignInSuccess(true)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (userError) {
      console.log(userError)
      showError(userError)
    } else if (userInfo && signInSuccess) {
      dispatch(setSignIn(true))
      navigate('/articles')
    }
    return () => {
      dispatch(setError(null))
    }
  }, [dispatch, userError, showError, navigate, userInfo, signInSuccess])

  return (
    <section className={styles.form}>
      {contextHolder}
      <h1>Sign In</h1>
      <Form
        name="basic"
        layout="vertical"
        size="large"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            {
              required: true,
              message: 'Email address is required',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button size={'large'} type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.bottomForm}>
        <p>
          Don’t have an account?{' '}
          <Link to="/sign-up" className={styles.noUnderline}>
            Sign Up
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

export default SignIn
