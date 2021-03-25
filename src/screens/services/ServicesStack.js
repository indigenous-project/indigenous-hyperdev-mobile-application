//ServicesStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ServiceScreen from './ServiceScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';
import ServiceCategoryScreen from './ServiceCategoryScreen';

const theme = themes.light;
const Services = createStackNavigator();

//function return
function ServicesStack({navigation}) {
  return (
    <Services.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
      }}>
      <Services.Screen
        name="Services"
        component={ServiceScreen}
        options={{
          headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />,
        }}
      />

      <Services.Screen
        name="Culture"
        component={ServiceCategoryScreen}
        options={{
          headerRight: false,
          headerBackTitleVisible:false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: themes.light.primaryColor,
        }}
      />
      <Services.Screen
        name="Government/Legal"
        component={ServiceCategoryScreen}
        options={{
          headerRight: false,
          headerBackTitleVisible:false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: themes.light.primaryColor,
        }}
      />
      <Services.Screen
        name="Mental Health/ Addiction"
        component={ServiceCategoryScreen}
        options={{
          headerRight: false,
          headerBackTitleVisible:false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: themes.light.primaryColor,
        }}
      />
      <Services.Screen
        name="Community"
        component={ServiceCategoryScreen}
        options={{
          headerRight: false,
          headerBackTitleVisible:false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: themes.light.primaryColor,
        }}
      />
      <Services.Screen
        name="Employment and Housing"
        component={ServiceCategoryScreen}
        options={{
          headerRight: false,
          headerBackTitleVisible:false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: themes.light.primaryColor,
        }}
      />
      <Services.Screen
        name="Emergency"
        component={ServiceCategoryScreen}
        options={{
          headerRight: false,
          headerBackTitleVisible:false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: themes.light.primaryColor,
        }}
      />
    </Services.Navigator>
  );
}

export default ServicesStack;
