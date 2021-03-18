//LoginScreen module

// import packages
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Alert, Keyboard} from 'react-native';
import {userCurrent, userSignIn, userSignUp} from '../../api/auth/auth.api';
import {useState} from 'react';
import {useEffect} from 'react';
import {themes, colors, spacing, typography} from '../../styles';
import {useIsFocused} from '@react-navigation/native';

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
import {deleteItemAsync} from 'expo-secure-store';

//function return
function LoginScreen({navigation}) {
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
    console.log(token);

    if (token) {
      setLoading(true);
      userCurrent(token)
        .then(response => {
          //console.log(response.data.email);
          setLoading(false); // hide loader
          setUsername(response.data.email);
          navigation.replace('DrawerRoute');
        })
        .catch(err => {
          console.log(err);
          setLoading(false); // hide loader
          //removeAsyncStorage('userName');
          deleteItemAsync('userToken'); // remove token from storage when logout
          Alert.alert('User authentication', err.errors[0].description);
        });
    }
    //  if login already navigate to home page
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
      .then(response => {
        verifyUser(response.data.token);
      })
      .catch(err => {
        setLoading(false); // hide loader
        Alert.alert('User authentication', err.errors[0].description); // show error
      });
  };

  const verifyUser = myToken => {
    setToken(myToken);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <Loader loading={loading} />
      <View>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.loginTextToStart}>Log in to get started.</Text>
        {/* using forms for login */}
        <Form>
          <Item style={styles.item} regular> 
            <Input
             placeholder=" Email"
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
          <Item style={styles.item} regular>
            <Input
            placeholder=" Password"
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
        <Button
          style={styles.forgotPasswordButton}
          onPress={() => {
            navigation.navigate('Forgot Password');
          }}
          transparent>
          <Text style={{fontWeight: typography.fwMedium, fontSize: typography.fs3}}>Forgot Password ? </Text>
        </Button>
        <Button
          title="Sign in"
          onPress={() => signIn(userEmail, userPassword)}
          style={styles.loginButton}
          block>
          <Text style={styles.loginText}>Log In</Text>
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
          <Text style={styles.skipText} >Skip For Now</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

// Stylesheet for the Log in
const styles = StyleSheet.create({
  loginButton: {
    width: '65%',
    marginTop: '5%',
    marginLeft: '15%',
    marginBottom: '5%',
    height: '6%',
    backgroundColor: colors.primary700,
    color: '#000',
    borderRadius: spacing.smaller,
  },

  safeArea: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  welcome: {
    fontSize: typography.fs6,
    marginTop: '20%',
    fontWeight: typography.fwBold,
    marginLeft: '5%',
    color: colors.primary900,
  },
  loginTextToStart: {
    fontSize: typography.fs4,
    marginTop: '2%',
    fontWeight: typography.fwNormal,
    marginLeft: '6%',
    color: colors.primary900,
    marginBottom: '5%'
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
    color: colors.primary900,
    fontWeight: typography.fwBold,
  },
  item: {
    borderRadius: spacing.smaller,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: colors.gray100,
  },
  skipText: {
    fontWeight: typography.fwBold,
    color: colors.primary900,
    marginLeft: '30%',
  }
});

export default LoginScreen;
