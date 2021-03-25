//Circles module

// import packages
import {Container, View} from 'native-base';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {spacing, colors, themes} from '../styles';
const Circles = (props) => {
  return (
    <Container style={styles.circleTextContainer}>
      <View style={styles.circle} />
      <Text>{props.categoryName}</Text>
    </Container>
  );
};

export default Circles;

const styles = StyleSheet.create({
  circleTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    height: 150,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 100 / 2,
    backgroundColor: themes.light.bodyBackgroundColor,
    shadowColor: colors.shadowcolor,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 10,
  },
});
