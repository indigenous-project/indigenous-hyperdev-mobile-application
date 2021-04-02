//LoginScreen module

// import packages
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Alert, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { userCurrent, userSignIn, userSignUp } from '../../api/auth/auth.api';
import { themes, colors, spacing, typography } from '../../styles';
import { useIsFocused } from '@react-navigation/native';

import {
  Form,
  Item,
  Input,
  Label,
  Text,
} from 'native-base';
import { createRef } from 'react';
import Loader from '../../components/Loader';
import { removeAsyncStorage, useAsyncStorage } from '../../hooks/useAsyncStorage';
import { useSecureStorage } from '../../hooks/useSecureStorage';
import { deleteItemAsync } from 'expo-secure-store';

//function return
function LoginScreen({ navigation }) {
  // declaring a variable for themes
  const theme = themes.light;

  // set up useState
  const [userName, setUsername] = useAsyncStorage('userName', '');
  const [token, setToken] = useSecureStorage('userToken', '');
  const [userEmail, setUserEmail] = useState(userName);
  //const [currentUser, setCurrentUser] = useState(userName);
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  //define passwordRef to autofil password
  const passwordInputRef = createRef();

  useEffect(() => {
    if (token) {
      setLoading(true);
      userCurrent(token)
        .then((response) => {
          setLoading(false); // hide loader
          setUsername(response.email);
          navigation.replace('DrawerRoute'); //  if login already navigate to home page
        })
        .catch((err) => {
          setLoading(false); // hide loader
          //removeAsyncStorage('userName');
          deleteItemAsync('userToken'); // remove token from storage when logout
          Alert.alert('User authentication', err.errors[0].description);
        });
    }
  }, [token]);

  useEffect(() => {
    if (userName) {
      setUserEmail(userName); // if userName exist , then autofil user name field
    }
  }, [userName]);

  //function handle tap submit button
  const signIn = async (email, password) => {
    if (!email) {
      Alert.alert('User authentication', 'Please fill email'); // check if email is entered
      return;
    }
    if (!password) {
      Alert.alert('User authentication', 'Please fill password'); // check if password is entered
      return;
    }
    setLoading(true); // show loader indicator
    // call API
    userSignIn({
      email: email,
      password: password,
    })
      .then((response) => {
        setToken(response.token);
      })
      .catch((err) => {
        setLoading(false); // hide loader
        Alert.alert('User authentication', err.errors[0].description); // show error
      });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'top', 'bottom']}>
      <Loader loading={loading} />

      <Text style={styles.welcome}>Welcome!</Text>
      <Text style={styles.loginTextToStart}>Log in to get started.</Text>
      {/* using forms for login */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View>
          <Form>
            <Item style={styles.item} floatingLabel>
              <Label style={styles.label}>Email</Label>
              <Input
                // placeholder=" Email"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
                value={userEmail}
                onChangeText={setUserEmail}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
              />
            </Item>
            <Item style={styles.item} floatingLabel>
              <Label style={styles.label}>Password</Label>
              <Input
                // placeholder=" Password"
                style={styles.input}
                value={userPassword}
                onChangeText={setUserPassword}
                secureTextEntry={true}
                blurOnSubmit={false}
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
              />
            </Item>
          </Form>
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
            transparent>
            <Text
              style={styles.forgetPWText}>
              Forgot Password ?{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => signIn(userEmail, userPassword)}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpBottom}
            transparent
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
          transparent
          onPress={() => {
            navigation.navigate('DrawerRoute');
          }}>
          <Text style={styles.skipText}>Skip For Now</Text>
        </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

// Stylesheet for the Log in
const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    padding: spacing.base,
    backgroundColor: colors.white
  },
  welcome: {
    fontSize: typography.fs8,
    marginTop: '20%',
    fontWeight: typography.fwBold,
    marginLeft: spacing.base,
    color: colors.primary900,
  },
  loginTextToStart: {
    fontSize: typography.fs5,
    marginTop: spacing.base,
    fontWeight: typography.fwMedium,
    marginLeft: spacing.base,
    color: colors.primary900,
    marginBottom: spacing.largest,
  },
  forgotPasswordButton: {
    marginLeft: '60%',
    marginTop: spacing.smaller,
    marginBottom: spacing.largest
  },
  forgetPWText: {
    fontWeight: typography.fwMedium,
    fontSize: typography.fs3,
    color: 'blue'
  },
  signUpBottom: {
    alignSelf: 'center',
    marginVertical: spacing.large
  },
  signUpText: {
    color: colors.primary900,
    fontWeight: typography.fwBold,
  },
  label: {
    marginHorizontal: spacing.base,
  },
  item: {
    borderRadius: spacing.smaller,
    marginHorizontal: spacing.base,
    marginVertical: spacing.base,
    backgroundColor: colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
  },
  input: {
    marginHorizontal: spacing.base
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: spacing.small,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: colors.primary500,
    paddingVertical: spacing.small,
    marginTop: spacing.largest
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});

export default LoginScreen;
