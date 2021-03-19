//OrganizationScreen module

// import packages
import React from 'react';
import {Card, CardItem, Text, Body, Right} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {colors, spacing, themes} from '../styles';

const OrganizationsCard = (props) => {
  return (
    <Card style={styles.cardsView}>
      <CardItem cardBody style={styles.border}>
        <Image
          source={{
            uri: props.image,
          }}
          style={styles.cardImage}
        />
      </CardItem>
      <CardItem style={styles.border}>
        <Body>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.rating}>{props.rating}</Text>
          <Text style={styles.link}>{props.link}</Text>
        </Body>

        <Right>
          <Body style={styles.typeAndLocationPosition}>
            <Text style={styles.type}>{props.type}</Text>
            <Text style={styles.location}>{props.location}</Text>
          </Body>
        </Right>
      </CardItem>
    </Card>
  );
};

export default OrganizationsCard;

const styles = StyleSheet.create({
  //Card Style
  cardsView: {
    marginLeft: spacing.larger,
    marginRight: spacing.larger,
    marginBottom: spacing.smaller,
    borderRadius: spacing.small,
  },
  border: {borderRadius: 16},
  cardImage: {
    height: 100,
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  typeAndLocationPosition: {marginTop: 31},
  name: {
    width: 500,
    color: themes.light.primaryColor,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  rating: {alignSelf: 'flex-start', marginBottom: spacing.smaller},
  link: {alignSelf: 'flex-start'},
  location: {alignSelf: 'flex-end'},
  type: {
    color: colors.gray500,
    alignSelf: 'flex-end',
    marginBottom: spacing.smaller,
  },
});
