//AuthStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import {themes} from '../../styles';

const Auth = createStackNavigator();
const theme = themes.light;
//function return
function AuthStack(props) {
  return (
    <Auth.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor},
        headerTintColor: theme.inverseTextColor,
      }}>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
    </Auth.Navigator>
  );
}

export default AuthStack;
