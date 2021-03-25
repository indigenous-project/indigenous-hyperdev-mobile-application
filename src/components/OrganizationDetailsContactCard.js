//OrganizationDetailContactCard module

//import packages
import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Text, Body, View} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {spacing, themes, typography} from '../styles';

const OrganizationDetailsContactCard = () => {
  return (
    <Card style={styles.contactCard}>
      <CardItem style={styles.cardView}>
        <Body style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="phone"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Phone:</Text>
        </Body>
        <Body style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="earth"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Website:</Text>
        </Body>
        <Body style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="email"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Email:</Text>
        </Body>
        <Body style={styles.view}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="facebook"
            size={20}
            color={themes.light.primaryColor}
          />
          <Text style={styles.textView}>Facebook:</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default OrganizationDetailsContactCard;

const styles = StyleSheet.create({
  contactCard: {shadowOpacity: 0},
  cardView: {flexDirection: 'column'},
  icon: {marginRight: spacing.small},
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
});
