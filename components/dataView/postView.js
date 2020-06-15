import { useState } from 'react'
import { Form, Input, Button, Typography } from 'antd';
import { LoadingOutlined, CopyOutlined } from '@ant-design/icons'
import { all_post_query, single_post_query } from '../../pages/api/queries'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from "@apollo/react-hooks";
import { SinglePostUpdate } from '../../pages/api/mutations'
import CustomSelectForPost from '../customSelect/customSelectForPost'
import { errorMessage, successMessage } from '../message'
import dynamic from 'next/dynamic'

const CKEditor = dynamic(() => import('../../utils/CkEditor'), {
    ssr: false
})


const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};

const validateMessages = {
    types: {
        string: '${label} is not validate String!',
    }
};

function SinglePostView({ postData }) {
    const [postBody, setPostBody] = useState(postData.data.body)
    let selectedComment = []
    let deSelectedComment = []

    const onCommentTagging = (selected_comment, deSelected_comment) => {
        selectedComment = selected_comment
        deSelectedComment = deSelected_comment
    }


    const updateCache = (cache, { data }) => {
        const existingAllPostData = cache.readQuery({ query: all_post_query })

        const updatedPostData = data.updatePost;
        cache.writeQuery({
            query: all_post_query,
            data: { posts: [...existingAllPostData.posts.map(post => (post.id == postData.id) ? post = updatedPostData : post)] }
        })

        cache.writeQuery({
            query: single_post_query,
            variables: {
                _id: `${postData.id}`
            },
            data: { post: updatedPostData }
        })

    }

    const [editUser] = useMutation(SinglePostUpdate, {
        update: updateCache,
        onCompleted: successMessage,
        onError: errorMessage
    })

    const onFinish = values => {
        const post = values.post;
        editUser({
            variables: {
                _id: `${postData.id}`,
                payload: {
                    title: `${post.title}`,
                    body: `${postBody}`
                },
                connect: { comment_ids: selectedComment },
                disconnect: { comment_ids: deSelectedComment }
            }
        })

    };


    return (
        <div key={postData.id}>


            <Form {...layout} name="nest-post" layout={'vertical'} onFinish={onFinish} validateMessages={validateMessages} initialValues={{ remember: false }}>
                <Form.Item>
                    <div style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                        <Title level={3}><Text>Edit User</Text></Title>
                        <Button type="primary" ghost shape="round" size="large" htmlType="submit" icon={<CopyOutlined />} >
                            Update
                </Button>
                    </div>
                </Form.Item>
                <Form.Item initialValue={postData.data.title} name={['post', 'title']} label="Title" rules={[{ type: 'string' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['post', 'body']} label="Body">
                    <CKEditor
                        data={postData.data.body}
                        onChange={(e, editor) => setPostBody(editor.getData())}
                    />
                </Form.Item>
                <Form.Item name={['post', 'comment']} label="Comments">
                    <CustomSelectForPost postData={postData.comment} onCommentTagging={onCommentTagging} />
                </Form.Item>

            </Form>
        </div >
    )
};

export default function getSingleUserData({ postId }) {
    const { loading, error, data } = useQuery(single_post_query, {
        variables: {
            _id: `${postId}`
        }
    })
    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <SinglePostView postData={data.post} />
};

