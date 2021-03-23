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

const theme = themes.light;
const Discussion = createStackNavigator();
//function return
function DiscussionsStack({ navigation }) {
  const isFocused = useIsFocused();

  return (
    <Discussion.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.primaryColor }, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
      }}>
      <Discussion.Screen name="Discussions" component={DiscussionScreen} />
      <Discussion.Screen name="Discussion Detail" component={DiscussionDetail} />
    </Discussion.Navigator>
  );
}

export default DiscussionsStack;
