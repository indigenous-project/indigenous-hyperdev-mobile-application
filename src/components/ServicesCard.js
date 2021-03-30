//ServiceCard module

// import packages
import { Card, CardItem, Body, Right } from 'native-base';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, colors, themes, typography } from '../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ServicesCard = (props) => {
  return (
    <Card style={styles.cardsContainer}>
      <CardItem style={styles.cardBorder}>
        <Body>
          <Text style={styles.cardTitle}>{props.title}</Text>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.cardText}>-{props.description}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default ServicesCard;

const styles = StyleSheet.create({
  //service card style
  cardsContainer: {
    borderRadius: spacing.small,
    shadowColor: colors.shadowcolor,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardBorder: {
    borderRadius: spacing.small,
  },
  cardTitle: {
    fontWeight: typography.fwBold,
  },
  name: {
    marginVertical: spacing.smaller,
    color: colors.gray600
  },
  saveIcon: {
    marginBottom: '30%'
  }
});
