//AboutScreen.js

// import packages
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import { colors, themes, typography, spacing } from '../../styles';
import BackButtonHeaderLeft from '../../components/BackButtonHeaderLeft';

//function return
function AboutScreen({ navigation }) {
  const theme = themes.light;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['right', 'top', 'left', 'bottom']}>
      <View style={styles.headerContainer}>
        <BackButtonHeaderLeft navigationProps={navigation} />
        <Text style={styles.heading}>About Us</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row', width: '100%',
    shadowColor: colors.gray900,
    height: 45,
    marginTop: spacing.base,
    shadowOpacity: 0.2,
    backgroundColor: colors.white,
    shadowOffset: { width: 3, height: 6 },
  },
  heading: {
    color: colors.primary900,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    justifyContent: 'center',
    textAlign: 'center',
    paddingRight: spacing.largest,
    paddingTop: spacing.smallest,
    width: '90%'
  },
});

export default AboutScreen;
