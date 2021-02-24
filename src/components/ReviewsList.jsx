import React from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AUTHORIZE } from "../graphql/queries";
import { Alert, FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import Text from './Text';
import theme from '../theme';
import { useHistory } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    color: 'white'
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  }
});

const ReviewItemWithButtons = ({ review, refetch }) => {
  let history = useHistory();
  const [mutate] = useMutation(DELETE_REVIEW);

  const viewRepo = () => {
    history.push(`/repositories/${review.repositoryId}`);
  };

  const deleteReview = () => {
    Alert.alert('Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await mutate({ variables: { id: review.id} });
              refetch();
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ReviewItem review={review} />
      <View style={styles.buttonContainer} >
        <TouchableWithoutFeedback onPress={viewRepo}>
          <Text style={[styles.button, styles.viewButton]} fontWeight="bold">View repository</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={deleteReview}>
          <Text style={[styles.button, styles.deleteButton]}>Delete review</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const ReviewList = () => {
  const { data, refetch } = useQuery(AUTHORIZE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true
    }
  });

  const reviews = data
    ? data.authorizedUser.reviews.edges.map(e => e.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItemWithButtons review={item} refetch={refetch} />}
    />
  );
};

export default ReviewList;