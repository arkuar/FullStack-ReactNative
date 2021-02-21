import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  errorStyle: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.inputStyle, error && styles.errorStyle];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;