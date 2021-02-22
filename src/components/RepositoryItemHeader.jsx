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
      <Text testID="repoFullName" fontSize='subheading' fontWeight='bold'>{fullName}</Text>
      <Text testID="repoDescription" color='textSecondary'>{description}</Text>
      <Text testID="repoLanguage" style={styles.languageContainer}>{language}</Text>
    </View>
  );
};

export default RepositoryItemHeader;