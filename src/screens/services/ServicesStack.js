//ServicesStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const Services = createStackNavigator();

//function return
function ServicesStack(props) {
  return <Services.Navigator></Services.Navigator>;
}

export default ServicesStack;
