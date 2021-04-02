//JobList module

// import packages
import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {spacing, colors, themes, typography} from '../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Thumbnail} from 'native-base';

const JobListCard = props => {
  return (
    <View style={styles.cardsContainer}>
      <View style={styles.content}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <Text style={styles.cardSubTitle}>{props.posting}</Text>
        <Text style={styles.cardDetail}>{props.type}</Text>
        <Text style={styles.cardSubTitle}>{props.salary}</Text>
      </View>
    </View>
  );
};

export default JobListCard;

const styles = StyleSheet.create({
  //service card style
  cardsContainer: {
    borderRadius: spacing.small,
    shadowColor: colors.shadowcolor,
    backgroundColor: colors.white,
    padding: spacing.base,
    marginVertical: spacing.small,
    marginHorizontal: spacing.base,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  content: {
   
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: typography.fwBold,
    paddingBottom: spacing.smallest,
    color: colors.primary900,
    fontSize: typography.fs4,
  },
  cardSubTitle: {
    fontWeight: typography.fwMedium,
    paddingBottom: spacing.smallest,
    fontSize: typography.fs3,
  },
  cardDetail: {
    fontWeight: typography.fwLight,
    paddingBottom: spacing.smallest,
    fontSize: typography.fs3,
  },
});
