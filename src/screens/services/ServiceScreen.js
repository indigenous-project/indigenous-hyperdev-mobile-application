/* eslint-disable react-native/no-inline-styles */
//ServiceScreen module

// import packages
import React from 'react';

import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

//function return
function ServiceScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <Text>Services Screen</Text>
    </SafeAreaView>
  );
}

export default ServiceScreen;
