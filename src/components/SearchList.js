//List search results

//Import field
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Body,
  ListItem,
  Text,
  Separator,
  Content,
  Right,
  Thumbnail,
} from 'native-base';

import {colors, typography} from '../styles';
import {formatDate} from '../modules/date.format';

import {useCurrentUser} from '../contexts/currentUserContext';

//Define Search List Module
const SearchList = (props) => {
  const [currentUser, token] = useCurrentUser(); // use current user context
  return (
    <Content>
      <Separator bordered>
        <Text>DISCUSSIONS</Text>
      </Separator>
      {/*Render Discussion Results */}
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
      {/*Render events Results */}
      {props.event.length > 0
        ? props.event.map((item) => (
            <ListItem
              key={item._id}
              onPress={() =>
                props.navigationProp.navigate('Event Detail', {
                  eventId: item._id,
                  token: token,
                })
              }>
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
      {/*Render jobs Results */}
      {props.job.length > 0
        ? props.job.map((item) => (
            <ListItem
              key={item._id}
              onPress={() =>
                props.navigationProp.navigate('Job Detail', {
                  job: item,
                  token: token,
                })
              }>
              <Body>
                <Text>{item.title}</Text>
                <Text note numberOfLines={1}>
                  {item.type}
                </Text>
              </Body>
            </ListItem>
          ))
        : null}
      <Separator bordered>
        <Text>NEWS</Text>
      </Separator>
      {/*Render news Results */}
      {props.news.length > 0
        ? props.news.map((item) => (
            <ListItem
              key={item._id}
              onPress={() =>
                props.navigationProp.navigate('News Detail', {
                  postId: item._id,
                  token: token,
                })
              }>
              <Body>
                <Text>{item.title}</Text>
                <Text note numberOfLines={1}>
                  {formatDate(item.createdAt)}
                </Text>
              </Body>
            </ListItem>
          ))
        : null}

      <Separator bordered>
        <Text>SERVICES</Text>
      </Separator>
      {/*Render services Results */}
      {props.service.length > 0
        ? props.service.map((item) => (
            <ListItem
              key={item._id}
              onPress={() =>
                props.navigationProp.navigate('Service Detail', {
                  name: item,
                  token: token,
                })
              }>
              <Body>
                <Text>{item.name}</Text>
                <Text note numberOfLines={1}>
                  {item.category.name}
                </Text>
              </Body>
              {item.isIndigenous ? (
                <Right>
                  <Thumbnail
                    circular
                    small
                    source={require('../asserts/indigenousIcon.png')}
                  />
                </Right>
              ) : null}
            </ListItem>
          ))
        : null}
      <Separator bordered>
        <Text>ORGANIZATIONS</Text>
      </Separator>
      {/*Render organizations Results */}
      {props.organization.length > 0
        ? props.organization.map((item) => (
            <ListItem
              key={item._id}
              onPress={() =>
                props.navigationProp.navigate('Organization Detail', {
                  organization: item,
                  token: token,
                })
              }>
              <Body>
                <Text>{item.name}</Text>
                <Text note numberOfLines={1}>
                  {item.category.name}
                </Text>
              </Body>
              {item.isIndigenous ? (
                <Right>
                  <Thumbnail
                    circular
                    small
                    source={require('../asserts/indigenousIcon.png')}
                  />
                </Right>
              ) : null}
            </ListItem>
          ))
        : null}
    </Content>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  recent: {
    color: colors.primary900,
    fontSize: typography.fs2,
    fontWeight: typography.fwBold,
  },

  separator: {
    backgroundColor: colors.white,
  },
  textSeparator: {
    color: colors.primary800,
  },
});
