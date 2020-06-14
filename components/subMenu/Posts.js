
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { PicRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks'
import { all_post_query } from '../../pages/api/queries'
import SinglePostView from '../../components/dataView/postView'


const { Sider, Content } = Layout;

function Posts({ data }) {
    const [postId, setPostId] = useState('')

    const onclickItem = (id) => {
        setPostId(id)
        console.log(id);
    }

    return (
        <Layout>
            <Sider style={{ borderRight: '1px solid #001529', overflow: 'hidden', height: '100vh', backgroundColor: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['0']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {data && data.map((item, index) => <Menu.Item key={index + 1} onClick={e => onclickItem(item.id)} icon={<PicRightOutlined />}>{item.data.title}</Menu.Item>)}
                </Menu>
            </Sider>
            <Content style={{ margin: 20, display: 'flex', justifyContent: 'flex-start' }}>
                {postId && <SinglePostView postId={postId} />}
            </Content>

        </Layout>
    )
}

const getPosts = () => {
    const { loading, error, data } = useQuery(all_post_query)

    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <Posts data={data.posts} />
}

export default getPosts;
