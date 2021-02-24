import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

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

const styles = StyleSheet.create({
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
});

export default ReviewItem;