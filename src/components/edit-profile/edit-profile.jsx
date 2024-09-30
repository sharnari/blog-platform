import { Button, Form, Input } from 'antd'
import { ErrorMessage } from '../error-message/error-message'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setError, updateUser } from '../../features/auth/authSlice'

import styles from './edit-profile.module.scss'

const EditProfile = () => {
  const dispatch = useDispatch()
  const { contextHolder, showError } = ErrorMessage()
  const userError = useSelector((state) => state.auth.error)
  const userInfo = useSelector((state) => state.auth.userInfo)
  const [form] = Form.useForm()
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = (values) => {
    const userData = {
      user: {
        username: values.username,
        email: values.email,
        password: values.password,
        image: values.url,
      },
    }
    console.log('Success:', userData)
    dispatch(updateUser(userData)).then(() => {
      form.resetFields(['password'])
    })
  }

  useEffect(() => {
    if (userError) {
      console.log(userError)
      showError(userError)
    }
    return () => {
      dispatch(setError(null))
    }
  }, [dispatch, userError, showError])

  useEffect(() => {
    form.setFieldsValue({
      username: userInfo?.username || '',
      email: userInfo?.email || '',
    })
  }, [userInfo, form])

  return (
    <section className={styles.form}>
      {contextHolder}
      <h1>Edit Profile</h1>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        size="large"
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          username: userInfo?.username || '',
          email: userInfo?.email || '',
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
          <Input type="email" placeholder="Email address" />
        </Form.Item>
        <Form.Item
          label="New password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Input new password!',
            },
            {
              min: 6,
              max: 40,
              message: 'Password must be between 6 and 40 characters',
            },
          ]}
        >
          <Input.Password type="password" placeholder="New password" />
        </Form.Item>
        <Form.Item
          label="Avatar image (url)"
          name="url"
          rules={[
            {
              type: 'url',
              message: 'Please enter a valid URL',
            },
          ]}
        >
          <Input type="url" placeholder="Avatar image" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button size={'large'} type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

export default EditProfile
