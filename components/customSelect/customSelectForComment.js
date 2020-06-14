import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Select, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks'
import { all_post_query } from '../../pages/api/queries'

const { Option } = Select;
const { Title, Text } = Typography;


function CustomSelectForComment({ commentData, allPost, onPostTagging }) {

    const defaultValue = commentData.post.id

    const children = allPost.map(post => <Option key={post.id} label={post.data.title}>{post.data.title}</Option>) || []

    function handleChange(selectedPost) {
        if (selectedPost != defaultValue) onPostTagging(selectedPost, defaultValue)
    }

    return (
        <div>
            <div><Title level={4}><Text strong>Post</Text></Title>
                <Text type="secondary">Assign post to the comment</Text>
            </div>
            <Select
                mode="single"
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


export default function ({ commentData, onPostTagging }) {
    const { loading, error, data } = useQuery(all_post_query)
    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <CustomSelectForComment commentData={commentData} allPost={data.posts} onPostTagging={onPostTagging} />
}


