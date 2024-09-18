import React from "react";
import { Button, Typography, ConfigProvider } from "antd";
import { Link } from "react-router-dom";

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
        <Link style={{textDecoration: 'none'}} to="articles">
          <h1>Realworld Blog</h1>
        </Link>
      </div>
      <nav className={styles.NavButton}>
        <Button className={styles.SignIn} type="text">
          <Title level={4} className={styles.sign}>
            <Link style={{color: 'black'}} to='sign-in'>Sing In</Link>
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
