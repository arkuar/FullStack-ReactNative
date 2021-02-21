import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  },
  tab: {
    color: 'white',
    paddingBottom: 10
  }
});

const AppBar = () => {

  const onPress = () => {
    console.log('press');
  };

  return <View style={styles.container}>
    <TouchableWithoutFeedback onPress={onPress}>
      <Text style={styles.tab} fontSize="subheading" fontWeight="bold">Repositories</Text>
    </TouchableWithoutFeedback>
  </View>;
};

export default AppBar;