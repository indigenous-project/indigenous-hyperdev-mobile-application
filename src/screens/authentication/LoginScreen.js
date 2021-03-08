//LoginScreen module

// import packages
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {userCurrent, userSignIn, userSignUp} from '../../api/auth/auth.api';
import {useState} from 'react';
import {useEffect} from 'react';

import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
} from 'native-base';

//function return
function LoginScreen(props) {
  const [user, setUser] = useState(null);

  //testing userCurrent function()
  useEffect(() => {
    userCurrent(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ1ODlhMjBkZDlmYTAwMDdjMTU4ZjUiLCJpYXQiOjE2MTUyMzg5NzR9.fabETMm9MQFrA8YRVhTmqkxuAGyXqu-tHB8L_uMfMGc',
    )
      .then(setUser)
      .catch((err) => console.log(err.errors[0].description));
  }, []);

  return (
    <SafeAreaView
      style={styleSheet.safeArea}
      edges={['right', 'bottom', 'left']}>
      <Text>{JSON.stringify(user)}</Text>
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
