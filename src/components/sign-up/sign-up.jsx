import { Button, Form, Input, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import { ErrorMessage } from '../error-message/error-message'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { setError } from '../../features/auth/authSlice'

import styles from './sing-up.module.scss'

const SignUp = () => {
  const singIn = '/sign-in'
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userError = useSelector((state) => state.auth.error)
  const userInfo = useSelector((state) => state.auth.userInfo)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const onFinish = ({ username, email, password }) => {
    const userData = {
      user: {
        username,
        email,
        password,
      },
    }

    console.log('Success:', userData)
    dispatch(registerUser(userData))
    setRegistrationSuccess(true)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const { contextHolder, showError } = ErrorMessage()

  useEffect(() => {
    if (userError) {
      console.log(userError)
      showError(userError)
    } else if (userInfo && registrationSuccess) {
      navigate('/sign-in')
    }
    return () => {
      dispatch(setError(null))
    }
  }, [dispatch, userError, showError, navigate, userInfo, registrationSuccess])

  return (
    <section className={styles.form}>
      {contextHolder}
      <h1>Create new account</h1>
      <Form
        name="basic"
        layout="vertical"
        size="large"
        labelCol={{
          span: 10,
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Username is required',
            },
            {
              min: 3,
              max: 20,
              message: 'Username must be between 3 and 20 characters',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

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
            {
              min: 6,
              max: 40,
              message: 'Password must be between 6 and 40 characters',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Repeat Password"
          name="repeat password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Passwords must match'))
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 25 }}
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('You must agree to the processing of your personal information!')),
            },
          ]}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button size={'large'} type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.bottomForm}>
        <p>
          Already have an account?{' '}
          <Link to={singIn} className={styles.noUnderline}>
            Sign In
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

export default SignUp
