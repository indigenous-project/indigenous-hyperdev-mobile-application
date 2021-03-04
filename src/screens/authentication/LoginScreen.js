//LoginScreen module

// import packages
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet} from 'react-native';

//function return
function LoginScreen(props) {
  fetch(
    'http://ec2co-ecsel-18j9bbvvtigir-1002785149.us-east-2.elb.amazonaws.com/',
  )
    .then((response) => response.json())
    .then((data) => console.log(data.data.healthStatus))
    .catch(console.log)
    .finally(console.log);

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
