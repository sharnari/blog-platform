import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, ConfigProvider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { logOutUser } from "../../features/auth/authSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInAuth = useSelector((state) => state.auth.signInAuth);
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log('Польльзователь зарегистирован: ', signInAuth);

  const hanldeLogOut = () => {
    dispatch(logOutUser());
    navigate("/sign-in")

  };

  return (
    <div className={styles.header}>
      <div className={styles.nameBlog}>
        <Link style={{ textDecoration: "none" }} to="articles">
          <h1>Realworld Blog</h1>
        </Link>
      </div>
      {!signInAuth ? (
        <nav className={styles.NavButton}>
          <Link style={{ color: "black" }} to="sign-in">
            <Button className={styles.SignIn} type="text">
              <Title level={4} className={styles.sign}>
                Sing In
              </Title>
            </Button>
          </Link>
          <ConfigProvider theme={theme}>
            <Link to="sign-up" style={{ color: "#52C41A" }}>
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
            <Button className={styles.SignUp}>
              <Title level={4} className={styles.sign}>
                <Link to="#" style={{ color: "#52C41A" }}>
                  Create article
                </Link>
              </Title>
            </Button>
          </ConfigProvider>
          <Link to="profile">
            <Button className={styles.SignIn} type="text">
              <Title level={4} className={styles.sign}>
                {userInfo?.username}
              </Title>
              <Avatar
                size={48}
                src={userInfo?.image ? userInfo.image : null}
                icon={!userInfo?.image ? <UserOutlined /> : null}
              />
            </Button>
          </Link>
          <Button
            className={styles.SignOutStyle}
            type="text"
            onClick={hanldeLogOut}
          >
            <Title level={4} className={styles.sign}>
              <Link style={{ color: "black" }} to="#">
                Log Out
              </Link>
            </Title>
          </Button>
        </nav>
      )}
    </div>
  );
};

export default AppHeader;
