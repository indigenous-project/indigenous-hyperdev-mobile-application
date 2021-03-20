import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet} from 'react-native';
import {themes, colors, spacing, typography} from '../../styles';
import SearchList from '../../components/SearchList';
import SearchBar from '../../components/SearchBar';

function SearchScreen() {
  const theme = themes.light;
  state = {
    search: '',
  };
  updateSearch = search => {
    this.setState({search});
  };
  const {search} = this.state;

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar placeholder="Search" />
      <SearchList name="Legal Services" name1="Mental Health" />
    </SafeAreaView>
  );
}

export default SearchScreen;
