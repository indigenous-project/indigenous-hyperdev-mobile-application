//OrganizationDetailTime module

//import packages
import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Text, Body} from 'native-base';
import {typography, spacing, themes} from '../styles';
const OrganizationDetailsTimeCard = () => {
  return (
    <Card style={styles.timingCard}>
      <CardItem>
        <Body>
          <Text style={styles.timingTitle}>Hours:</Text>
          <Text style={styles.lineHeight}>Monday:</Text>
          <Text style={styles.lineHeight}>Tuesday:</Text>
          <Text style={styles.lineHeight}>Wednesday:</Text>
          <Text style={styles.lineHeight}>Thursday:</Text>
          <Text style={styles.lineHeight}>Friday:</Text>
          <Text style={styles.lineHeight}>Saturday:</Text>
          <Text style={styles.lineHeight}>Sunday:</Text>
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
});
