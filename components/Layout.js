import Head from 'next/head'
import Link from 'next/link'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';


const { Header, Content, Sider } = Layout;

export default ({ children, home }) => {
    const navKey = !home ? '2' : '1'
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header">
                <h3 className="logo">React GraphQL</h3>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[navKey]}>
                    <Menu.Item key="1">
                        <Link href="/">
                            <a >
                                Page 1
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link href="/page2">
                            <a >
                                Page 2
                            </a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <main style={{ height: '100vh' }} >
                { children }
            </main>
            <style jsx>
                {`
                .logo {
                    width: 120px;
                    height: 31px;
                    color: #fff;
                    float: left;
                    margin: 0 16px 0 0;
                  }
                  
                  .site-layout-background {
                    background: #fff;
                  }
                `}
            </style>
        </Layout>
    )
}

