//IndigenousPeopleScreen.js

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
function IndigenousPeopleScreen({ navigation }) {
  const theme = themes.light;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['right', 'top', 'left', 'bottom']}>
      <View style={styles.headerContainer}>
        <BackButtonHeaderLeft navigationProps={navigation} />
        <Text style={styles.heading}>Indigenous Peoples</Text>
      </View>
      <Image
        style={styles.image}
        source={require('../../testImages/indigenousImage.png')}
      />
      <Text style={styles.description}>North Bay is situated in traditional Anishinabek territory,
      on lands occupied by the peoples of Nipissing and
      Dokis First Nations whose aboriginal and treaty rights
      are recognized by the Robinson Huron Treaty of 1850 and
      affirmed by Section 35 (1) of the Constitution Act of Canada, 1982.</Text>
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
    paddingRight: spacing.larger,
    paddingTop: spacing.smaller,
    width: '90%'
  },
  image: {
    alignSelf: 'center',
    marginTop: spacing.largest,
    marginBottom: spacing.small,
  },
  description: {
    fontSize: typography.fs3,
    fontWeight: typography.fwMedium,
    textAlign: 'center',
    lineHeight: typography.lh3,
    padding: spacing.base,
  },
});

export default IndigenousPeopleScreen;
