//LoginScreen module

// import packages
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {userCurrent, userSignIn, userSignUp} from '../../api/auth/auth.api';
import {useState} from 'react';
import {useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
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
  Body,
  Row,
  Radio,
  Right,
  Left,
} from 'native-base';
import MessageModal from '../../components/MessageModal';

//function return
function RegisterScreen({navigation}) {
  // declaring a variable for themes
  const theme = themes.light;
  // using use state for the checkbox isIndigenous
  const [isSelected, setSelection] = useState(false);
  //use state for showing message modal registration
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  // use state input
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!firstName) {
      Alert.alert('Please fill First Name');
      return;
    }
    if (!userEmail) {
      Alert.alert('Please fill Email');
      return;
    }

    if (!userPassword) {
      Alert.alert('Please fill password');
      return;
    }
    if (!lastName) {
      Alert.alert('Please fill Last Name');
      return;
    }
    if (!passwordConfirm) {
      Alert.alert('Please confirm password');
      return;
    }
    if (!userAge) {
      Alert.alert('Please fill Age');
      return;
    }

    if (!userGender) {
      Alert.alert('Please fill Age');
      return;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <MessageModal
        showing={isRegistraionSuccess}
        message="Registration Successful!"
      />
      <ScrollView>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.signUpText}>Sign Up to get Started.</Text>
        <Form>
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Age</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Gender</Label>
            <Input />
          </Item>
          <View style={styles.checkboxView}>
            <Radio
              value={isSelected}
              onValueChange={setSelection}
              style={styles.radio}
            />
            <Text style={styles.label}>Is Indigeneous</Text>
          </View>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input />
          </Item>
        </Form>
        <Button style={styles.signUpButton} block>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Button>
        <Button
          style={styles.loginTextButton}
          transparent
          onPress={() => {
            navigation.navigate('loginScreen');
          }}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </Button>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('TabScreen');
          }}></Button>
      </ScrollView>
    </SafeAreaView>
  );
}

// stylesheet for the signUp screen
const styles = StyleSheet.create({
  signUpButton: {
    margin: '10%',
    marginTop: '5%',
    backgroundColor: themes.light.primaryColor,
    color: '#000',
  },

  signUpText: {
    fontSize: typography.fs5,
    marginTop: '2%',
    fontWeight: typography.fwNormal,
    marginLeft: '6%',
  },

  checkboxView: {
    flexDirection: 'row',
    marginTop: '10%',
    marginLeft: '3%',
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
  radio: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: colors.gray600,
  },
  signUpButtonText: {
    color: colors.white,
    fontWeight: typography.fwSemiBold,
  },
  loginTextButton: {
    margin: '14%',
    marginTop: '0%',
    color: '#000',
  },
  loginText: {
    color: '#000',
    fontWeight: typography.fwSemiBold,
  },
});

export default RegisterScreen;
