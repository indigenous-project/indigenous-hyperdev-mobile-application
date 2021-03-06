//NewsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const News = createStackNavigator();

//function return
function NewsStack(props) {
  return <News.Navigator></News.Navigator>;
}

export default NewsStack;
