//LoginScreen module

// import packages
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  KeyboardAvoidingView,

} from 'react-native';
import { userCurrent, userSignIn, userSignUp } from '../../api/auth/auth.api';
import { useState } from 'react';
import { useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { themes, colors, typography, spacing } from '../../styles';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Body,
  Row,
  Radio,
  Right,
  Left,
} from 'native-base';
import { RadioButton } from 'react-native-paper'
import MessageModal from '../../components/MessageModal';
import Loader from '../../components/Loader';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';
import { createRef } from 'react/cjs/react.production.min';

//function return
function RegisterScreen({ navigation }) {
  // declaring a variable for themes
  const theme = themes.light;
  // using use state for the checkbox isIndigenous
  const [isSelected, setSelection] = useState(false);
  //use state for showing message modal registration
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  //use state store username email
  const [userName, setUserName] = useAsyncStorage('userName', '');
  // use state input
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('');

  //createRef
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const genderInputRef = createRef();
  const lastNameInputRef = createRef();
  const firstNameInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordConfirmInputRef = createRef();

  useEffect(() => { }, [userName]);

  const handleRegister = () => {
    if (!firstName) {
      Alert.alert('Registration', 'Please fill First Name');
      return;
    }
    if (!userEmail) {
      Alert.alert('Registration', 'Please fill Email');
      return;
    }

    if (!userPassword) {
      Alert.alert('Registration', 'Please fill password');
      return;
    }
    if (!lastName) {
      Alert.alert('Registration', 'Please fill Last Name');
      return;
    }
    if (!passwordConfirm) {
      Alert.alert('Registration', 'Please confirm password');
      return;
    }
    setLoading(true);
    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: userEmail.trim(),
      gender: userGender.trim(),
      age: userAge.trim(),
      type: userType.trim(),
    };
    if (passwordConfirm.trim() == userPassword.trim()) {
      data.password = userPassword.trim();
      userSignUp(data)
        .then((response) => {
          console.log(response);
          if (response) {
            setUserName(userEmail);
            setLoading(false);
            setIsRegistraionSuccess(true);
            navigation.navigate('Login');
          }
        })
        .catch((err) => {
          setLoading(false);
          for (let key in err.errors[0]) {
            if (key === 'message' || key === 'description' || key === 'title') {
              Alert.alert('Registration', err.errors[0][key]);
              break;
            }
          }
        }); // show error)
    } else {
      setLoading(false);
      Alert.alert('Registration', 'Password not match');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <View style={styles.container}>
        <MessageModal
          showing={isRegistraionSuccess}
          message="Registration Successful!"
        />
        <Loader loading={loading} />
        <ScrollView>
          <Text style={styles.welcome}>Join the Community</Text>
          <Text style={styles.signUpText}>Get full access today</Text>

          <KeyboardAvoidingView enabled>
            <Form>
              <View style={styles.inputField}>
                <Item floatingLabel>
                  <Label>First Name</Label>
                  <Input
                    value={firstName}
                    onChangeText={setfirstName}
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    ref={firstNameInputRef}
                    onSubmitEditing={() =>
                      lastNameInputRef.current && lastNameInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </Item>
              </View>
              <View style={styles.inputField}>
                <Item floatingLabel>
                  <Label>Last Name</Label>
                  <Input
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    ref={lastNameInputRef}
                    onSubmitEditing={() =>
                      ageInputRef.current && ageInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </Item>
              </View>
              <View style={styles.inputField}>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input
                    value={userEmail}
                    onChangeText={setUserEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    ref={emailInputRef}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                      passwordInputRef.current && passwordInputRef.current.focus()
                    }
                  />
                </Item>
              </View>
              <View style={styles.inputField}>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                    value={userPassword}
                    onChangeText={setUserPassword}
                    secureTextEntry={true}
                    blurOnSubmit={false}
                    keyboardType="default"
                    returnKeyType="next"
                    ref={passwordInputRef}
                    onSubmitEditing={() =>
                      passwordConfirmInputRef.current &&
                      passwordConfirmInputRef.current.focus()
                    }
                  />
                </Item>
              </View>
              <View style={styles.inputField}>
                <Item floatingLabel>
                  <Label>Confirm Password</Label>
                  <Input
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    onSubmitEditing={Keyboard.dismiss}
                    ref={passwordConfirmInputRef}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    secureTextEntry={true}
                  />
                </Item>
              </View>
              <View style={styles.inputField}>
                <Item floatingLabel>
                  <Label>Age (Optional)</Label>
                  <Input
                    value={userAge}
                    onChangeText={setUserAge}
                    keyboardType="numeric"
                    returnKeyType="next"
                    ref={ageInputRef}
                    onSubmitEditing={() =>
                      genderInputRef.current && genderInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </Item>
              </View>
              <View style={styles.inputField}>
                <Item floatingLabel>
                  <Label>Gender (Optional)</Label>
                  <Input
                    value={userGender}
                    onChangeText={setUserGender}
                    returnKeyType="next"
                    ref={genderInputRef}
                    onSubmitEditing={() =>
                      emailInputRef.current && emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </Item>
              </View>
              <View style={styles.radioButtonGroup}>
                <RadioButton.Group onValueChange={newValue => setUserType(newValue)} value={userType}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', marginRight: spacing.smallest }}>
                      <View style={{ borderColor: colors.gray700, borderWidth: 0.5, height: 35, width: 35, borderRadius: 100 }} >
                        <RadioButton value="Indigenous" />
                      </View>
                      <Text style={{ alignSelf: 'center', marginLeft: spacing.smallest }}>Indigenous</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginRight: spacing.smallest }}>
                      <View style={{ borderColor: colors.gray700, borderWidth: 0.5, height: 35, width: 35, borderRadius: 100 }} >
                        <RadioButton value="Inuit" />
                      </View>
                      <Text style={{ alignSelf: 'center', marginLeft: spacing.smallest }}>Inuit</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginRight: spacing.smallest }}>
                      <View style={{ borderColor: colors.gray700, borderWidth: 0.5, height: 35, width: 35, borderRadius: 100 }} >
                        <RadioButton value="Métis" />
                      </View>
                      <Text style={{ alignSelf: 'center', marginLeft: spacing.smallest }}>Métis</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginRight: spacing.smallest }}>
                      <View style={{ borderColor: colors.gray700, borderWidth: 0.5, height: 35, width: 35, borderRadius: 100 }} >
                        <RadioButton value="None" />
                      </View>
                      <Text style={{ alignSelf: 'center', marginLeft: spacing.smallest }}>None</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            </Form>
            <Button style={styles.signUpButton} block onPress={handleRegister}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </Button>
            <Button
              style={styles.loginTextButton}
              transparent
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.loginText}>
                Already have an account? Log in
            </Text>
            </Button>
            <Button
              transparent
              onPress={() => {
                navigation.navigate('TabScreen');
              }}></Button>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// stylesheet for the signUp screen
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base
  },
  signUpButton: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: colors.primary500,
    color: colors.white,
  },
  signUpText: {
    fontSize: typography.fs5,
    marginVertical: spacing.small,
    fontWeight: typography.fwNormal,
    color: colors.primary900
  },
  welcome: {
    fontSize: typography.fs7,
    marginTop: spacing.largest,
    fontWeight: typography.fwSemiBold,
    color: colors.primary900
  },
  inputField: {
    borderWidth: 0.2,
    // backgroundColor: colors.white,
    // shadowColor: colors.gray900,
    // shadowOffset: { width: 3, height: 6 },
    // shadowOpacity: 0.2,
    marginVertical: spacing.smallest,
    borderRadius: spacing.small,
    paddingRight: spacing.small,
    // paddingTop: -5,
    paddingBottom: spacing.smallest
  },
  radioButtonGroup: {
    marginTop: spacing.small,
    marginBottom: spacing.largest,
  },
  signUpButtonText: {
    color: colors.white,
    fontWeight: typography.fwSemiBold,
  },
  loginTextButton: {
    marginTop: spacing.large,
    alignSelf: 'center',
    color: colors.white,
  },
  loginText: {
    color: colors.gray900,
    fontWeight: typography.fwSemiBold,
  },
});

export default RegisterScreen;
