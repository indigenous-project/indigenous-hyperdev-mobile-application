//HomeStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import EventDetail from './EventDetail';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

import RightHeaderButton from '../../components/RightHeaderButton';
import ServiceDetailScreen from '../services/ServiceDetailScreen';
import SearchStack from '../search/SearchStack';
import {useEffect} from 'react/cjs/react.development';

//Define Home stack navigator
const Home = createStackNavigator();
const theme = themes.light;

//function Home Stack contains: home Screen, Event Detail, Service Detail and search stack Screen
function HomeStack({navigation}) {
  //useEffect(() => {}, [navigation]);
  return (
    <Home.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
      }}
      initialRouteName="Home">
      <Home.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
          headerRight: () => (
            <RightHeaderButton navigationProps={navigation} section="Home" />
          ),
          title: 'Indigenous Bridge', // implement right header buttons: search, notification
        }}
      />
      <Home.Screen
        name="EventDetail"
        component={EventDetail}
        options={{title: 'Event Detail'}}
      />
      <Home.Screen
        name="Service Detail"
        component={ServiceDetailScreen}
        options={{
          headerRight: false,
          title: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},

          headerTintColor: themes.light.primaryColor,
        }}
      />
      <Home.Screen
        name="SearchStackHome"
        component={SearchStack}
        options={{headerShown: false}}
      />
    </Home.Navigator>
  );
}

export default HomeStack;
