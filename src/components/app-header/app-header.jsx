import React from "react";
import { Button, Typography, ConfigProvider } from "antd";

import styles from "./app-header.module.scss";

const { Title } = Typography;

const theme = {
  token: {
    colorPrimary: "#52C41A",
    colorPrimaryHover: "#389E0D",
    colorPrimaryActive: "#237804",
    defaultGhostBorderColor: "#52C41A",
  },
};

const AppHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.nameBlog}>
        <h1>Realworld Blog</h1>
      </div>
      <nav className={styles.NavButton}>
        <Button className={styles.SignIn} type="text">
          <Title level={4} className={styles.sign}>
            Sing In
          </Title>
        </Button>
        <ConfigProvider theme={theme}>
          <Button className={styles.SignUp}>
            <Title level={4} className={styles.sign}>
              Sign Up
            </Title>
          </Button>
        </ConfigProvider>
      </nav>
    </div>
  );
};

export default AppHeader;
