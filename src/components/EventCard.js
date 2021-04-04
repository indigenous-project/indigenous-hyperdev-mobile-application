import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles';

//card to display upcoming events
export default function EventCard(props) {
  return (
    <View style={styles.eventCard}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <Text numberOfLines={1} style={styles.cardTitle}>{props.name}</Text>
      <Text style={styles.cardSubTitle}>{props.date}</Text>
      <Text style={styles.cardDetail}>{props.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  //styling for upcoming event
  eventCard: {
    width: 200,
    margin: spacing.small,
    backgroundColor: colors.white,
    shadowOffset: { width: 3, height: 6 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
  },
  cardTitle: {
    fontWeight: typography.fwBold,
    paddingBottom: spacing.smaller,
    paddingHorizontal: spacing.smaller,

  },
  cardSubTitle: {
    fontWeight: typography.fwMedium,
    paddingBottom: spacing.smaller,
    paddingLeft: spacing.smaller,
  },
  cardDetail: {
    fontWeight: typography.fwLight,
    paddingBottom: spacing.smaller,
    paddingLeft: spacing.smaller,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: spacing.small,
    borderTopRightRadius: spacing.small,
    marginBottom: spacing.small,
  },
});
