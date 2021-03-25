import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {colors, typography, spacing} from '../styles';

//card to display upcoming events
export default function UpdateCard(props) {
  const NUM_OF_LINES = 3;
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  return (
    <View style={styles.updateCard}>
      <Text style={styles.updateTitle}>{props.title}</Text>
      <Text
        numberOfLines={textShown ? undefined : NUM_OF_LINES}
        style={styles.updateDescription}>
        {props.description}
      </Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => toggleNumberOfLines()}>
        <Text style={styles.buttonText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  //styling for latest update
  updateCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.small,
  },
  updateTitle: {
    textAlign: 'center',
    color: 'red',
    textTransform: 'uppercase',
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    paddingTop: spacing.small,
    lineHeight: 30,
  },
  updateDescription: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    padding: spacing.small,
  },
  //button styling
  buttonContainer: {
    width: '50%',
    marginBottom: spacing.small,
    backgroundColor: colors.primary400,
    borderRadius: spacing.small,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonText: {
    fontSize: typography.fs2,
    color: colors.white,
    alignSelf: 'center',
    fontWeight: typography.fwBold,
  },
});
