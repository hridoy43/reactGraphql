
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Sider } = Layout;

export default function Posts() {
    return (

        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key="1" icon={<UserOutlined />}>Users</Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>Users</Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>Users</Menu.Item>
        </Menu>


    )
}
