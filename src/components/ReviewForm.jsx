import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import { CREATE_REVIEW } from '../graphql/mutations';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const initialValues = {
  owner: "",
  name: "",
  rating: undefined,
  review: ""
};

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required("Repository owner name is required"),
  name: yup
    .string()
    .required("Repository name is required"),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .integer("Rating must be an integer")
    .required("Rating is required"),
  review: yup
    .string()
    .optional()
});

const ReviewForm = () => {
  let history = useHistory();
  const [submit] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    console.log(values);
    const { name, owner, rating, review } = values;
    try {
      const { data } = await submit({ variables: { name, owner, rating: +rating, review } });
      history.push(`/repositories/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) =>
        <View style={styles.container}>
          <FormikTextInput name="owner" placeholder="Repository owner name" />
          <FormikTextInput name="name" placeholder="Repository name" />
          <FormikTextInput keyboardType="numeric" name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="review" placeholder="Review" multiline />
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <Text style={styles.submitButton} fontWeight="bold" fontSize="subheading" >Create a review</Text>
          </TouchableWithoutFeedback>
        </View>
      }
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    color: 'white'
  }
});

export default ReviewForm;