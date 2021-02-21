import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10
  }
});

const RepositoryItemIcon = ({ avatarUrl }) => <Image style={styles.tinyLogo} source={{ uri: avatarUrl }} />;

export default RepositoryItemIcon;