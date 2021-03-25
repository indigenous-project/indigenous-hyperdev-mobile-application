//NewsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import NewsScreen from './NewsScreen';
import NewsDetailScreen from './NewsDetailScreen';
import JobDetailScreen from './JobDetailScreen'
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';

const News = createStackNavigator();
const theme = themes.light;
//function return
function NewsStack({navigation}) {
  return (
    <News.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text colors
        headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
      }}>
      <News.Screen name="News" component={NewsScreen} />
      <News.Screen
        name="News Article"
        component={NewsDetailScreen}
        options={{
          headerRight: false,
          headerLeft: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: theme.primaryColor,
        }}
      />
      <News.Screen
        name="Life Long Care Repost"
        component={JobDetailScreen}
        options={{
          headerRight: false,
          headerLeft: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: theme.primaryColor,
        }}
      />
    </News.Navigator>
  );
}

export default NewsStack;
