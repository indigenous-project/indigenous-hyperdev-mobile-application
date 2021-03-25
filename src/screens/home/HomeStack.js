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

const Home = createStackNavigator();
const theme = themes.light;
//function return
function HomeStack({navigation}) {
  return (
    <Home.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
      }}
      initialRouteName="Indigenous Bridge">
      <Home.Screen name="Indigenous Bridge" component={HomeScreen} />
      <Home.Screen name="Event Detail" component={EventDetail} />
    </Home.Navigator>
  );
}

export default HomeStack;
