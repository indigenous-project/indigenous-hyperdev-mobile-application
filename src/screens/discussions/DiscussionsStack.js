//DiscussionsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import DiscussionScreen from './DiscussionScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import {DiscussionProvider} from '../../contexts/discussionContext';

const theme = themes.light;
const Discussion = createStackNavigator();
//function return
function DiscussionsStack({navigation}) {
  return (
    <DiscussionProvider>
      <Discussion.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: theme.primaryColor}, //header background
          headerTintColor: theme.inverseTextColor, // text color
          headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />, // implement hambuger menu on the left of the header
        }}>
        <Discussion.Screen name="Discussions" component={DiscussionScreen} />
      </Discussion.Navigator>
    </DiscussionProvider>
  );
}

export default DiscussionsStack;
