import { useState } from 'react'
import { Form, Input, Button, Typography } from 'antd';
import { LoadingOutlined, CopyOutlined } from '@ant-design/icons'
import { SingleUserQuery, UsersQuery } from '../../pages/api/queries'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from "@apollo/react-hooks";
import { SingleUserUpdate } from '../../pages/api/mutations'
import CustomSelectForUser from '../customSelect/customSelectForUser'
import { errorMessage, successMessage } from '../message'



const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};

const validateMessages = {
    required: '${label} is required!',
};

function SingleUserView({ userData }) {
    let selectedPost = []
    let deSelectedPost = []

    const onPostTagging = (selected_Post, deSelected_Post) => {
        selectedPost = selected_Post
        deSelectedPost = deSelected_Post
    }


    const updateCache = (cache, { data }) => {
        const existingAllUserData = cache.readQuery({ query: UsersQuery })
        const newUserData = data.updateUser;

        cache.writeQuery({
            query: UsersQuery,
            data: { users: [...existingAllUserData.users.map(user => (user.id == userData.id) ? newUserData : user)] }
        })

        cache.writeQuery({
            query: SingleUserQuery,
            variables: {
                _id: `${userData.id}`
            },
            data: { user: newUserData }
        })

    }

    const [editUser] = useMutation(SingleUserUpdate, {
        update: updateCache,
        onCompleted: successMessage,
        onError: errorMessage
    })

    const onFinish = values => {
        const user = values.user;
        editUser({
            variables: {
                _id: `${userData.id}`,
                payload: {
                    name: `${user.name}`,
                    address: `${user.address}`
                },
                connect: { post_ids: selectedPost },
                disconnect: { post_ids: deSelectedPost }
            }
        })

    };


    return (
        <div key={userData.id}>

            <Form {...layout} name="nest-user" layout={'vertical'} onFinish={onFinish} validateMessages={validateMessages} initialValues={{ remember: false }}>
                <Form.Item >
                    <div style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                        <Title level={3}><Text>Edit User</Text></Title>
                        <Button type="primary" ghost shape="round" size="large" htmlType="submit" icon={<CopyOutlined />} >
                            Update
                    </Button>
                    </div>
                </Form.Item>
                <Form.Item initialValue={userData.data.name} name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item initialValue={userData.data.address} name={['user', 'address']} label="Address" rules={[{ type: 'string' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['comment', 'post']} label="Post">
                    <CustomSelectForUser userPostData={userData.post} onPostTagging={onPostTagging} />
                </Form.Item>
            </Form>

        </div >
    )
};

export default function getSingleUserData({ userId }) {
    const { loading, error, data } = useQuery(SingleUserQuery, {
        variables: {
            _id: `${userId}`
        }
    })
    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <SingleUserView userData={data.user} />
};

