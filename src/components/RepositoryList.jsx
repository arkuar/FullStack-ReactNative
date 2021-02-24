import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDebouncedCallback } from 'use-debounce/lib';
import { FontAwesome } from '@expo/vector-icons';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    borderWidth: 0,
    flexGrow: 1,
    paddingLeft: 10
  },
  removeButton: {
    alignSelf: 'flex-end'
  }
});

const Dropdown = ({ onSortChange }) => {

  return (
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

export const RepositoryListContainer = ({
  repositories,
  onSortChange,
  onSearchChange,
  onEndReach
}) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (id) => {
    history.push(`/repositories/${id}`);
  };

  const handleChangeText = (value) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <View>
      <Dropdown onSortChange={onSortChange} />
      <FlatList
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 140 }}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={24} color="grey" />
            <TextInput style={styles.searchInput}
              onChangeText={handleChangeText}
              value={searchValue}
              placeholder="Search"
            />
            {searchValue ?
              <TouchableWithoutFeedback onPress={() => handleChangeText('')}>
                <FontAwesome styles={styles.removeButton} name="remove" size={24} color="grey" />
              </TouchableWithoutFeedback>
              : null
            }
          </View>
        }
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <TouchableOpacity onPress={() => handlePress(item.id)}><RepositoryItem item={item} /></TouchableOpacity>}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { orderBy, orderDirection } = sortParams(sort);
  const { repositories, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: searchKeyword,
    first: 8
  });

  const debounced = useDebouncedCallback(
    (value) => {
      setSearchKeyword(value);
    }, 500);

  const onSortChange = ({ value }) => {
    setSort(value);
  };

  const onSearchChange = (value) => {
    debounced.callback(value);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onSearchChange={onSearchChange}
      onSortChange={onSortChange}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;