/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerRoute from './src/screens/sidenavbar/DrawerRoute';
import AuthStack from './src/screens/authentication/AuthStack';
import {CurrentUserProvider} from './src/contexts/currentUserContext';

const Stack = createStackNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <CurrentUserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{headerShown: false, animationTypeForReplace: 'pop'}}
            />

            <Stack.Screen
              name="DrawerRoute"
              component={DrawerRoute}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CurrentUserProvider>
    </SafeAreaProvider>
  );
};

export default App;
