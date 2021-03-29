//NewsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import NewsScreen from './NewsScreen';
import NewsDetailScreen from './NewsDetailScreen';
import JobDetailScreen from './JobDetailScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';

const News = createStackNavigator();
const theme = themes.light;
//function return
function NewsStack({ navigation }) {
  return (
    <News.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text colors
        // implement hambuger menu on the left of the header
       // headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />,
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
        
      }}
      initialRouteName="News">
      <News.Screen
        options={{
          headerLeft: () => (
            <HambugerMenuHeader navigationProps={navigation} />
          ),
        }}
        
        name="News"
        component={NewsScreen}
      />

      <News.Screen
        name="News Article"
        component={NewsDetailScreen}
        options={{
          title: 'Article Detail',
          headerRight: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: theme.primaryColor,
        }}
      />
      <News.Screen
        name="Job Detail"
        component={JobDetailScreen}
        options={{
          headerRight: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: theme.primaryColor,
        }}
      />
    </News.Navigator>
  );
}

export default NewsStack;
