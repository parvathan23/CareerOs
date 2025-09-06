import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
    mutation Register($email: String!, $password: String!, $firstName: String, $lastName: String) {
        register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
            user {
                id
                email
                firstName
                lastName
            }
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        tokenAuth(username: $email, password: $password) {
            token
            refreshExpiresIn
            payload
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation RevokeToken($refreshToken: String!) {
        revokeToken(refreshToken: $refreshToken) {
            revoked
        }
    }
`;

export const REFRESH_TOKEN_MUTATION = gql`
    mutation RefreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            token
            payload
        }
    }
`;

export const VERIFY_TOKEN_MUTATION = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

export const ME_QUERY = gql`
    query Me {
        me {
            id
            email
            firstName
            lastName
        }
    }
`;