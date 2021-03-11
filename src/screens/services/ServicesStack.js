//ServicesStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ServiceScreen from './ServiceScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

const theme = themes.light;
const Services = createStackNavigator();

//function return
function ServicesStack(props) {
  return (
    <Services.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerLeft: () => <HambugerMenuHeader />, // implement hambuger menu on the left of the header
      }}>
      <Services.Screen name="Services" component={ServiceScreen} />
    </Services.Navigator>
  );
}

export default ServicesStack;
