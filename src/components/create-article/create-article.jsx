import { useEffect } from 'react'
import { Button, Form, Input, Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMakeArticle, fetchUpdateArticle } from '../../features/articles/articlesSlice'
import { setCurrentArticle } from '../../features/articles/articlesSlice'
import { useNavigate } from 'react-router-dom'

import styles from './create-article.module.scss'

const CreateArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modeEdit = useSelector((state) => state.articles.modeEdit)
  const currentArticle = useSelector((state) => state.articles.currentArticle)
  const [form] = Form.useForm()
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = (values) => {
    const tagsArray = values.tags ? values.tags.map((tag) => tag || '') : []
    const userData = {
      article: {
        title: values.title,
        description: values.description,
        body: values.text,
        tagList: tagsArray,
      },
    }

    console.log('Success:', userData)
    modeEdit
      ? dispatch(fetchUpdateArticle({ articleData: userData, slug: currentArticle.slug }))
      : dispatch(fetchMakeArticle(userData)).then(() => {
          navigate('/')
        })
  }

  useEffect(() => {
    if (modeEdit && currentArticle) {
      form.setFieldsValue({
        title: currentArticle.title,
        description: currentArticle.description,
        text: currentArticle.body,
        tags: currentArticle.tagList || [],
      })
    } else {
      form.resetFields()
    }
  }, [modeEdit, currentArticle, form])

  useEffect(() => {
    return () => {
      setCurrentArticle(false)
    }
  })

  return (
    <section className={styles.form}>
      <h1>{modeEdit ? 'Edit Article' : 'Create new article'}</h1>
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Title is required',
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Short description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Description is required',
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Text"
          name="text"
          rules={[
            {
              required: true,
              message: 'Text is required',
            },
          ]}
        >
          <Input.TextArea placeholder="Text" autoSize={{ minRows: 6 }} />
        </Form.Item>
        <Form.Item
          label="Tags"
          wrapperCol={{
            offset: 0,
            span: 8,
          }}
        >
          <Form.List name="tags">
            {(fields, { add, remove }) => (
              <Flex gap={15}>
                <Flex gap={15} vertical>
                  {fields.map((field) => (
                    <Flex key={field.key} gap={15}>
                      <Form.Item name={[field.name]} style={{ margin: 0 }}>
                        <Input placeholder="Tag" style={{ width: 250 }} />
                      </Form.Item>
                      <Button type="primary" danger ghost size="large" onClick={() => remove(field.name)}>
                        Delete
                      </Button>
                    </Flex>
                  ))}
                </Flex>
                <Button type="primary" ghost size="large" onClick={() => add()} style={{ alignSelf: 'flex-end' }}>
                  Add tag
                </Button>
              </Flex>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 8,
          }}
        >
          <Button size={'large'} type="primary" htmlType="submit" block>
            Send
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

export default CreateArticle
