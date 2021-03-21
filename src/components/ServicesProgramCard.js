import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {themes, spacing, colors, typography} from '../styles';
import {Container, Card, CardItem, Body, View} from 'native-base';


const ServicesProgramCard = (props) => {
  return (
    <View>
      <Container style={styles.textCardContainer}>
        <Text style={styles.lastOpened}>{props.category}</Text>
        <Card style={styles.cardsContainer}>
          <CardItem style={styles.cardBorder}>
            <Body>
              <Text style={styles.cardText}>{props.title}</Text>
              <Text style={styles.cardText}>{props.name}</Text>
              <Text style={styles.cardText}>{props.description}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={styles.cardsContainer}>
          <CardItem style={styles.cardBorder}>
            <Body>
              <Text style={styles.cardText}>{props.title}</Text>
              <Text style={styles.cardText}>{props.name}</Text>
              <Text style={styles.cardText}>{props.description}</Text>
            </Body>
          </CardItem>
        </Card>
      </Container>
    </View>
  );
};

export default ServicesProgramCard;

const styles = StyleSheet.create({
    textCardContainer: {height: 280},
  lastOpened: {
    color: colors.primary900,
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    marginTop: spacing.small,
    marginLeft: spacing.large,
  },
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
});
