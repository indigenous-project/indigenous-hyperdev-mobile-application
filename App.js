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
import {DiscussionProvider} from './src/contexts/discussionContext';
import {EventProvider} from './src/contexts/eventContext';
import {JobProvider} from './src/contexts/jobContext';
import {NewsProvider} from './src/contexts/newsContext';
import {ServiceProvider} from './src/contexts/serviceContext';
import {OrganizationProvider} from './src/contexts/organizationContext';

const Stack = createStackNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <CurrentUserProvider>
        <DiscussionProvider>
          <EventProvider>
            <JobProvider>
              <NewsProvider>
                <ServiceProvider>
                  <OrganizationProvider>
                    <NavigationContainer>
                      <Stack.Navigator initialRouteName="Auth">
                        <Stack.Screen
                          name="Auth"
                          component={AuthStack}
                          options={{
                            headerShown: false,
                            animationTypeForReplace: 'pop',
                          }}
                        />

                        <Stack.Screen
                          name="DrawerRoute"
                          component={DrawerRoute}
                          options={{headerShown: false}}
                        />
                      </Stack.Navigator>
                    </NavigationContainer>
                  </OrganizationProvider>
                </ServiceProvider>
              </NewsProvider>
            </JobProvider>
          </EventProvider>
        </DiscussionProvider>
      </CurrentUserProvider>
    </SafeAreaProvider>
  );
};

export default App;
