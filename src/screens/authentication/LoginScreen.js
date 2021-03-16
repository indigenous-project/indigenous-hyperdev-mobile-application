//LoginScreen module

// import packages
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Alert, Keyboard} from 'react-native';
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
import {createRef} from 'react';
import Loader from '../../components/Loader';
import {removeAsyncStorage, useAsyncStorage} from '../../hooks/useAsyncStorage';
import {useSecureStorage} from '../../hooks/useSecureStorage';

//function return
function LoginScreen({navigation}) {
  // declaring a variable for themes
  const theme = themes.light;
  // set up useState
  const [userName, setUsername] = useAsyncStorage('userName', '');
  const [token, setToken] = useSecureStorage('userToken', '');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //define passwordRef to autofil password
  const passwordInputRef = createRef();

  useEffect(() => {
    if (userName) setUserEmail(userName); // if userName exist , then autofil user name field
    if (token) navigation.replace('DrawerRoute'); // if login already navigate to home page
  }, [token, userName, navigation]);

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
        setLoading(false); // hide loader
        setToken(response.data.token); // save token
        setUsername(userEmail); // save user email
      })
      .catch((err) => {
        setLoading(false); // hide loader
        Alert.alert('User authentication', err.errors[0].description); // show error
      });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <Loader loading={loading} />
      <View>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.loginTextToStart}>Log in to get Started.</Text>
        {/* using forms for login */}
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
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
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
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
        <Button style={styles.forgotPasswordButton} transparent>
          <Text style={{color: theme.baseTextColor}}>Forget Password ? </Text>
        </Button>
        <Button
          title="Sign in"
          onPress={() => signIn(userEmail, userPassword)}
          style={styles.loginButton}
          block>
          <Text style={styles.loginText}>LOG IN</Text>
        </Button>
        <Button
          style={styles.signUpBottom}
          transparent
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
        </Button>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('BottomTabScreen');
          }}>
          <Text>Skips this page</Text>
        </Button>
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
