import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import React from 'react';
import { ActivityIndicator, FlatList, Linking, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const RepositoryInfo = ({ repository }) => {
  const handlePress = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <TouchableWithoutFeedback onPress={handlePress}>
        <Text fontWeight="bold" style={styles.button}>Open in Github</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewScore}>
        <Text color="primary" fontWeight="bold">{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const repository = data.repository;

  const reviews = repository.reviews
    ? repository.reviews.edges.map(e => e.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    color: 'white',
    margin: 15
  },
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
    alignItems: 'stretch',
    flexDirection: 'row',
    padding: 10
  },
  reviewScore: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewContent: {
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 10
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }
});

export default SingleRepository;