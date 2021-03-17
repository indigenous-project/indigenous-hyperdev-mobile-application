import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Alert, Keyboard} from 'react-native';
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
  Header,
} from 'native-base';

function Forgotpassword() {
  const theme = themes.light;

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <Text style={styles.infoText}>
        Please enter the email you used at the time of registration to get the
        password reset instructions
      </Text>
      <View>
        <Item style={styles.textBox} regular>
          <Input style={{fontSize: typography.fs1}} placeholder=" Email" />
        </Item>
      </View>
      <Button style={styles.emailButton} block light>
        <Text style={styles.emailButtonText}>Send Email</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  infoText: {
    fontSize: typography.fs3,
    marginTop: '50%',
    fontWeight: typography.fwNormal,
    marginLeft: '5%',
    marginRight: '5%',
    color: colors.primary800,
  },

  emailButton: {
    alignItems: 'center',
    color: colors.primary100,
    position: 'absolute',
    top: '50%',
    marginLeft: '20%',
    backgroundColor: themes.light.primaryColor,
    color: '#000',
    width: '60%',
    height: '5%',
  },

  emailButtonText: {
    color: colors.white,
    fontWeight: typography.fwSemiBold,
  },

  textBox: {
    borderRadius: 10,
    width: '90%',
    marginLeft: '5%',
    marginTop: '10%',
  },
});

export default Forgotpassword;
