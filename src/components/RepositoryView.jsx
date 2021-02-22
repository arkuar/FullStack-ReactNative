import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Linking, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const RepositoryView = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });

  const handlePress = () => {
    Linking.openURL(repository.url);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  const repository = data.repository;

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <TouchableWithoutFeedback onPress={handlePress}>
        <Text fontWeight="bold" style={styles.button}>Open in Github</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    color: 'white',
    margin: 15
  }
});

export default RepositoryView;