//AskQuestionScreen.js

// import packages
import React from 'react';

import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../components/FocusedStatusBar';

//function return
function AskQuestionScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'bottom', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <Text>AskQuestionScreen</Text>
    </SafeAreaView>
  );
}

export default AskQuestionScreen;
