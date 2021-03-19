import React from 'react';
import {View, StyleSheet} from 'react-native';
import { spacing, } from '../styles';

import {Header, Item, Input, Icon,} from 'native-base';

const SearchBar = (props) => {
    return (
        <View>
        <Header searchBar regular>
          <Item
            style={{
              height: '60%',
              marginLeft: '5%',
              borderRadius: spacing.small,
            }}>
            <Icon name="ios-search" />
            <Input placeholder={props.placeholder} />
          </Item>
        </Header>
      </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({})


