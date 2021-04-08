//OrganizationDetailContactCard module

//import packages
import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {spacing, themes, typography} from '../styles';

const OrganizationDetailsContactCard = (props) => {
  //function to handle when user taps on number that invokes call option
  function handlePhone() {
    props.phone !== undefined ? Linking.openURL(`tel:${props.phone}`) : null;
  }

  //function to handle when user taps on website that navigate to default browser
  function handleWebsite() {
    props.website !== undefined
      ? Linking.openURL(`https://${props.website}`)
      : null;
  }
  //function to handle when user taps on email
  function handleEmail() {
    props.email !== undefined ? Linking.openURL(`mailto:${props.email}`) : null;
  }
  //function handle when user tap on facebook that navigate to default browser
  function handleFacebook() {
    props.facebook !== undefined
      ? Linking.openURL(`https://facebook.com/${props.facebook}`)
      : null;
  }
  return (
    <View style={styles.contactView}>
      {/* to display phone number */}
      {props.phone !== undefined ? (
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
        </View>
      ) : null}

      {/* to display website */}
      {props.website !== undefined ? (
        <View style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="earth"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Website:</Text>
          {/* calls the handleEmail function when the user clicks on the website */}
          <Text style={styles.website} onPress={handleWebsite}>
            {props.website}
          </Text>
        </View>
      ) : null}

      {/* to display email */}
      {props.email !== undefined ? (
        <View style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="email"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Email:</Text>
          {/* calls the handleEmail function when the user clicks on the email */}
          <Text style={styles.email} onPress={handleEmail}>
            {props.email}
          </Text>
        </View>
      ) : null}

      {/* to display facebook link */}
      {props.facebook !== undefined ? (
        <View style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="facebook"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Facebook:</Text>
          {/* calls the handleFacebook function when the user clicks on the facebook link */}
          <Text style={styles.facebook} onPress={handleFacebook}>
            {props.facebook}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default OrganizationDetailsContactCard;

const styles = StyleSheet.create({
  //styling on Organization contact View
  contactView: {
    shadowOpacity: 0,
    padding: spacing.base,
    backgroundColor: themes.light.inverseTextColor,
    marginBottom: spacing.small,
  },
  icon: {marginRight: spacing.small, bottom: 4},
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
