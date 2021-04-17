//Register screen module

// import packages
import React, { createRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ScrollView, Alert, Keyboard } from 'react-native';
import { userSignUp } from '../../api/auth/auth.api';
import { themes, colors, typography, spacing } from '../../styles';
import DropDownPicker from 'react-native-dropdown-picker';

import { Form, Item, Input, Label, Button, Text } from 'native-base';
import { RadioButton } from 'react-native-paper';
import MessageModal from '../../components/MessageModal';
import Loader from '../../components/Loader';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';
import FocusedStatusBar from '../../components/FocusedStatusBar';
//////////////////////////////////////////////////////////////

//Define function Register screen
//User can register an account to log in the app
//User should fill out all fields, there are 2-3 optional fields
//When user sign up an account successfully, then navigate to login screen to login the account
function RegisterScreen({ navigation }) {
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

  useEffect(() => { }, [userName]); // Reload page when userName change

  const handleRegister = () => {
    if (!firstName) {
      Alert.alert('Required', 'Please write First Name!'); // show message if first name input field missing
      return;
    }
    if (!userEmail) {
      Alert.alert('Required', 'Please write Email!'); // show message if email input field missing
      return;
    }

    if (!userPassword) {
      Alert.alert('Required', 'Please write password!'); // show message if password input field missing
      return;
    }
    if (!lastName) {
      Alert.alert('Required', 'Please write Last Name!'); // show message if last name input field missing
      return;
    }
    if (!passwordConfirm) {
      Alert.alert('Required', 'Please confirm your password!'); // show message if confirm password input field missing
      return;
    }
    if (!userType) {
      Alert.alert('Required', 'Please select group Type!'); // show message if confirm password input field missing
      return;
    }
    setLoading(true); // Enable loader
    // Make a body object to get data from inputs field
    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: userEmail.trim(),
    };
    userAge ? (data.age = userAge.trim()) : null;
    userGender ? (data.gender = userGender.trim()) : null;
    userType ? (data.type = userType.trim()) : null;
    // Check if password and confirm password input is match
    if (passwordConfirm.trim() == userPassword.trim()) {
      data.password = userPassword.trim(); // Pass password value into data object
      // Call API user sign up an account
      userSignUp(data)
        .then((response) => {
          if (response) {
            setUserName(userEmail); // Store email
            setLoading(false); // hide loader
            setIsRegistraionSuccess(true); // Show the message if user register successfully
            navigation.navigate('Login'); // Then navigate to Login Page
          }
        })
        .catch((err) => {
          setLoading(false); // Hide loader
          for (let key in err.errors[0]) {
            if (key === 'message' || key === 'description' || key === 'title') {
              Alert.alert('Registration Failed.', err.errors[0][key]);
              break;
            }
          }
        }); // show error
    } else {
      setLoading(false); // Hide loader
      Alert.alert('Alert!', 'Please make sure your "Password" and "Confirm Password" match.'); // Show alert if password is not match with confirm password
    }
  };

  //Render elements
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['right', 'left', 'bottom', 'top']}>
      {/* Apply custom status bar : light content */}
      <FocusedStatusBar barStyle="light-content" />
      {/* Message Modal */}
      <MessageModal
        showing={isRegistraionSuccess}
        message="Registration: Success!"
      />
      {/* Loader component */}
      <Loader loading={loading} />
      <ScrollView>
        <Text style={styles.title}>Join The Community</Text>
        <Text style={styles.subTtile}>Get full access today</Text>
        <Form>
          {/* First Name input field */}
          <Item style={styles.item} floatingLabel>
            <Label style={styles.label}>First Name</Label>
            <Input
              style={styles.input}
              value={firstName}
              onChangeText={setfirstName} //update value of input
              autoCapitalize="sentences"
              returnKeyType="next"
              ref={firstNameInputRef}
              onSubmitEditing={() =>
                lastNameInputRef.current && lastNameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </Item>
          {/* Last Name input field */}
          <Item style={styles.item} floatingLabel>
            <Label style={styles.label}>Last Name</Label>
            <Input
              style={styles.input}
              value={lastName}
              onChangeText={setLastName} //update value of input
              autoCapitalize="sentences"
              returnKeyType="next"
              ref={lastNameInputRef}
              onSubmitEditing={() =>
                ageInputRef.current && ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </Item>
          {/* Email input field */}
          <Item style={styles.item} floatingLabel>
            <Label style={styles.label}>Email</Label>
            <Input
              style={styles.input}
              value={userEmail}
              onChangeText={setUserEmail} //update value of input
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
          {/* Password input field */}
          <Item style={styles.item} floatingLabel>
            <Label style={styles.label}>Password</Label>
            <Input
              style={styles.input}
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
          {/* Confirm password input field */}
          <Item style={styles.item} floatingLabel>
            <Label style={styles.label}>Confirm Password</Label>
            <Input
              style={styles.input}
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              onSubmitEditing={Keyboard.dismiss}
              ref={passwordConfirmInputRef}
              returnKeyType="next"
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          </Item>
          {/* Age input field: Optional */}
          <Item style={styles.item} floatingLabel>
            <Label style={styles.label}>Age (Optional)</Label>
            <Input
              style={styles.input}
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
          {/* Gender input dropdown picker: Optional */}
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
            placeholder="Gender (Optional)"
            containerStyle={styles.genderDropDown}
            labelStyle={{
              color: themes.light.baseTextColor,
              fontSize: typography.fs,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: colors.gray100 }}
            onChangeItem={(item) => setUserGender(item.value)} // update new value for userGender state
          />

          {/* Type of user input radio buttons*/}
          <View style={styles.radioButtonGroup}>
            <RadioButton.Group
              onValueChange={(newValue) => setUserType(newValue)} // update new value for userType state
              value={userType}>
              <View style={{ flexDirection: 'row' }}>
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
        {/*Sign up button: Tap to call function Call API regiester an user */}
        <Button style={styles.signUpButton} block onPress={handleRegister}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Button>
        <Text style={styles.privacyNotice}>
          By Continuing, You Agree To Accept Our Privacy Policy & Terms of
          Service.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// stylesheet for the signUp screen
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  title: {
    fontSize: typography.fs6,
    marginHorizontal: spacing.base,
    fontWeight: typography.fwBold,
    color: colors.primary900,
  },
  subTtile: {
    color: colors.primary900,
    fontWeight: typography.fwMedium,
    fontSize: typography.fs5,
    marginHorizontal: spacing.base,
    marginVertical: spacing.smaller,
  },

  label: {
    marginHorizontal: spacing.base,
  },
  item: {
    borderRadius: spacing.smaller,
    marginHorizontal: spacing.base,
    marginBottom: spacing.smaller,
    backgroundColor: colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
  },
  input: {
    marginHorizontal: spacing.base,
  },
  genderDropDown: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    marginHorizontal: spacing.base,
    marginVertical: spacing.small,
    height: 50,
  },
  radioButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.base,
    marginBottom: spacing.small,
  },
  signUpButton: {
    borderRadius: 10,
    marginBottom: spacing.small,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: colors.primary400,
    marginTop: spacing.largest,
  },
  signUpButtonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
  privacyNotice: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwNormal,
    lineHeight: typography.lh2,
    fontSize: typography.fs2,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: spacing.base,
    marginBottom: spacing.largest,
    width: '70%',
  },
});

export default RegisterScreen;
