//HomeStack module

// import packages
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import EventDetail from './EventDetail';
import { themes } from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

const Home = createStackNavigator();
const theme = themes.light;
//function return
function HomeStack({ navigation }) {
  return (
    <Home.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.primaryColor }, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
      }}>
      <Home.Screen name="Indigenous Bridge" component={HomeScreen} />
      <Home.Screen name='Event Detail' component={EventDetail} />
    </Home.Navigator>
  );
}

export default HomeStack;
