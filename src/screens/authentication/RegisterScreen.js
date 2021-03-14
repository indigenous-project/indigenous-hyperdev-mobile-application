//LoginScreen module

// import packages
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet} from 'react-native';
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
} from 'native-base';

//function return
function RegisterScreen(props) {
  // declaring a variable for themes
  const theme = themes.light;
  // using use state for the checkbox
  const [isSelected, setSelection] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <View>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.signUpText}>SignUp to get Started.</Text>
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
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
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
      </View>
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
  checkbox: {
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
