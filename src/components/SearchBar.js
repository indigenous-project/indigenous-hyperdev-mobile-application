import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {colors, spacing, themes} from '../styles';

import {Header, Item, Input, Icon, Left, Button, Right} from 'native-base';
import {gray100, primary100} from '../styles/colors';

const SearchBar = (props) => {
  const [keywords, setKeywords] = useState(null);
  //props.keyword(keywords);
  return (
    <Header
      searchBar
      iosBarStyle="light-content"
      style={{backgroundColor: themes.light.primaryColor}}>
      <Left style={{maxWidth: '10%'}}>
        <Button
          transparent
          style={{marginBottom: 5}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon
            name="chevron-back-outline"
            style={{color: themes.light.inverseTextColor}}
          />
        </Button>
      </Left>
      <Item rounded style={{backgroundColor: colors.gray200}}>
        <Icon name="ios-search" />
        <Input
          placeholder={props.placeholder}
          returnKeyType="search"
          value={keywords}
          onChangeText={setKeywords}
        />
      </Item>
    </Header>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
