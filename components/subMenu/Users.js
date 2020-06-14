
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks'
import { UsersQuery } from '../../pages/api/queries'
import SingleUserView from '../../components/dataView/userView'
import { Empty } from 'antd'


const { Sider, Content } = Layout;

function Users({ data }) {
    const [userId, setUserId] = useState('')

    const onclickItem = (id) => {
        setUserId(id)
    }

    return (
        <Layout style={{ backgroundColor: '#fff' }}>
            <Sider style={{ borderRight: '1px solid #001529', overflow: 'hidden', height: '100vh', backgroundColor: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['0']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {data && data.map((item, index) => <Menu.Item key={index + 1} onClick={e => onclickItem(item.id)} icon={<UserOutlined />}>{item.data.name}</Menu.Item>)}
                </Menu>
            </Sider>
            <Content style={{ margin: 20 }}>
                {userId && <SingleUserView userId={userId} /> || <Empty />}
            </Content>

        </Layout>
    )
}

const getUsers = () => {
    const { loading, error, data } = useQuery(UsersQuery)

    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <Users data={data.users} />
}

export default getUsers;
