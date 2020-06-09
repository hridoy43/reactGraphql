
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Sider } = Layout;

export default function Users() {
    return (

        <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key="1" icon={<UserOutlined />}>Users</Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>Users</Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>Users</Menu.Item>
        </Menu>


    )
}
