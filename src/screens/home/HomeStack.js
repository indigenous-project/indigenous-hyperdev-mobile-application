//HomeStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import EventDetail from './EventDetail';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import {Button} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RightHeaderButton from '../../components/RightHeaderButton';
import ServiceCategoryScreen from '../services/ServiceCategoryScreen';

const Home = createStackNavigator();
const theme = themes.light;
//function return
function HomeStack({navigation}) {
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
          headerRight: () => <RightHeaderButton navigationProps={navigation} />,
          title: 'Indigenous Bridge', // implement right header buttons: search, notification
        }}
      />
      <Home.Screen
        name="EventDetail"
        component={EventDetail}
        options={{title: 'Event Detail'}}
      />
      <Home.Screen
        name="Services and Programs"
        component={ServiceCategoryScreen}
        options={{
          headerRight: false,
          title: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},

          headerTintColor: themes.light.primaryColor,
        }}
      />
    </Home.Navigator>
  );
}

export default HomeStack;
