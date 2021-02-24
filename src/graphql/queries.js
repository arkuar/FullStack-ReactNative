import { gql } from 'apollo-boost';
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query AllRepositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $after: String,
    $first: Int
    ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      after: $after,
      first: $first
      ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor,
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const AUTHORIZE = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
      authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryDetails
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`;