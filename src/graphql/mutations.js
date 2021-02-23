import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    authorize(credentials: {username: $username, password: $password}) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($name: String!, $owner: String!, $rating: Int!, $review: String) {
    createReview(review: {repositoryName: $name, ownerName: $owner, rating: $rating, text: $review}) {
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: {username: $username, password: $password}) {
      username
    }
  }
`;