//OrganizationDetailContactCard module

//import packages
import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing, themes, typography } from '../styles';
import Hyperlink from 'react-native-hyperlink';

const OrganizationDetailsContactCard = props => {
  //function handle when user tap on number that invoke call option
  function handlePhone() {
    props.phone !== undefined ? Linking.openURL(`tel:${props.phone}`) : null;
  }

  //function handle when user tap on website that navigate to default browser
  function handleWebsite() {
    props.website !== undefined
      ? Linking.openURL(`https://${props.website}`)
      : null;
  }
  //function handle when user tap on website that navigate to default browser
  function handleEmail() {
    props.email !== undefined ? Linking.openURL(`mailto:${props.email}`) : null;
  }
  //function handle when user tap on website that navigate to default browser
  function handleFacebook() {
    props.facebook !== undefined
      ? Linking.openURL(`https://facebook.com/${props.facebook}`)
      : null;
  }
  return (
    <View style={styles.contactView}>
      {props.phone !== undefined ?
        <View style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="phone"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Phone:</Text>
          <Text style={styles.phone} onPress={handlePhone}>
            {props.phone}
          </Text>
        </View> : null}

      {props.website !== undefined ?
        <View style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="earth"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Website:</Text>
          <Text style={styles.website} onPress={handleWebsite}>
            {props.website}
          </Text>
        </View> : null}

      {props.email !== undefined ?
        <View style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="email"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Email:</Text>
          <Text style={styles.email} onPress={handleEmail}>
            {props.email}
          </Text>
        </View> : null}

      {props.facebook !== undefined ?
        <View style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="facebook"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Facebook:</Text>
          <Text style={styles.facebook} onPress={handleFacebook}>
            {props.facebook}
          </Text>
        </View> : null}
    </View>
  );
};

export default OrganizationDetailsContactCard;

const styles = StyleSheet.create({
  contactView: {
    shadowOpacity: 0,
    padding: spacing.base,
    backgroundColor: themes.light.inverseTextColor,
    marginBottom: spacing.small,
  },
  icon: { marginRight: spacing.small, bottom: 4 },
  view: {
    flexDirection: 'row',
    color: themes.light.primaryColor,
    height: spacing.largest,
  },
  textView: {
    color: themes.light.primaryColor,
    fontSize: typography.fs2,
    fontWeight: typography.fwBold,
  },
  phone: {
    marginLeft: 40,
    color: 'blue',
    fontSize: typography.fs2,
    textDecorationLine: 'underline',
  },
  website: {
    marginLeft: 29,
    color: 'blue',
    fontSize: typography.fs2,
    textDecorationLine: 'underline',
  },
  email: {
    marginLeft: 48,
    color: 'blue',
    fontSize: typography.fs2,
    textDecorationLine: 'underline',
  },
  facebook: {
    marginLeft: 20,
    color: 'blue',
    fontSize: typography.fs2,
    textDecorationLine: 'underline',
  },
});
