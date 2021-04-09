//AuthStack module

// import field
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import {themes} from '../../styles';
import ForgotPassword from './ForgotPassword';
////////////////////////////

//Define Authenticaiton Stack navigator
const Auth = createStackNavigator();

//Define theme to use theme light
const theme = themes.light;

//Define AuthStack contains: Login, Register and Forgot Paswword Screen
function AuthStack(props) {
  //Render elements
  return (
    <Auth.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //background header
        headerTintColor: theme.inverseTextColor, // Text color of header: white
      }}
      initialRouteName="Login" //set initial route Login screen
    >
      {/*Log in Screen */}
      <Auth.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}} // hide header
      />
      {/*Register Screen Screen */}
      <Auth.Screen name="Register" component={RegisterScreen} />
      {/*ForgotPassword Screen Screen */}
      <Auth.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{title: 'Forgot Password'}}
      />
    </Auth.Navigator>
  );
}

export default AuthStack;
