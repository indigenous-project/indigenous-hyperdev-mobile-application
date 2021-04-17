//LoginScreen module

// Import field////////////////////////////////////////////
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {userCurrent, userSignIn} from '../../api/auth/auth.api';
import {colors, spacing, typography} from '../../styles';

import {Form, Item, Input, Label, Text} from 'native-base';
import {createRef} from 'react';
import Loader from '../../components/Loader';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import {useSecureStorage} from '../../hooks/useSecureStorage';
import {deleteItemAsync} from 'expo-secure-store';
import {useNetInfo} from '@react-native-community/netinfo';
import FocusedStatusBar from '../../components/FocusedStatusBar';
////////////////////////////////////////////////////

//Define function LoginScreen:
//User can enter the credential: email and password to log in the app
//If user has no an account,  tap button Sign up to navigate to Register screen
//If user forgot password, tap forgot password button to navigate to forgot password screen.
function LoginScreen({navigation}) {
  // useState field
  const [userName, setUsername] = useAsyncStorage('userName', ''); // use Async storage hook to store email
  const [token, setToken] = useSecureStorage('userToken', ''); // use Secure storage hook to store email
  const [userEmail, setUserEmail] = useState(userName); // use state for email input

  const [userPassword, setUserPassword] = useState(''); // use state for password input
  const [loading, setLoading] = useState(false); // use state for Loader activity indicator

  //define passwordRef
  const passwordInputRef = createRef();
  //use Hook check network info
  const netInfo = useNetInfo();

  //Use Effect:  Verify current
  useEffect(() => {
    if (netInfo.isConnected === true) {
      if (token) {
        setLoading(true); // Enable loader
        userCurrent(token) // Fetching current user api
          .then((response) => {
            setLoading(false); // Hide loader
            setUsername(response.email); // Store email into Async storage
            navigation.replace('DrawerRoute'); //  if login already navigate to home page
          })
          .catch((err) => {
            setLoading(false); // hide loader

            deleteItemAsync('userToken'); // remove token from storage when verify user fails
            err.errors
              ? Alert.alert('User authentication', err.errors[0].description)
              : Alert.alert(err.message); // Show Alert message if verify user fails
          });
      }
    } else if (netInfo.isConnected === false) {
      Alert.alert('No internet connection');
    }
  }, [netInfo.isConnected, token]); // dependency: token

  // User Effect; autofil user name field
  useEffect(() => {
    if (userName) {
      setUserEmail(userName); // if userName exist , then autofil user name field
    }
  }, [userName]);

  //Function handle tap Login button
  const signIn = async (email, password) => {
    if (netInfo.isConnected === true) {
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
          setToken(response.token); // Store token in sercure storage
        })
        .catch((err) => {
          setLoading(false); // hide loader
          err.errors
            ? Alert.alert('User authentication', err.errors[0].description)
            : Alert.alert(err.message); // Show Alert message if verify user fails
        });
    } else if (netInfo.isConnected === false) {
      Alert.alert('No internet connection');
    }
  };

  //Render elements
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={styles.safeArea}
        edges={['right', 'left', 'top', 'bottom']}>
        {/*Use Loader*/}
        <FocusedStatusBar barStyle="dark-content" />
        <Loader loading={loading} />

        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.loginTextToStart}>Log in to get started.</Text>
        {/* Using forms for login */}
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <View>
            <Form>
              {/*Email input field floating label*/}
              <Item style={styles.item}>
                <Label style={styles.label}>Email</Label>
                <Input
                  style={styles.input}
                  autoCapitalize="none" // No auto capitaliza first character
                  keyboardType="email-address" // Set up keyboard type
                  returnKeyType="next" // Set up return key : Next
                  blurOnSubmit={false}
                  value={userEmail} // Show value for email input field
                  onChangeText={setUserEmail} // Upate value for email input field
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  } // Focus on email field while editting
                />
              </Item>
              {/*Password input field floating label*/}
              <Item style={styles.item}>
                <Label style={styles.label}>Password</Label>
                <Input
                  style={styles.input}
                  value={userPassword} // Show value for password input field
                  onChangeText={setUserPassword} // Upate value for password input field
                  secureTextEntry={true} // Secure password typing
                  blurOnSubmit={false}
                  keyboardType="default"
                  returnKeyType="next" // Set up return key : Next
                  ref={passwordInputRef} // use Ref
                  onSubmitEditing={Keyboard.dismiss}
                />
              </Item>
            </Form>
            {/*Forgot password button*/}
            <TouchableOpacity
              style={styles.forgotPasswordButton}
              // Navigate to Forgot password screen when user tap in
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
              transparent>
              <Text style={styles.forgetPWText}>Forgot Password ? </Text>
            </TouchableOpacity>
            {/*Login button*/}
            <TouchableOpacity
              style={styles.buttonContainer}
              // Call function Sign in when uer tap in
              onPress={() => signIn(userEmail, userPassword)}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            {/*Sign up an account button*/}
            <TouchableOpacity
              style={styles.signUpBottom}
              transparent
              // Navigate to register screen when user tap in
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={styles.signUpText}>
                Don't have an account? Sign up
              </Text>
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
    </TouchableWithoutFeedback>
  );
}

// Stylesheet for the Log in
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    padding: spacing.base,
    backgroundColor: colors.white,
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
    marginBottom: spacing.largest,
  },
  forgetPWText: {
    fontWeight: typography.fwMedium,
    fontSize: typography.fs3,
    color: 'blue',
  },
  signUpBottom: {
    alignSelf: 'center',
    marginVertical: spacing.large,
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
    shadowOffset: {width: 2, height: 2},
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
  },
  input: {
    marginHorizontal: spacing.base,
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: spacing.small,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: colors.primary400,
    paddingVertical: spacing.small,
    marginTop: spacing.largest,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});
/////////////////////////////////
export default LoginScreen;
