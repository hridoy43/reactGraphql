import { useState } from 'react'
import { Form, Input, Button, Typography } from 'antd';
import { LoadingOutlined, CopyOutlined } from '@ant-design/icons'
import { all_post_query, single_post_query } from '../../pages/api/queries'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from "@apollo/react-hooks";
import { SinglePostUpdate } from '../../pages/api/mutations'
import CustomSelectForPost from '../customSelect/customSelectForPost'
import { errorMessage, successMessage } from '../message'


const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

function SinglePostView({ postData }) {
    console.log('Log: SinglePostView -> postData', postData)
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
        //onError: errorMessage
    })

    const onFinish = values => {
        const post = values.post;
        editUser({
            variables: {
                _id: `${postData.id}`,
                payload: {
                    title: `${post.title}`,
                    body: `${post.body}`
                },
                connect: { comment_ids: selectedComment },
                disconnect: { comment_ids: deSelectedComment }
            }
        })

    };


    return (
        <div key={postData.id}>
            <div>
                <Title level={3}><Text>Edit User</Text></Title>
            </div>

            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues={{ remember: false }}>
                <Form.Item initialValue={postData.data.title} name={['post', 'title']} label="Title" rules={[{ type: 'string' }]}>
                    <Input />
                </Form.Item>
                <Form.Item initialValue={postData.data.body} name={['post', 'body']} label="Body" rules={[{ type: 'string' }]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" icon={<CopyOutlined />} >
                        Update
                </Button>
                </Form.Item>
            </Form>
            <div>
                <CustomSelectForPost postData={postData.comment} onCommentTagging={onCommentTagging} />
            </div>
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

