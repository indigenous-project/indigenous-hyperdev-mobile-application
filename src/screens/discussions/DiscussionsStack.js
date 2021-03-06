//DiscussionsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const Discussion = createStackNavigator();
//function return
function DiscussionsStack(props) {
  return <Discussion.Navigator></Discussion.Navigator>;
}

export default DiscussionsStack;
