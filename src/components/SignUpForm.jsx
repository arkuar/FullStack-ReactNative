import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';


const initialValues = {
  username: "",
  password: "",
  passwordConfirm: ""
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required("Username is required"),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Password confirmation is required")
});

const SignUpForm = () => {
  const [submit] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await submit({ variables: { username, password } });
      await signIn({ username, password });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) =>
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <Text style={styles.submitButton} fontWeight="bold" fontSize="subheading" >Sign up</Text>
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

export default SignUpForm;