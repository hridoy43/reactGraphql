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
      body,
      title
    }
  }
}`


