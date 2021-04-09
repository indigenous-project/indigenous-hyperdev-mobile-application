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
  TouchableOpacity,
  Linking
} from 'react-native';

import { colors, themes, typography, spacing } from '../../styles';
import BackButtonHeaderLeft from '../../components/BackButtonHeaderLeft';

//function return
function AboutScreen({ navigation }) {
  const theme = themes.light;

  //function handle when user tap on link that navigate to mail app
  const handleEmailLink = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  //function handle when user tap on link that navigate to phone app
  const handlePhoneLink = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  //function handle when user tap on link that navigate to Facebook link
  const handleFbClick = (fbLink) => {
    Linking.openURL(`${fbLink}`);
  };

  //function handle when user tap on link that navigate to google map 
  const handleGoLink = (location) => {
    Linking.openURL(`https://maps.google.com/?q=${location}`);
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['right', 'top', 'left', 'bottom']}>
      <View style={styles.headerContainer}>
        <BackButtonHeaderLeft
          navigationProp={navigation}
          color={theme.primaryColor}
        />
        <Text style={styles.heading}>About Us</Text>
      </View>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../testImages/NBIFCLogo.png')}
          />
          <Text style={styles.logoText}>North Bay Indigenous Friendship Center</Text>
        </View>
        <View>
          <Text style={styles.title}>Our Mission</Text>
          <Text style={styles.description}>The mission of the North Bay Indigenous
          Friendship Centre is to improve the quality of life
          for First Nation, Metis, and Inuit people in the
          urban environment of North Bay by supporting
          self-determined activities which encourage equal
          access and participation in society and which
          respects Aboriginal culture distinctiveness. The
          North Bay Indigenous Friendship Centre provides
          a wide array of programs and services to support
          Aboriginal people of all ages. An important part of
          our mandate is to serve as a gathering place for
          Aboriginal and Non-Aboriginal people. The
          Centre is a place where Aboriginal culture is
          celebrated, friendships are made, knowledge and
        skills are shared and good times are enjoyed.</Text>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactUs}>Contact us</Text>
          <TouchableOpacity onPress={() => handleGoLink('980 Cassells Street North Bay')}>
            <Text style={styles.addressBlock}>980 Cassells Street.
            North Bay, Ontario
            P1B4A8
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePhoneLink('705-472-2811')}>
            <Text style={styles.contactInfo}>705-472-2811</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePhoneLink('1-888-472-0599')}>
            <Text style={styles.contactInfo}>1-888-472-0599</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEmailLink('reception@nbifc.org')}>
            <Text style={styles.contactInfo}>reception@nbifc.org</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => handleFbClick('https://www.facebook.com/NBIndigenousFC/')}>
            <Image
              style={styles.image}
              source={require('../../testImages/fbLogo.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../testImages/NBIFC2.png')}
          />
        </View>
      </ScrollView>
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
    paddingTop: spacing.smaller,
    width: '90%'
  },
  logoContainer: {
    marginTop: spacing.small,
    alignItems: 'center',
    marginBottom: spacing.largest
  },
  logoText: {
    fontSize: typography.fs4,
    fontWeight: typography.fwMedium,
    textAlign: 'center',
    lineHeight: typography.lh3,
  },
  image: {
    alignSelf: 'center',
    marginVertical: spacing.smaller
  },
  title: {
    color: colors.primary900,
    alignSelf: 'center',
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    marginBottom: spacing.smallest
  },
  description: {
    fontSize: typography.fs3,
    fontWeight: typography.fwMedium,
    lineHeight: typography.lh3,
    paddingHorizontal: spacing.base,
  },
  contactContainer: {
    marginVertical: spacing.small
  },
  contactUs: {
    alignSelf: 'center',
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    marginTop: spacing.small,
    marginBottom: spacing.smallest
  },
  addressBlock: {
    alignSelf: 'center',
    width: '40%',
    textAlign: 'center',
    lineHeight: typography.lh3,
    fontWeight: typography.fwMedium
  },
  contactInfo: {
    color: 'blue',
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
    alignSelf: 'center',
    paddingTop: spacing.small
  },
});

export default AboutScreen;
