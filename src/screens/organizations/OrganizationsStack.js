//OrganizationsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import OrganizationScreen from './OrganizationScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';

const theme = themes.light;
const Organizations = createStackNavigator();

//function return
function OrganizationsStack({navigation}) {
  return (
    <Organizations.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
      }}>
      <Organizations.Screen
        name="Organizations"
        component={OrganizationScreen}
      />
    </Organizations.Navigator>
  );
}

export default OrganizationsStack;
