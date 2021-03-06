//HomeStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const Home = createStackNavigator();
//function return
function HomeStack(props) {
  return <Home.Navigator></Home.Navigator>;
}

export default HomeStack;
