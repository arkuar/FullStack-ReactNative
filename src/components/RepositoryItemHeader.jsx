import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  infoContainer: {
    flexGrow: 1,
    marginBottom: 15,
    flexShrink: 1
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    color: 'white'
  },
});

const RepositoryItemHeader = ({ fullName, description, language }) => {
  return (
    <View style={styles.infoContainer}>
      <Text fontSize='subheading' fontWeight='bold'>{fullName}</Text>
      <Text color='textSecondary'>{description}</Text>
      <Text style={styles.languageContainer}>{language}</Text>
    </View>
  );
};

export default RepositoryItemHeader;