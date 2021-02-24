import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...prev.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      }
    });
  };

  return {
    repository: data && data.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepository;