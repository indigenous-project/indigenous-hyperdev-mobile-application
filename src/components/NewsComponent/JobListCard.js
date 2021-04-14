//JobList module

// import packages
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { spacing, colors, typography } from '../../styles';
import { none } from '../../styles/spacing';

//card to display Job List
const JobListCard = props => {
  // Render element
  return (
    <View style={styles.cardsContainer}>
      <Text numberOfLines={1} style={styles.cardTitle}>{props.title}</Text>
      <Text numberOfLines={1} style={styles.cardSubTitle}>{props.posting}</Text>
      <Text numberOfLines={1} style={styles.cardDetail}>{props.type}</Text>
      <Text numberOfLines={1} style={styles.cardSubTitle}>{props.salary}</Text>
    </View>
  );
};

export default JobListCard;

// Stylesheet for JobListCard
const styles = StyleSheet.create({
  //service card style
  cardsContainer: {
    borderRadius: spacing.small,
    shadowColor: colors.shadowcolor,
    backgroundColor: colors.white,
    padding: spacing.base,
    margin: spacing.base,
    marginBottom: none,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardTitle: {
    fontWeight: typography.fwBold,
    paddingBottom: spacing.small,
    color: colors.primary900,
    fontSize: typography.fs4,
  },
  cardSubTitle: {
    fontSize: typography.fs3,
  },
  cardDetail: {
    fontWeight: typography.fwLight,
    paddingVertical: spacing.small,
    fontSize: typography.fs3,
  },
});
