import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Body, List, ListItem, Text, Separator, Content} from 'native-base';

import {colors, typography} from '../styles';

const SearchList = (props) => {
  console.log(props.result);
  return (
    // <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
    <Content>
      <Separator bordered>
        <Text>DISCUSSIONS</Text>
      </Separator>
      {props.result.length > 0 ? (
        <FlatList
          data={props.result}
          renderItem={({item}) => (
            <ListItem>
              <Body>
                <Text>{item.title}</Text>
                <Text note numberOfLines={1}>
                  {item.description}
                </Text>
              </Body>
            </ListItem>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : null}
      <Separator bordered>
        <Text>EVENTS</Text>
      </Separator>
      <Separator bordered>
        <Text>JOBS</Text>
      </Separator>
      <Separator bordered>
        <Text>NEWS</Text>
      </Separator>
      <Separator bordered>
        <Text>SERVICES</Text>
      </Separator>
      <Separator bordered>
        <Text>ORGANIZATIONS</Text>
      </Separator>
    </Content>
    // </List>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  recent: {
    color: colors.primary900,
    fontSize: typography.fs2,
    fontWeight: typography.fwBold,
  },
});
