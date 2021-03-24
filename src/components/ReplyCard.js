import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, typography, spacing} from '../styles';
import Chips from '../components/Chips';

//card to display Discussion
export default function ReplyCard(props) {
  return (
    <View style={styles.replyCard}>
      <Text style={styles.replier}>{props.name}</Text>
      <Text style={styles.description}>{props.reply}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  //Reply Card styles
  description: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
  },
  replyCard: {
    borderRadius: 10,
    marginVertical: spacing.smaller,
    padding: spacing.smaller,
    backgroundColor: colors.white,
    shadowColor: colors.gray900,
    shadowOffset: {width: 3, height: 6},
    shadowOpacity: 0.2,
    width: '100%',
  },
  replier: {
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    marginVertical: spacing.smallest,
  },
});
