//OrganizationsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';
import SearchScreen from './SearchScreen';
import SearchResult from './SearchResult';
import {DiscussionProvider} from '../../contexts/discussionContext';
import {useIsFocused} from '@react-navigation/core';
import {EventProvider} from '../../contexts/eventContext';
import DiscussionDetail from '../discussions/DiscussionDetail';
import EventDetail from '../home/EventDetail';
import BackButtonHeaderLeft from '../../components/BackButtonHeaderLeft';

const theme = themes.light;
const Search = createStackNavigator();

//function return
function SearchStack({navigation}) {
  const isFocused = useIsFocused();
  return (
    <DiscussionProvider isFocused={isFocused}>
      <EventProvider isFocused={isFocused}>
        <Search.Navigator initialRouteName="SearchScreen">
          <Search.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{headerShown: false, headerTitle: 'Search'}}
          />

          <Search.Screen
            name="Discussion Detail"
            component={DiscussionDetail}
            options={{
              headerTitle: false,
              headerTintColor: theme.inverseTextColor,
              headerStyle: {backgroundColor: theme.primaryColor},
            }}
          />
          <Search.Screen
            name="Event Detail"
            component={EventDetail}
            options={{
              headerTitle: false,
              headerTintColor: theme.inverseTextColor,
              headerStyle: {backgroundColor: theme.primaryColor},
            }}
          />
        </Search.Navigator>
      </EventProvider>
    </DiscussionProvider>
  );
}

export default SearchStack;
