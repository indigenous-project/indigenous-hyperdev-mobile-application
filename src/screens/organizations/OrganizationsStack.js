//OrganizationsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const Organizations = createStackNavigator();

//function return
function OrganizationsStack(props) {
  return <Organizations.Navigator></Organizations.Navigator>;
}

export default OrganizationsStack;
