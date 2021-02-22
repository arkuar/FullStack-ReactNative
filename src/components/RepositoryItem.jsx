import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryItemIcon from './RepositoryItemIcon';
import RepositoryItemDetails from './RepositoryItemDetails';

const styles = StyleSheet.create({
  flexContainer: {
    alignItems: 'stretch',
    padding: 15,
    backgroundColor: 'white'
  },
  headerContainer: {
    flexDirection: 'row',
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.headerContainer}>
        <RepositoryItemIcon avatarUrl={item.ownerAvatarUrl} />
        <RepositoryItemHeader
          fullName={item.fullName}
          description={item.description}
          language={item.language}
        />
      </View>
      <RepositoryItemDetails
        stars={item.stargazersCount}
        forks={item.forksCount}
        reviews={item.reviewCount}
        rating={item.ratingAverage}
      />
    </View >
  );
};

export default RepositoryItem;