import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {colors, spacing, themes} from '../styles';

import {Header, Item, Input, Icon, Left, Button, Right} from 'native-base';

const SearchBar = (props) => {
  return (
    <Header
      searchBar
      iosBarStyle="light-content"
      style={{backgroundColor: themes.light.primaryColor}}>
      <Left style={{maxWidth: '10%'}}>
        <Button
          transparent
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon
            name="chevron-back-outline"
            style={{color: themes.light.inverseTextColor}}
          />
        </Button>
      </Left>
      <Item rounded backgroundColor={colors.gray100}>
        <Icon name="ios-search" />
        <Input placeholder="Search" />
      </Item>
    </Header>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
