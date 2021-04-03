//OrganizationDetailTime module

//import packages
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { typography, spacing, themes, colors } from '../styles';
const OrganizationDetailsTimeCard = (props) => {
  const openHours = props.openHours !== undefined ? props.openHours : undefined;
  return (
    <View style={styles.timingCard}>
      <Text style={styles.timingTitle}>Hours:</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.lineHeight}>Monday:</Text>
        <Text style={styles.lineHeightMonday}>
          {openHours.monday !== undefined ? openHours.monday : ''}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.lineHeight}>Tuesday:</Text>
        <Text style={styles.lineHeightTuesday}>
          {openHours.tuesday !== undefined ? openHours.tuesday : ''}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.lineHeight}>Wednesday:</Text>
        <Text style={styles.lineHeightWednesday}>
          {openHours.wednesday !== undefined ? openHours.wednesday : ''}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.lineHeight}>Thursday:</Text>
        <Text style={styles.lineHeightThursday}>
          {openHours.thursday !== undefined ? openHours.thursday : ''}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.lineHeight}>Friday:</Text>
        <Text style={styles.lineHeightFriday}>
          {openHours.friday !== undefined ? openHours.friday : ''}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.lineHeight}>Saturday:</Text>
        <Text style={styles.lineHeightSaturday}>
          {openHours.saturday !== undefined ? openHours.saturday : ''}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.lineHeight}>Sunday:</Text>
        <Text style={styles.lineHeightSunday}>
          {openHours.sunday !== undefined ? openHours.sunday : ''}
        </Text>
      </View>
    </View>
  );
};

export default OrganizationDetailsTimeCard;

const styles = StyleSheet.create({
  timingCard: {
    shadowOpacity: spacing.none,
    marginBottom: spacing.small,
    backgroundColor: colors.white,
    padding: spacing.base
  },
  timingTitle: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwBold,
    marginBottom: spacing.smaller,
    fontSize: typography.fs3
  },
  lineHeight: { marginBottom: spacing.smaller, fontSize: typography.fs2 },
  lineHeightMonday: {
    marginBottom: spacing.smaller,
    fontSize: typography.fs2,
    marginLeft: 72,
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
