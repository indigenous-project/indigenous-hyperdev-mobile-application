//DiscussionsStack module

// import packages
import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import DiscussionScreen from './DiscussionScreen';
import DiscussionDetail from './DiscussionDetail';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

import {DiscussionProvider} from '../../contexts/discussionContext';
import {useIsFocused} from '@react-navigation/native';
import RightHeaderButton from '../../components/RightHeaderButton';

const theme = themes.light;
const Discussion = createStackNavigator();
//function return
function DiscussionsStack({navigation}) {
  const isFocused = useIsFocused();

  return (
    <Discussion.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
        headerRight: () => <RightHeaderButton navigationProps={navigation} />, // implement right header buttons: search, notification
      }}>
      <Discussion.Screen
        name="Discussions"
        component={DiscussionScreen}
        options={{
          headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />,
        }}
      />
      <Discussion.Screen
        name="Discussion Detail"
        component={DiscussionDetail}
        options={{headerRight: false, title: false}}
      />
    </Discussion.Navigator>
  );
}

export default DiscussionsStack;
