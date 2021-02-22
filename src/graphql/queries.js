import { gql } from 'apollo-boost';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const AUTHORIZE = gql`
  query {
      authorizedUser {
      id
      username
    }
  }
`;