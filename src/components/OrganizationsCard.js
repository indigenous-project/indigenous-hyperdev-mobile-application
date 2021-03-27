//OrganizationScreen module

// import packages
import React, {useEffect, useState} from 'react';
import {Card, CardItem, Text, Body, Right, View} from 'native-base';
import {Image, Linking, StyleSheet} from 'react-native';
import {colors, spacing, themes, typography} from '../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Hyperlink from 'react-native-hyperlink';
import {Rating} from 'react-native-ratings';

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

    // if (path) {
    return path;
    // } else {
    //   return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzkC9ryyokGzGyy-3DVWDqDJT8tu6k1M5vGuVh9vBj5hrTXV_AecRw8XRlulrf_UZBAIs&usqp=CAU';
    // }
  }

  //function handle when user tap on link that navigate to google map with keyword search location near my location
  const handleGoLink = () => {
    Linking.openURL(
      `https://maps.google.com/?q=${props.location.split(',')[0].trim()}`,
    );
  };

  console.log(imagePath);
  return (
    <Card style={styles.cardsView}>
      <CardItem cardBody style={styles.border}>
        <Image
          source={
            imagePath !== undefined
              ? {uri: getImage(props.image)}
              : require('../testImages/noImageAvailable.jpeg')
          }
          style={styles.cardImage}
        />
      </CardItem>
      <CardItem style={styles.border}>
        <Body>
          <Text style={styles.name}>
            {props.name !== undefined ? props.name : ''}
          </Text>
          <Rating
            readonly
            style={styles.rating}
            imageSize={typography.fs2}
            fractions={1}
            startingValue={getRating(props.reviews)}
          />
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons
              name="earth"
              size={22}
              style={styles.earthIcon}
              color={themes.light.subduedTextColor}
            />
            <Hyperlink
              linkDefault={true}
              linkStyle={{textDecorationLine: 'underline'}}>
              <Text style={styles.website}>
                {props.website !== undefined ? props.website.split('www.') : ''}
              </Text>
            </Hyperlink>
          </View>
        </Body>

        <Right>
          <Body
            style={[
              props.isIndigenous == true
                ? styles.typeAndLocationPositionWithIcon
                : styles.typeAndLocationPosition,
            ]}>
            {props.isIndigenous == true ? (
              <Image
                style={styles.isIndigenousIcon}
                source={require('../testImages/indigenousIcon.png')}
              />
            ) : null}

            <Text
              style={[
                props.isIndigenous == true
                  ? styles.typeWithisIndigenousIcon
                  : styles.type,
              ]}>
              {props.type}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="map-marker"
                size={22}
                style={styles.markerIcon}
                color={themes.light.subduedTextColor}
              />
              <Text style={styles.location} onPress={handleGoLink}>
                {props.location !== undefined
                  ? props.location.split(',')[0].trim()
                  : ''}
              </Text>
            </View>
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
  typeAndLocationPosition: {marginTop: 18},
  typeAndLocationPositionWithIcon: {marginTop: 0},
  name: {
    width: 500,
    color: themes.light.primaryColor,
    fontWeight: typography.fwMedium,
    marginBottom: spacing.smallest,
  },
  rating: {alignSelf: 'flex-start', marginBottom: spacing.small},
  markerIcon: {color: colors.primary900, marginRight: 5},
  earthIcon: {color: colors.primary900, marginRight: 5, bottom: 4},
  website: {fontSize: typography.fs2},
  location: {
    alignSelf: 'flex-end',
    fontSize: typography.fs2,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  type: {
    color: colors.gray500,
    alignSelf: 'flex-end',
    marginBottom: 5,
    fontSize: typography.fs2,
    marginTop: 5,
  },
  typeWithisIndigenousIcon: {
    color: colors.gray500,
    alignSelf: 'flex-end',
    marginBottom: 5,
    fontSize: typography.fs2,
    marginTop: 5,
    marginRight: 5,
  },
  isIndigenousIcon: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
});
