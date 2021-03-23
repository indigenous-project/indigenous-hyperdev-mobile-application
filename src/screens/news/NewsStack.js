//NewsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import NewsScreen from './NewsScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

import RightHeaderButton from '../../components/RightHeaderButton';

const theme = themes.light;
const News = createStackNavigator();

//function return
function NewsStack({navigation}) {
  return (
    <News.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
      }}>
      <News.Screen name="News" component={NewsScreen} />
    </News.Navigator>
  );
}

export default NewsStack;
