import React from 'react';
import { FlatList, Linking, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';

const RepositoryInfo = ({ repository }) => {
  const handlePress = () => {
    Linking.openURL(repository.url);
  };

  if (!repository) return <Text>loading...</Text>;

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <TouchableWithoutFeedback onPress={handlePress}>
        <Text fontWeight="bold" style={styles.button}>Open in Github</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};


const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id,
    first: 5
  });

  const reviews = repository && repository.reviews
    ? repository.reviews.edges.map(e => e.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
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
});

export default SingleRepository;