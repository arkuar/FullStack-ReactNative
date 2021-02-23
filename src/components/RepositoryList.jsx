import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import DropDownPicker from 'react-native-dropdown-picker';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Dropdown = ({ onSortChange }) => {

  return (
    <View>
      <DropDownPicker
        style={{ padding: 20, height: 50 }}
        onChangeItem={onSortChange}
        defaultValue={'latest'}
        containerStyle={{ height: 50 }}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        items={[
          { label: 'Latest repositories', value: 'latest' },
          { label: 'Highest rated repositories', value: 'highest' },
          { label: 'Lowest rated repositories', value: 'lowest' },
        ]}
      />
    </View>
  );
};

const sortParams = (active) => {
  switch (active) {
    case "highest":
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case "lowest":
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    default:
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }
};

export const RepositoryListContainer = ({ repositories, onSortChange }) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (id) => {
    history.push(`/repositories/${id}`);
  };

  return (
    <View>
      <Dropdown onSortChange={onSortChange} />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <TouchableOpacity onPress={() => handlePress(item.id)}><RepositoryItem item={item} /></TouchableOpacity>}
      />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sort, setSort] = useState();
  const { orderBy, orderDirection } = sortParams(sort);
  const { repositories } = useRepositories({
    orderBy,
    orderDirection
  });

  const onSortChange = ({ value }) => {
    setSort(value);
  };

  return (
    <RepositoryListContainer repositories={repositories} onSortChange={onSortChange} />
  );
};

export default RepositoryList;