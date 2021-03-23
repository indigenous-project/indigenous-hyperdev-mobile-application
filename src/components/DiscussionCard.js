import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {colors, typography, spacing, themes} from '../styles';

import Chips from '../components/Chips';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//card to display Discussion
export default function EventCard(props) {
  return (
    <View style={styles.discussionCard}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text style={styles.cardDetail}>{props.nameAndDate}</Text>
      {props.categories
        ? props.categories.map((category) => (
          <Chips key={category._id} name={category.name} />
        ))
        : null}
      <Text style={styles.cardSubTitle}>{props.description}</Text>
      <View style={styles.actionContainer}>
        <Text>
          <MaterialCommunityIcons
            name="wechat"
            size={24}
            color={themes.light.primaryColor}
          />
          {` ${props.replies.length} Replies`}
        </Text>
        <Text>Save</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //Discussion Card styles
  discussionCard: {
    alignItems: 'flex-start',
    padding: spacing.base,
    backgroundColor: colors.white,
    marginBottom: spacing.small,
    borderRadius: spacing.small,
  },
  cardTitle: {
    fontSize: typography.fs3,
    color: colors.primary900,
    fontWeight: typography.fwBold,
    paddingBottom: spacing.smaller,
  },
  cardSubTitle: {
    fontSize: typography.fs2,
    lineHeight: typography.lh3,
    paddingBottom: spacing.smaller,
  },
  cardDetail: {
    fontWeight: typography.fwLight,
    paddingBottom: spacing.smaller,
  },

  //Actions styling (Replies and Save)
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: spacing.small,
  },
});
