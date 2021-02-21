import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryItemDetail from './RepositoryItemDetail';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

const RepositoryItemDetails = ({ stars, forks, reviews, rating }) => {

  const roundCount = (count) => {
    if (count >= 1000) {
      return `${Number.parseFloat(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  return (
    <View style={styles.container}>
      <RepositoryItemDetail name='Stars' count={roundCount(stars)} />
      <RepositoryItemDetail name='Forks' count={roundCount(forks)} />
      <RepositoryItemDetail name='Reviews' count={roundCount(reviews)} />
      <RepositoryItemDetail name='Rating' count={roundCount(rating)} />
    </View>
  );
};

export default RepositoryItemDetails;