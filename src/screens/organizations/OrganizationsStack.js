//OrganizationsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import OrganizationScreen from './OrganizationScreen';

const Organizations = createStackNavigator();

//function return
function OrganizationsStack(props) {
  return (
    <Organizations.Navigator>
      <Organizations.Screen
        name="Organizations"
        component={OrganizationScreen}
      />
    </Organizations.Navigator>
  );
}

export default OrganizationsStack;
