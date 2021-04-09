//DiscussionsStack module

// import packages
import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import DiscussionScreen from './DiscussionScreen';
import DiscussionDetail from './DiscussionDetail';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';

import {useIsFocused} from '@react-navigation/native';
import RightHeaderButton from '../../components/RightHeaderButton';

import DisclaimerScreen from '../sidenavbar/DisclaimerScreen';
import {useEffect} from 'react/cjs/react.development';
import SearchStack from '../search/SearchStack';

const theme = themes.light;
const Discussion = createStackNavigator();

//function Dicussion Stack contains: Discussion main screen, Disclaimer Screen, Discussion Detail and Search Stack
function DiscussionsStack({navigation, route}) {
  const isFocused = useIsFocused();
  const [isRead, setIsRead] = useState(false);

  // Get the value of isRead is passed from Disclaimer Screen
  useEffect(() => {
    route.params ? setIsRead(route.params.isRead) : setIsRead(false);
  }, [route.params, isFocused]);

  return (
    <Discussion.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text color
      }}
      initialRouteName="DiscussionsScreen">
      {isRead ? ( // check if user has read the disclaimer then go to discussion Screen
        <Discussion.Screen
          name="DiscussionScreen"
          component={DiscussionScreen}
          options={{
            headerTitle: 'Discussions',
            headerLeft: () => (
              <HambugerMenuHeader navigationProps={navigation} /> //Hambuger Menu
            ),
            headerRight: () => (
              <RightHeaderButton
                navigationProps={navigation}
                section="Discussion"
              />
            ), // implement right header buttons: search, notification
          }}
        />
      ) : (
        <Discussion.Screen
          name="Discussion Desclaimer"
          component={DisclaimerScreen}
          options={{headerShown: false}}
        />
      )}

      <Discussion.Screen
        name="Discussion Detail"
        component={DiscussionDetail}
        options={{headerRight: false, title: false}}
      />
      <Discussion.Screen
        name="SearchStackDiscussion"
        component={SearchStack}
        options={{headerShown: false}}
      />
    </Discussion.Navigator>
  );
}

export default DiscussionsStack;
