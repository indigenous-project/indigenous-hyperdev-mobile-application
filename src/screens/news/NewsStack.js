//NewsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import NewsScreen from './NewsScreen';

const News = createStackNavigator();

//function return
function NewsStack(props) {
  return (
    <News.Navigator>
      <News.Screen name="News" component={NewsScreen} />
    </News.Navigator>
  );
}

export default NewsStack;
