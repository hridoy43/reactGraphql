import gql from 'graphql-tag'

export const SingleUserUpdate = gql`
mutation($_id: String!, $payload: user_input_payload!,$connect: user_input_connection_payload!,$disconnect: user_input_disconnection_payload!){
  updateUser(_id:$_id,payload:$payload,connect:$connect,disconnect:$disconnect){
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
}
`;


export const SinglePostUpdate = gql`
mutation($_id: String!, $payload: post_input_payload!,$connect: post_input_connection_payload!,$disconnect: post_input_disconnection_payload!){
  updatePost(_id:$_id,payload:$payload,connect:$connect,disconnect:$disconnect){
    id,
    data {
      body,
      title
    }
    comment {
      id,
      data {
        body
      }
    }
  }
}
`;