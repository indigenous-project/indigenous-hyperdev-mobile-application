import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Keyboard, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { themes, colors, typography, spacing } from '../../styles';

import {
  Item,
  Input,
  Label,
  Text,
} from 'native-base';
import FocusedStatusBar from '../../components/FocusedStatusBar';

function ForgotPassword() {
  const theme = themes.light;

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <Text style={styles.infoText}>
        Please enter the email you used at the time of registration to get the
        password reset instructions
      </Text>
      <Item style={styles.item} floatingLabel>
        <Label style={styles.label}>Email</Label>
        <Input style={styles.input} />
      </Item>
      <TouchableOpacity
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.white
  },
  infoText: {
    marginTop: '40%',
    marginBottom: spacing.largest,
    fontWeight: typography.fwNormal,
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    color: colors.primary900,
  },
  label: {
    marginHorizontal: spacing.base,
  },
  item: {
    borderRadius: spacing.smaller,
    marginVertical: spacing.base,
    backgroundColor: colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
  },
  input: {
    marginHorizontal: spacing.base
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: spacing.small,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: colors.primary500,
    paddingVertical: spacing.small,
    marginTop: spacing.largest
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});

export default ForgotPassword;
