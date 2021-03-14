//LoginScreen module

// import packages
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet} from 'react-native';
import {userCurrent, userSignIn, userSignUp} from '../../api/auth/auth.api';
import {useState} from 'react';
import {useEffect} from 'react';
import {themes, colors, typography} from '../../styles';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';

//function return
function LoginScreen({navigation}) {
  // declaring a variable for themes
  const theme = themes.light;
  const [user, setUser] = useState(null);

  //testing userCurrent function()
  // useEffect(() => {
  //   userCurrent(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ1ODlhMjBkZDlmYTAwMDdjMTU4ZjUiLCJpYXQiOjE2MTUyMzg5NzR9.fabETMm9MQFrA8YRVhTmqkxuAGyXqu-tHB8L_uMfMGc',
  //   )
  //     .then(setUser)
  //     .catch(err => console.log(err.errors[0].description));
  // }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <View>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.loginTextToStart}>Log in to get Started.</Text>
        {/* using forms for login */}
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>
        <Button style={styles.forgotPasswordButton} transparent>
          <Text style={{color: theme.baseTextColor}}>Forget Password ? </Text>
        </Button>
        <Button style={styles.loginButton} block>
          <Text style={styles.loginText}>LOG IN</Text>
        </Button>
        <Button
          style={styles.signUpBottom}
          transparent
          onPress={() => {
            navigation.navigate('SignUpScreen');
          }}>
          <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
        </Button>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('TabScreen');
          }}></Button>
      </View>
    </SafeAreaView>
  );
}

// Stylesheet for the Log in
const styles = StyleSheet.create({
  loginButton: {
    margin: '10%',
    marginTop: '5%',
    backgroundColor: themes.light.primaryColor,
    color: '#000',
  },

  safeArea: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  welcome: {
    fontSize: typography.fs8,
    marginTop: '10%',
    fontWeight: typography.fwSemiBold,
    marginLeft: '5%',
  },
  loginTextToStart: {
    fontSize: typography.fs5,
    marginTop: '2%',
    fontWeight: typography.fwNormal,
    marginLeft: '6%',
  },
  forgotPasswordButton: {
    marginLeft: '55%',
    marginTop: '1%',
  },
  loginText: {
    color: colors.white,
    fontWeight: typography.fwSemiBold,
  },
  signUpBottom: {
    margin: '14%',
    marginTop: '0%',
    color: '#FFFF',
  },
  signUpText: {
    color: '#000',
    fontWeight: typography.fwSemiBold,
  },
});

export default LoginScreen;
