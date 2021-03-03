//AuthStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';

const Auth = createStackNavigator();
//function return
function AuthStack(props) {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
    </Auth.Navigator>
  );
}

export default AuthStack;
