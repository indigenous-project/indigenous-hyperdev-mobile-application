//OrganizationsStack module

// import packages
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import OrganizationScreen from './OrganizationScreen';
import { themes } from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';
import OrganizationDetailScreen from './OrganizationDetailScreen';
import SearchStack from '../search/SearchStack';
const theme = themes.light;
const Organizations = createStackNavigator();

//function return
function OrganizationsStack({ navigation }) {
  return (
    <Organizations.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.primaryColor }, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerRight: () => (
          <RightHeaderButton
            navigationProps={navigation}
            section="Organization"
          />
        ), // implement right header buttons: search, notification
      }}
      initialRouteName="Organizations">
      <Organizations.Screen
        name="Organizations"
        component={OrganizationScreen}
        options={{
          headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />,
        }}
      />
      <Organizations.Screen
        name="Organization Detail"
        component={OrganizationDetailScreen}
        options={{
          headerRight: false,
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: themes.light.inverseTextColor },
          headerTintColor: themes.light.primaryColor,
        }}
      />
      <Organizations.Screen
        name="SearchStackOrganization"
        component={SearchStack}
        options={{ headerShown: false }}
      />
    </Organizations.Navigator>
  );
}

export default OrganizationsStack;
