//AuthStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import {themes} from '../../styles';
import ForgotPassword from './ForgotPassword';

const Auth = createStackNavigator();
const theme = themes.light;
//function return
function AuthStack(props) {
  return (
    <Auth.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor},
        headerTintColor: theme.inverseTextColor,
      }}
      initialRouteName="Login">
      <Auth.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Auth.Screen name="Register" component={RegisterScreen} />
      <Auth.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{title: 'Forgot Password'}}
      />
    </Auth.Navigator>
  );
}

export default AuthStack;
