import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  tab: {
    color: 'white',
    paddingBottom: 10,
    marginLeft: 20
  }
});

const AppBar = () => {

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={TouchableWithoutFeedback}>
          <Text style={styles.tab} fontSize="subheading" fontWeight="bold">Repositories</Text>
        </Link>
        <Link to="/signin" component={TouchableWithoutFeedback}>
          <Text style={styles.tab} fontSize="subheading" fontWeight="bold">Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;