import { useState } from 'react';
import { Form, Button, Typography } from 'antd';
import { LoadingOutlined, CopyOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from "@apollo/react-hooks";
import { single_comment_query, all_comment_query } from '../../pages/api/queries'
import { SingleCommentUpdate } from '../../pages/api/mutations'
import CustomSelectForComment from '../customSelect/customSelectForComment'
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
    required: '${label} is required!',
};

function SingleUserView({ commentData }) {
    const [commentBody, setCommentBody] = useState(commentData.data.body)
    let selectedPost = ''
    let deSelectedPost = ''

    const onPostTagging = (selected_Post, deSelected_Post) => {
        selectedPost = selected_Post
        deSelectedPost = deSelected_Post
    }


    const updateCache = (cache, { data }) => {
        const existingAllCommentData = cache.readQuery({ query: all_comment_query })

        const newCommentData = data.updateComment;
        cache.writeQuery({
            query: all_comment_query,
            data: { comments: [...existingAllCommentData.comments.map(comment => (comment.id == commentData.id) ? comment = newCommentData : comment)] }
        })

        cache.writeQuery({
            query: single_comment_query,
            variables: {
                _id: `${commentData.id}`
            },
            data: { comment: newCommentData }
        })

    }

    const [editUser] = useMutation(SingleCommentUpdate, {
        update: updateCache,
        onCompleted: successMessage,
        onError: errorMessage
    })

    const onFinish = values => {
        // const comment = values.comment;
        editUser({
            variables: {
                _id: `${commentData.id}`,
                payload: {
                    body: `${commentBody}`,
                },
                connect: { post_id: selectedPost },
                disconnect: { post_id: deSelectedPost }
            }
        })

    };


    return (
        <div key={commentData.id}>

            <Form {...layout} name="nest-comment" layout={'vertical'} onFinish={onFinish} validateMessages={validateMessages} initialValues={{ remember: false }}>

                <Form.Item >
                    <div style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                        <Title level={3}><Text>Edit Comment</Text></Title>
                        <Button type="primary" ghost shape="round" size="large" htmlType="submit" icon={<CopyOutlined />} >
                            Update
                        </Button>
                    </div>
                </Form.Item>
                <Form.Item name={['post', 'body']} label="Body" rules={[{ type: 'required' }]}>
                    <CKEditor
                        data={commentData.data.body}
                        onChange={(e, editor) => setCommentBody(editor.getData())}
                    />
                </Form.Item>

                <Form.Item name={['comment', 'post']} label="Post">
                    <CustomSelectForComment commentData={commentData} onPostTagging={onPostTagging} />
                </Form.Item>

            </Form>
            <div>

            </div>
        </div >
    )
};

export default function getSingleUserData({ commentId }) {
    const { loading, error, data } = useQuery(single_comment_query, {
        variables: {
            _id: `${commentId}`
        }
    })
    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <SingleUserView commentData={data.comment} />
};

