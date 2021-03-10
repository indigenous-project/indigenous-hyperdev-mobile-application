//DiscussionsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import DiscussionScreen from './DiscussionScreen';

const Discussion = createStackNavigator();
//function return
function DiscussionsStack(props) {
  return (
    <Discussion.Navigator>
      <Discussion.Screen name="DiscussionScreen" component={DiscussionScreen} />
    </Discussion.Navigator>
  );
}

export default DiscussionsStack;
