//OrganizationsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import OrganizationScreen from './OrganizationScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

const theme = themes.light;
const Organizations = createStackNavigator();

//function return
function OrganizationsStack(props) {
  return (
    <Organizations.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerLeft: () => <HambugerMenuHeader />, // implement hambuger menu on the left of the header
      }}>
      <Organizations.Screen
        name="Organizations"
        component={OrganizationScreen}
      />
    </Organizations.Navigator>
  );
}

export default OrganizationsStack;
