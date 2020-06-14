
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { CommentOutlined, LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks'
import { all_comment_query } from '../../pages/api/queries'
import SingleCommentView from '../../components/dataView/commentView'


const { Sider, Content } = Layout;

function Comments({ data }) {
    const [commentId, setCommentId] = useState('')

    const onclickItem = (id) => {
        setCommentId(id)
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
                    {data && data.map((item, index) => <Menu.Item key={index + 1} onClick={e => onclickItem(item.id)} icon={<CommentOutlined />}>{item.data.body}</Menu.Item>)}
                </Menu>
            </Sider>
            <Content style={{ margin: 20, display: 'flex', justifyContent: 'flex-start' }}>
                {commentId && <SingleCommentView commentId={commentId} />}
            </Content>

        </Layout>
    )
}

const getComments = () => {
    const { loading, error, data } = useQuery(all_comment_query)

    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <Comments data={data.comments} />
}

export default getComments;
