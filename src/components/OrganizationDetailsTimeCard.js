//OrganizationDetailTime module

//import packages
import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Text, Body, View} from 'native-base';
import {typography, spacing, themes} from '../styles';
const OrganizationDetailsTimeCard = (props) => {
  const openHours = props.openHours;
  return (
    <Card style={styles.timingCard}>
      <CardItem>
        <Body>
          <Text style={styles.timingTitle}>Hours:</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.lineHeight}>Monday:</Text>
            <Text style={styles.lineHeightMonday}>{openHours.monday}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.lineHeight}>Tuesday:</Text>
            <Text style={styles.lineHeightTuesday}>{openHours.tuesday}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.lineHeight}>Wednesday:</Text>
            <Text style={styles.lineHeightWednesday}>{openHours.wednesday}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.lineHeight}>Thursday:</Text>
            <Text style={styles.lineHeightThursday}>{openHours.thursday}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.lineHeight}>Friday:</Text>
            <Text style={styles.lineHeightFriday}>{openHours.friday}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.lineHeight}>Saturday:</Text>
            <Text style={styles.lineHeightSaturday}>{openHours.saturday}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.lineHeight}>Sunday:</Text>
            <Text style={styles.lineHeightSunday}>{openHours.sunday}</Text>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export default OrganizationDetailsTimeCard;

const styles = StyleSheet.create({
  timingCard: {
    shadowOpacity: spacing.none,
    marginTop: spacing.none,
    marginBottom: spacing.none,
  },
  timingTitle: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwBold,
    marginBottom: spacing.smaller,
  },
  lineHeight: {marginBottom: spacing.smaller, fontSize: typography.fs2},
  lineHeightMonday: {
    marginBottom: spacing.smaller,
    fontSize: typography.fs2,
    marginLeft: '20%',
  },
  lineHeightTuesday: {
    marginBottom: spacing.smaller,
    fontSize: typography.fs2,
    marginLeft: 69,
  },
  lineHeightWednesday: {
    marginBottom: spacing.smaller,
    fontSize: typography.fs2,
    marginLeft: 48,
  },

  lineHeightThursday: {
    marginBottom: spacing.smaller,
    fontSize: typography.fs2,
    marginLeft: 63,
  },

  lineHeightFriday: {
    marginBottom: spacing.smaller,
    fontSize: typography.fs2,
    marginLeft: 84,
  },

  lineHeightSaturday: {
    marginBottom: spacing.smaller,
    fontSize: typography.fs2,
    marginLeft: 66,
  },

  lineHeightSunday: {
    marginBottom: spacing.smaller,
    fontSize: typography.fs2,
    marginLeft: 76,
  },
});
