import gql from 'graphql-tag'

export const SingleUserUpdate = gql`
mutation($_id: String!, $payload: user_input_payload!,$connect: user_input_connection_payload,$disconnect: user_input_disconnection_payload){
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