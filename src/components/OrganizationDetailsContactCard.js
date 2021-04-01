//OrganizationDetailContactCard module

//import packages
import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {spacing, themes, typography} from '../styles';
import Hyperlink from 'react-native-hyperlink';

const OrganizationDetailsContactCard = (props) => {
  //function handle when user tap on number that invoke call option
  function handlePhone() {
    Linking.openURL(`tel:${props.phone}`);
  }

  //function handle when user tap on website that navigate to default browser
  function handleWebsite() {
    Linking.openURL(`https://${props.website}`);
  }
  //function handle when user tap on website that navigate to default browser
  function handleEmail() {
    Linking.openURL(`mailto:${props.email}`);
  }
  //function handle when user tap on website that navigate to default browser
  function handleFacebook() {
    Linking.openURL(`https://facebook.com/${props.facebook}`);
  }
  return (
    <View style={styles.contactView}>
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
      </View>
      <View style={styles.view}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="email"
          size={20}
          color={themes.light.primaryColor}
        />
        <Text style={styles.textView}>Email:</Text>
        <Text style={styles.email} onPress={handleEmail}>{props.email}</Text>
      </View>
      <View style={styles.view}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="facebook"
          size={20}
          color={themes.light.primaryColor}
        />
        <Text style={styles.textView}>Facebook:</Text>
        <Text style={styles.facebook} onPress={handleFacebook}>{props.facebook}</Text>
      </View>
    </View>
  );
};

export default OrganizationDetailsContactCard;

const styles = StyleSheet.create({
  contactView: {
    shadowOpacity: 0,
    padding: 10,
    backgroundColor: themes.light.inverseTextColor,
    marginBottom: 5,
    marginTop: 5,
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
