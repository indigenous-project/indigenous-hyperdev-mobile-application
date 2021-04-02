//ServicesStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ServiceScreen from './ServiceScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';
import ServiceCategoryScreen from './ServiceCategoryScreen';
import SearchStack from '../search/SearchStack';

const theme = themes.light;
const Services = createStackNavigator();

//function return
function ServicesStack({navigation}) {
  return (
    <Services.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color

        // headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
      }}
      initialRouteName="Services">
      <Services.Screen
        options={{
          headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />,
        }}
        name="Services"
        component={ServiceScreen}
      />

      <Services.Screen
        name="Services and Programs"
        component={ServiceCategoryScreen}
        options={{
          headerRight: false,
          title: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},

          headerTintColor: themes.light.primaryColor,
        }}
      />
      <Services.Screen
        name="SearchStack"
        component={SearchStack}
        options={{headerShown: false}}
      />
    </Services.Navigator>
  );
}

export default ServicesStack;
