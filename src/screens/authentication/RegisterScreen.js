//LoginScreen module

// import packages
import React, {createRef, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {userCurrent, userSignIn, userSignUp} from '../../api/auth/auth.api';

import CheckBox from '@react-native-community/checkbox';

import {themes, colors, typography, spacing} from '../../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

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
import {RadioButton} from 'react-native-paper';
import MessageModal from '../../components/MessageModal';
import Loader from '../../components/Loader';

import {useAsyncStorage} from '../../hooks/useAsyncStorage';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import FocusedStatusBar from '../../components/FocusedStatusBar';

//function return
function RegisterScreen({navigation}) {
  // declaring a variable for themes
  const theme = themes.light;

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

  useEffect(() => {}, [userName]);

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
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <MessageModal
        showing={isRegistraionSuccess}
        message="Registration Successful!"
      />
      <Loader loading={loading} />
      <ScrollView>
        <Text style={styles.welcome}>Join The Community</Text>
        <Text style={styles.signUpText}>Get full access today</Text>
        <Text style={styles.allFields}>All Fields are Mandatory</Text>

        <KeyboardAvoidingView enabled>
          <Form>
            <View style={{flexDirection: 'row'}}>
              <Item
                style={{
                  flex: 1,
                  borderRadius: spacing.smaller,
                  height: '70%',
                  marginLeft: '5%',
                  marginTop: '5%',
                }}
                regular>
                <Input
                  style={{justifyContent: 'flex-start'}}
                  placeholder=" First Name"
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
              <Item
                style={{
                  flex: 1,
                  borderRadius: spacing.smaller,
                  height: '70%',
                  marginLeft: '5%',
                  marginTop: '5%',
                  marginRight: '5%',
                }}
                regular>
                <Input
                  style={{justifyContent: 'flex-end'}}
                  placeholder=" Last Name"
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

            <Item style={styles.item} regular>
              <Input
                placeholder=" Email"
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
            <Item style={styles.item} regular>
              <Input
                placeholder=" Password"
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
            <Item style={styles.item} regular>
              <Input
                placeholder=" Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                onSubmitEditing={Keyboard.dismiss}
                ref={passwordConfirmInputRef}
                returnKeyType="next"
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </Item>

            <Item style={styles.item} regular>
              <Input
                placeholder=" Age"
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
            <DropDownPicker
              items={[
                {
                  label: 'Male',
                  value: 'Male',
                },
                {
                  label: 'Female',
                  value: 'Female',
                },
                {
                  label: 'Other',
                  value: 'Other',
                },
              ]}
              placeholder="Gender"
              containerStyle={styles.genderItem}
              style={{
                backgroundColor: colors.gray100,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              labelStyle={{
                color: themes.light.baseTextColor,
                fontSize: typography.fs,
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: colors.gray100}}
              onChangeItem={(item) => setUserGender(item.value)}
            />
            <View style={styles.radioButtonGroup}>
              <RadioButton.Group
                onValueChange={(newValue) => setUserType(newValue)}
                value={userType}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: spacing.smallest,
                    }}>
                    <View
                      style={{
                        borderColor: colors.gray700,
                        borderWidth: 0.5,
                        height: 35,
                        width: 35,
                        borderRadius: 100,
                      }}>
                      <RadioButton value="Indigenous" />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginLeft: spacing.smallest,
                      }}>
                      Indigenous
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: spacing.smallest,
                    }}>
                    <View
                      style={{
                        borderColor: colors.gray700,
                        borderWidth: 0.5,
                        height: 35,
                        width: 35,
                        borderRadius: 100,
                      }}>
                      <RadioButton value="Inuit" />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginLeft: spacing.smallest,
                      }}>
                      Inuit
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: spacing.smallest,
                    }}>
                    <View
                      style={{
                        borderColor: colors.gray700,
                        borderWidth: 0.5,
                        height: 35,
                        width: 35,
                        borderRadius: 100,
                      }}>
                      <RadioButton value="Métis" />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginLeft: spacing.smallest,
                      }}>
                      Métis
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: spacing.smallest,
                    }}>
                    <View
                      style={{
                        borderColor: colors.gray700,
                        borderWidth: 0.5,
                        height: 35,
                        width: 35,
                        borderRadius: 100,
                      }}>
                      <RadioButton value="None" />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginLeft: spacing.smallest,
                      }}>
                      None
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </Form>
          <Button style={styles.signUpButton} block onPress={handleRegister}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Button>

          <Text style={styles.loginText}>
            By Continuing, You Agree To Accept Our Privacy Policy & Terms of
            Service.
          </Text>

          <Button
            transparent
            onPress={() => {
              navigation.navigate('TabScreen');
            }}></Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

// stylesheet for the signUp screen
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
  },
  signUpButton: {
    width: '70%',
    height: '6%',
    marginTop: '15%',
    marginLeft: '15%',
    marginRight: '20%',
    backgroundColor: colors.primary500,
    borderRadius: spacing.smaller,
  },
  signUpText: {
    fontSize: typography.fs5,
    marginTop: '2%',
    marginBottom: '3%',
    fontWeight: typography.fwNormal,
    marginLeft: '5%',
    color: colors.primary900,
  },

  checkboxView: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '3%',
  },

  safeArea: {
    flex: 1,
  },
  radioButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.largest,
    marginBottom: spacing.small,
  },
  welcome: {
    fontSize: typography.fs6,
    marginTop: '10%',
    fontWeight: typography.fwBold,
    marginLeft: '5%',
    color: colors.primary900,
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
    paddingBottom: spacing.smallest,
  },
  signUpButtonText: {
    color: colors.white,
    fontWeight: typography.fwSemiBold,
  },
  loginText: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwNormal,
    lineHeight: typography.lh2,
    fontSize: typography.fs2,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: '5%',
    marginHorizontal: '15%',
  },
  item: {
    borderRadius: spacing.smaller,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: colors.gray100,
    // marginBottom:100
  },
  allFields: {
    fontSize: typography.fs2,
    marginTop: '1%',
    fontWeight: typography.fwBold,
    marginLeft: '5%',
    color: 'crimson',
  },
  genderItem: {
    borderRadius: spacing.smaller,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: colors.gray100,
    height: 50,
  },
});

export default RegisterScreen;
