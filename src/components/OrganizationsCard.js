//OrganizationScreen module

// import packages
import React from 'react';
import {Card, CardItem, Text, Body, Right, Button} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {colors, spacing, themes, typography} from '../styles';

const OrganizationsCard = (props) => {

  let imagePath = getImage(props.image);
  //to get the ratings from the review
  function getRating(reviews) {
    let totalReviews = 0;
    //loop through the reviews
    reviews.forEach((rev) => {
      //add all the reviews of an organization
      totalReviews += rev.score;
    });

    // condition whether there is reviews
    if (reviews.length) {
      //divide the total reviews by length of the array
      totalReviews = totalReviews / reviews.length;
    }
    return totalReviews;
  }

  //to get the image of organization
  function getImage(image) {
    let path;
    //loop through the image array
    image.forEach((img) => {
      //get the path of the image
      path = img.path;
    });

    return path;
  }

  //function handle when user tap on link that navigate to google map with keyword search location near my location
  const handleGoLink = () => {
    Linking.openURL(
      `https://maps.google.com/?q=${props.location.split(',')[0].trim()}`,
    );
  };

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
  border: {borderRadius: typography.fs3},
  cardImage: {
    height: 100,
    flex: spacing.hairline,
    borderTopLeftRadius: typography.fs3,
    borderTopRightRadius: typography.fs3,
  },
  typeAndLocationPosition: {marginTop: 31},
  name: {
    width: 500,
    color: themes.light.primaryColor,
    fontWeight: typography.fwMedium,
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
