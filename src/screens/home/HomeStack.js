//HomeStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import {themes} from '../../styles';

const Home = createStackNavigator();
const theme = themes.light;
//function return
function HomeStack(props) {
  return (
    <Home.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor},
        headerTintColor: theme.inverseTextColor,
      }}
      r>
      <Home.Screen name="Indigenous Brigde" component={HomeScreen} />
    </Home.Navigator>
  );
}

export default HomeStack;
