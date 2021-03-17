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
import Loader from '../../components/Loader';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';

//function return
function RegisterScreen({navigation}) {
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
    if (!userAge) {
      Alert.alert('Registration', 'Please fill Age');
      return;
    }

    if (!userGender) {
      Alert.alert('Registration', 'Please fill Age');
      return;
    }
    setLoading(true);
    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: userEmail.trim(),
      gender: userGender.trim(),
      age: userAge.trim(),
      type: 'Indigenous',
    };
    if (passwordConfirm.trim() == userPassword.trim()) {
      data.password = userPassword.trim();
      userSignUp(data)
        .then((response) => {
          console.log(response);
          if (response.data) {
            setUserName(userEmail);
          }
        })
        .finally(() => {
          setLoading(false);
          setIsRegistraionSuccess(true);
          navigation.navigate('Login');
        })
        .catch((err) => {
          setLoading(false);
          for (let key in err.errors[0]) {
            console.log(key);
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
      <MessageModal
        showing={isRegistraionSuccess}
        message="Registration Successful!"
      />
      <Loader loading={loading} />
      <ScrollView>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.signUpText}>Sign Up to get Started.</Text>
        <Form>
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input value={firstName} onChangeText={setfirstName} />
          </Item>
          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input value={lastName} onChangeText={setLastName} />
          </Item>
          <Item floatingLabel>
            <Label>Age</Label>
            <Input value={userAge} onChangeText={setUserAge} />
          </Item>
          <Item floatingLabel>
            <Label>Gender</Label>
            <Input value={userGender} onChangeText={setUserGender} />
          </Item>
          <View style={styles.checkboxView}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.radio}
            />
            <Text style={styles.label}>Is Indigeneous</Text>
          </View>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              value={userEmail}
              onChangeText={setUserEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
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
            />
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input value={passwordConfirm} onChangeText={setPasswordConfirm} />
          </Item>
        </Form>
        <Button style={styles.signUpButton} block onPress={handleRegister}>
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
