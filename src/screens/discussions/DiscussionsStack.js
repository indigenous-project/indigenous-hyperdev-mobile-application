//DiscussionsStack module

// import packages
import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DiscussionScreen from './DiscussionScreen';
import DiscussionDetail from './DiscussionDetail';
import { themes } from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

import { DiscussionProvider } from '../../contexts/discussionContext';
import { useIsFocused } from '@react-navigation/native';
import RightHeaderButton from '../../components/RightHeaderButton';
import { removeAsyncStorage, useAsyncStorage } from '../../hooks/useAsyncStorage';
import DisclaimerScreen from '../sidenavbar/DisclaimerScreen';
import { useEffect } from 'react/cjs/react.development';

const theme = themes.light;
const Discussion = createStackNavigator();

//function return
function DiscussionsStack({ navigation, route }) {
  const isFocused = useIsFocused();

  const isRead = route.params ? route.params.isRead : false;

  //removeAsyncStorage('isRead');

  useEffect(() => { }, [isRead, isFocused]);

  return (
    <Discussion.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.primaryColor }, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
      }}
      initialRouteName="Discussions">
      {isRead ? (
        <Discussion.Screen
          name="Discussions"
          component={DiscussionScreen}
          options={{
            headerLeft: () => (
              <HambugerMenuHeader navigationProps={navigation} />
            ),
          }}
        />
      ) : (
        <Discussion.Screen
          name="Discussion Desclaimer"
          component={DisclaimerScreen}
          options={{ headerShown: false }}
        />
      )}

      <Discussion.Screen
        name="Discussion Detail"
        component={DiscussionDetail}
        options={{ headerRight: false, title: false }}
      />
    </Discussion.Navigator>
  );
}

export default DiscussionsStack;
