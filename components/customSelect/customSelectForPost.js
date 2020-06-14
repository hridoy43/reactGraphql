import { LoadingOutlined } from '@ant-design/icons'
import { Select, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks'
import { all_comment_query } from '../../pages/api/queries'

const { Option } = Select;
const { Text } = Typography;


function CustomSelectForPost({ postData, allComment, onCommentTagging }) {

    const defaultValue = postData.map(post => post.id)

    const children = allComment.map(comment => <Option key={comment.id} label={comment.data.body}>{comment.data.body}</Option>) || []

    function handleChange(selectedComments) {
        const deSelectedComments = allComment.map(comment => comment.id).filter(commentID => !selectedComments.includes(commentID))
        onCommentTagging(selectedComments, deSelectedComments)
    }

    return (
        <div>
            <div>
                <Text type="secondary">Assign Comment to the post</Text>
            </div>
            <Select
                mode="multiple"
                style={{ marginTop: 3 }}
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


export default function ({ postData, onCommentTagging }) {
    const { loading, error, data } = useQuery(all_comment_query)
    if (loading) {
        return <div><center><LoadingOutlined /></center></div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <CustomSelectForPost postData={postData} allComment={data.comments} onCommentTagging={onCommentTagging} />
}


