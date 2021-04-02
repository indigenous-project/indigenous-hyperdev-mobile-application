import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Body, List, ListItem, Text, Separator, Content} from 'native-base';

import {colors, typography} from '../styles';
import {formatDate} from '../modules/date.format';
import DiscussionDetail from '../screens/discussions/DiscussionDetail';
import {useCurrentUser} from '../contexts/currentUserContext';

const SearchList = (props) => {
  const [currentUser, token] = useCurrentUser();
  return (
    // <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
    <Content>
      <Separator bordered>
        <Text>DISCUSSIONS</Text>
      </Separator>
      {props.discussion.length > 0
        ? props.discussion.map((item) => (
            <ListItem
              key={item._id}
              onPress={() =>
                props.navigationProp.navigate('Discussion Detail', {
                  discussionId: item._id,
                  token: token,
                })
              }>
              <Body>
                <Text>{item.title}</Text>
                <Text note numberOfLines={1}>
                  {item.description}
                </Text>
              </Body>
            </ListItem>
          ))
        : null}

      <Separator bordered>
        <Text>EVENTS</Text>
      </Separator>
      {props.event.length > 0
        ? props.event.map((item) => (
            <ListItem key={item._id}>
              <Body>
                <Text>{item.title}</Text>
                <Text note numberOfLines={1}>
                  {formatDate(item.date)}
                </Text>
              </Body>
            </ListItem>
          ))
        : null}
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
