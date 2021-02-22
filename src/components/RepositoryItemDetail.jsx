import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  detailContainer: {
    alignItems: 'center'
  }
});

const RepositoryItemDetail = ({ testID, name, count }) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text testID={testID} fontSize='subheading' fontWeight='bold'>{count}</Text>
        <Text color='textSecondary'>{name}</Text>
      </View>
    </View>
  );
};

export default RepositoryItemDetail;