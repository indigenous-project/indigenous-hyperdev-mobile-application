//ServiceCard module

// import packages
import {Card, CardItem, Body} from 'native-base';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {spacing, colors, themes} from '../styles';

const ServicesCard = (props) => {
  return (
    <Card style={styles.cardsContainer}>
      <CardItem style={styles.cardBorder}>
        <Body>
          <Text style={styles.cardText}>{props.title}</Text>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.cardText}>-{props.description}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default ServicesCard;

const styles = StyleSheet.create({
  //last opened style
  cardsContainer: {
    borderRadius: spacing.small,
    shadowColor: colors.shadowcolor,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginLeft: spacing.large,
    marginRight: spacing.large,
    marginTop: spacing.base,
  },
  cardBorder: {
    borderRadius: spacing.small,
  },
  cardText: {marginTop: spacing.smaller, marginLeft: spacing.smallest},
  name: {
    marginTop: spacing.smaller,
    marginLeft: spacing.smallest,
    color: themes.light.subduedTextColor,
  },
});
