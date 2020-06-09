
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Sider } = Layout;

export default function SiteMenu({ onClickMenuItem }) {
    const menuItem = ["Users", "Posts", "Comments"]
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 1 }}
        >

            {menuItem.map((item, index) => <Menu.Item key={index + 1} onClick={e => onClickMenuItem(item)}>{item}</Menu.Item>)}
        </Menu>

    )
}
