import Head from 'next/head'
import React, { useState } from 'react'

import MainLayout from '../components/Layout'
import { Row, Col, Layout, Menu, } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import SiteMenu from '../components/SiteMenu'
import Users from '../components/subMenu/Users'
import Posts from '../components/subMenu/Posts'
import Comments from '../components/subMenu/Comments'


const { Header, Content, Sider } = Layout;

export default function Home() {
  const [menuItem, setMenuItem] = useState("Users")

  const onClickMenuItem = (value) => {
    setMenuItem(value)
  }
  return (
    <>
      <MainLayout home>
        <Layout>
          <Sider style={{ paddingRight: 1, overflow: 'auto', height: '100vh', }}>
            <SiteMenu onClickMenuItem={onClickMenuItem} />
          </Sider>
          <Sider style={{ paddingRight: 1, overflow: 'auto', height: '100vh', }}>
            {menuItem === "Users" && <Users /> || menuItem === "Posts" && <Posts /> || menuItem === "Comments" && <Comments />}
          </Sider>
          <Content>
            <h2>hello</h2>
          </Content>
        </Layout>
      </MainLayout >

      <style jsx>
        {`
          .sider-layout {
            paddingRight: 1,
            overflow: 'auto',
            height: '100vh',
          }
        `}
      </style>
    </>
  )
}
