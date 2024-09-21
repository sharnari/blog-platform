import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

import styles from "./sign-in.module.scss";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SignIn = () => {
  return (
    <section className={styles.form}>
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
              message: "Email address is required",
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
              message: "Please input your password!",
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
          <Button size={"large"} type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.bottomForm}>
        <p>
          Don’t have an account? <Link to="/sign-up" className={styles.noUnderline}>Sign Up</Link>.
        </p>
      </div>
    </section>
  );
};

export default SignIn;
