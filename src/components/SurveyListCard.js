//SurveyList module

// import packages
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { spacing, colors, themes, typography } from '../styles';
import { Thumbnail } from 'native-base';

const SurveyListCard = props => {
  return (
    <View style={styles.cardsContainer}>
      <View style={styles.content}>
        <View style={styles.thumbnail}>
          <Thumbnail style={{ borderRadius: 10, }}
            square
            large
            source={require('../testImages/demoPic.png')}></Thumbnail>
        </View>

        <View style={{ width: 250, marginRight: 20 }}>
          <Text numberOfLines={2} style={styles.cardTitle}>{props.title}</Text>
          <Text style={styles.date}>
            {props.startDate} - {props.endDate}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SurveyListCard;

const styles = StyleSheet.create({
  //service card style
  cardsContainer: {
    borderRadius: spacing.small,
    shadowColor: colors.shadowcolor,
    backgroundColor: colors.white,
    padding: spacing.small,
    marginTop: spacing.base,
    marginHorizontal: spacing.base,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  thumbnail: {
    marginRight: 10,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: typography.fwMedium,
    fontSize: typography.fs3,
    lineHeight: typography.lh3
  },
  date: {
    marginVertical: spacing.smaller,
    color: colors.gray600,
  },
});
