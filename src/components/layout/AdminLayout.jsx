import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { CgEditUnmask } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { TbBasket } from "react-icons/tb";
import { HiOutlineCreditCard } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import "./AdminLayout.scss";
import { AuthUser } from "../../utils/auth";

const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
  const auth = AuthUser();
  const [current, setCurrent] = useState("0");
  const menus = [
    { to: "home", icon: <SlSettings /> },
    { to: "allproduct", icon: <FaRegUserCircle /> },
    { to: "basket", icon: <TbBasket /> },
    { to: "products/card", icon: <HiOutlineCreditCard /> },
  ];

   const handleLogout = () => {
    auth.logout();
  };
  return (
    <Layout>
      <Sider
        style={{
          background: "#5B5CE2",
        }}
        trigger={null}
        collapsible
        collapsed={true}
      >
        <NavLink to="/">
          <div className="logo">
            <CgEditUnmask />
          </div>
        </NavLink>
        {auth.user && (
          <Menu
            style={{
              height: "100vh",
              background: "#5B5CE2",
              marginTop: "40px",
            }}
            theme="dark"
            mode="inline"
            selectedKeys={[current]}
            items={menus.map((menu, i) => ({
              key: "" + i,
              icon: <Link to={"/" + menu.to}>{menu.icon}</Link>,
              label: menu.name,
              onClick: ({ key }) => setCurrent(key),
            }))}
          />
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            background: "white",
            height: "80px",
          }}
        >
          <div className="navbar">
            <div className="navbar-left">
              <div className="navbar-left__content">
                <h5>Товары</h5>
              </div>
              <div className="navbar-left__link">
                {auth.user && (
                  <>
                    <NavLink to="/" className="nav-link">
                      Главная /
                    </NavLink>
                    <NavLink to="/" className="nav-link">
                      Товары
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="navbar-right">
              {!auth.user && (
                <NavLink to="/" className="nav-button">
                  Login
                </NavLink>
              )}
              {auth.user && (
                <NavLink className="nav-button" to="/" onClick={handleLogout}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_171_8053)">
                      <rect
                        x="6"
                        width="14"
                        height="20"
                        rx="2"
                        fill="#E3E3EA"
                      />
                      <path
                        d="M14 10L10 6M14 10L10 14M14 10H1"
                        stroke="#A4A4BA"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_171_8053">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Выйти
                </NavLink>
              )}
            </div>
          </div>
        </Header>
        <Content
          style={{
            height: "548px",
            margin: "30px 48px 48px 30px",
            background: "white",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
