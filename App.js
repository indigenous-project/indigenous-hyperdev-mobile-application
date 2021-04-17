/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*Import fields
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerRoute from './src/screens/sidenavbar/DrawerRoute';
import AuthStack from './src/screens/authentication/AuthStack';
import {StatusBar} from 'react-native';

////////////////////////////////////////////////////////////////////////

// Define a stack navigator
const Stack = createStackNavigator();

// Define App component
const App = () => {
  //Render elements
  return (
    <SafeAreaProvider>
      {/* Navigation Container contains : Authentication Stack and DrawerRoute */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{
              headerShown: false, // hide header
              animationTypeForReplace: 'pop',
            }}
          />

          <Stack.Screen
            name="DrawerRoute"
            component={DrawerRoute}
            options={{headerShown: false}} // hide header
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
