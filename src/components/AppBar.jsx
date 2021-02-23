import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link, useHistory } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/queries';

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
  const { data } = useQuery(AUTHORIZE);
  const [authorized, setAuthorized] = useState(false);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  let history = useHistory();

  useEffect(() => {
    if (data && data.authorizedUser) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [data]);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={TouchableWithoutFeedback}>
          <Text style={styles.tab} fontSize="subheading" fontWeight="bold">Repositories</Text>
        </Link>
        {authorized &&
          <Link to="/createreview" component={TouchableWithoutFeedback}>
            <Text style={styles.tab} fontSize="subheading" fontWeight="bold">Create a review</Text>
          </Link>
        }
        {!authorized ?
          <Link to="/signin" component={TouchableWithoutFeedback}>
            <Text style={styles.tab} fontSize="subheading" fontWeight="bold">Sign In</Text>
          </Link> :
          <View>
            <TouchableWithoutFeedback onPress={signOut}>
              <Text style={styles.tab} fontSize="subheading" fontWeight="bold">Sign out</Text>
            </TouchableWithoutFeedback>
          </View>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;