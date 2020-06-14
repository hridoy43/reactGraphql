import gql from 'graphql-tag'

export const UsersQuery = gql`
query getAllUser{
  users {
    id,
    data {
      name,
      address
    }
  }
}`;

export const SingleUserQuery = gql`
query getSingleUserData($_id: String!){
user(_id:$_id){
  id,
  data {
      name,
      address
    },
  post {
      id,
      data {
        body
        title
      }
    }
  }
}`;

export const all_post_query = gql`
query getAllPost {
  posts {
    id,
    data {
      title
    }
  }
}`

export const single_post_query = gql`
query getSinglePostData($_id: String!) {
  post(_id: $_id) {
    id
    data {
      body
      title
    }
    comment {
      id
      data {
        body
      }
    }
  }
}`

export const all_comment_query = gql`
query getAllComment {
  comments {
    id,
    data {
      body
    }
  }
}`

export const single_comment_query = gql`
query getSingleCommentData($_id: String!) {
  comment(_id: $_id) {
    id,
    data {
      body
    }
    post {
      id,
      data {
        title
      }
    }
  }
}`

