//LoginScreen module

// import packages
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet} from 'react-native';

//function return
function LoginScreen(props) {
  return (
    <SafeAreaView
      style={styleSheet.safeArea}
      edges={['right', 'bottom', 'left']}>
      <Text>Login screen</Text>
    </SafeAreaView>
  );
}

const styleSheet = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      padding: 10,
    },
  });

export default LoginScreen;
