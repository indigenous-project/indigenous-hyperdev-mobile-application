//NewsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import NewsScreen from './NewsScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

const theme = themes.light;
const News = createStackNavigator();

//function return
function NewsStack(props) {
  return (
    <News.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerLeft: () => <HambugerMenuHeader />, // implement hambuger menu on the left of the header
      }}>
      <News.Screen name="News" component={NewsScreen} />
    </News.Navigator>
  );
}

export default NewsStack;
