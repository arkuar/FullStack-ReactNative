import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryItemDetail from './RepositoryItemDetail';

import { roundCount } from '../utils/utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

const RepositoryItemDetails = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={styles.container}>
      <RepositoryItemDetail testID="repoStars" name='Stars' count={roundCount(stars)} />
      <RepositoryItemDetail testID="repoForks" name='Forks' count={roundCount(forks)} />
      <RepositoryItemDetail testID="repoReviews" name='Reviews' count={roundCount(reviews)} />
      <RepositoryItemDetail testID="repoRating" name='Rating' count={roundCount(rating)} />
    </View>
  );
};

export default RepositoryItemDetails;