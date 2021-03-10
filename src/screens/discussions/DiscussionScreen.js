//DiscussionScreen module

// import packages
import React from 'react';

import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';

//function return
function DiscussionScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'bottom', 'left']}>
      <FocusedStatusBar barStyle="dark-content" />
      <Text>Discussion Screen</Text>
    </SafeAreaView>
  );
}

export default DiscussionScreen;
