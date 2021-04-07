//OrganizationsStack module

// import packages
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { themes } from '../../styles';

import SearchScreen from './SearchScreen';

import DiscussionDetail from '../discussions/DiscussionDetail';
import EventDetail from '../home/EventDetail';

import JobDetailScreen from '../news/JobDetailScreen';
import NewsDetailScreen from '../news/NewsDetailScreen';

import OrganizationDetailScreen from '../organizations/OrganizationDetailScreen';

import ServiceDetailScreen from '../services/ServiceDetailScreen';

const theme = themes.light;
const Search = createStackNavigator();

//function return
function SearchStack({ navigation }) {
  return (
    <Search.Navigator initialRouteName="SearchScreen">
      <Search.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false, headerTitle: 'Search' }}
      />

      <Search.Screen
        name="Discussion Detail"
        component={DiscussionDetail}
        options={{
          headerTitle: false,
          headerTintColor: theme.inverseTextColor,
          headerStyle: { backgroundColor: theme.primaryColor },
        }}
      />
      <Search.Screen
        name="Event Detail"
        component={EventDetail}
        options={{
          headerTitle: false,
          headerTintColor: theme.inverseTextColor,
          headerStyle: { backgroundColor: theme.primaryColor },
        }}
      />
      <Search.Screen
        name="Job Detail"
        component={JobDetailScreen}
        options={{
          headerTitle: false,
          headerTintColor: theme.inverseTextColor,
          headerStyle: { backgroundColor: theme.primaryColor },
        }}
      />

      <Search.Screen
        name="News Detail"
        component={NewsDetailScreen}
        options={{
          headerTitle: false,
          headerTintColor: theme.inverseTextColor,
          headerStyle: { backgroundColor: theme.primaryColor },
        }}
      />

      <Search.Screen
        name="Service Detail"
        component={ServiceDetailScreen}
        options={{
          headerTitle: false,
          headerTintColor: theme.inverseTextColor,
          headerStyle: { backgroundColor: theme.primaryColor },
        }}
      />

      <Search.Screen
        name="Organization Detail"
        component={OrganizationDetailScreen}
        options={{
          headerTitle: false,
          headerTintColor: theme.inverseTextColor,
          headerStyle: { backgroundColor: theme.primaryColor },
        }}
      />
    </Search.Navigator>
  );
}

export default SearchStack;
