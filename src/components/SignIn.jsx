import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: "",
  password: ""
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Username is required'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
});

export const SignInContainer = ({ onSubmit }) => (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    {({ handleSubmit }) =>
      <View style={styles.container}>
        <FormikTextInput testID="usernameField" name="username" placeholder="Username" />
        <FormikTextInput testID="passwordField" name="password" placeholder="Password" secureTextEntry />
        <TouchableWithoutFeedback testID="submitButton" onPress={handleSubmit}>
          <Text style={styles.submitButton} fontWeight="bold" fontSize="subheading">Sign in</Text>
        </TouchableWithoutFeedback>
      </View>
    }
  </Formik>
);

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
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

export default SignIn;