import { message } from 'antd'

export const ErrorMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const showError = (errorContent) => {
    messageApi.open({
      type: 'error',
      content: errorContent || 'Error',
      duration: 10,
      style: {
        maxWidth: '400px',
        margin: '0 auto',
        wordWrap: 'break-word',
      },
    })
  }
  return { contextHolder, showError }
}
