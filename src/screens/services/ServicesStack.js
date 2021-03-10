//ServicesStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ServiceScreen from './ServiceScreen';

const Services = createStackNavigator();

//function return
function ServicesStack(props) {
  return (
    <Services.Navigator>
      <Services.Screen name="Services" component={ServiceScreen} />
    </Services.Navigator>
  );
}

export default ServicesStack;
