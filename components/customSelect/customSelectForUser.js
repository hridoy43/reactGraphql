import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Select, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks'
import { all_post_query } from '../../pages/api/queries'

const { Option } = Select;
const { Title, Text } = Typography;


function CustomSelectForUser({ userPostData, allPost, onPostTagging }) {

    const defaultValue = userPostData.map(post => post.id)

    const children = allPost.map(post => <Option key={post.id} label={post.data.title}>{post.data.title}</Option>) || []

    function handleChange(selectedPost) {
        const deSelectedPost = allPost.map(post => post.id).filter(postID => !selectedPost.includes(postID))
        onPostTagging(selectedPost, deSelectedPost)
    }

    return (
        <div>
            <div><Title level={4}><Text strong>Posts</Text></Title>
                <Text type="secondary">Tag post to the users</Text>
            </div>
            <Select
                mode="multiple"
                style={{ width: '350px' }}
                placeholder="Please select"
                defaultValue={defaultValue}
                onChange={handleChange}
                optionFilterProp="label"
            >
                {children}
            </Select>
        </div>
    )
};


export default function ({ userPostData, onPostTagging }) {
    const { loading, error, data } = useQuery(all_post_query)
    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <CustomSelectForUser userPostData={userPostData} allPost={data.posts} onPostTagging={onPostTagging} />
}


