//OrganizationScreen module

// import packages
import React from 'react';
import { Card, CardItem, Text, Body, Right, View } from 'native-base';
import { Image, Linking, StyleSheet } from 'react-native';
import { colors, spacing, themes, typography } from '../../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Hyperlink from 'react-native-hyperlink';
import { AirbnbRating } from 'react-native-ratings';

function OrganizationsCard(props) {
  //to call the function and store the return value using condition
  let imagePath = props.image ? getImage(props.image) : undefined;

  //to get the ratings from the review
  function getRating(reviews) {
    let totalReviews = 0;
    //loop through the reviews
    reviews.forEach((rev) => {
      //add all the reviews of an organization
      totalReviews += rev.score;
    });

    // if length of the review exist, add the all the review and divide by
    // the length of the review array
    if (reviews.length) {
      //divide the total reviews by length of the array
      totalReviews = totalReviews / reviews.length;
    }
    //return the review
    return totalReviews;
  }

  //to get the image path of organization
  function getImage(image) {
    let path;
    //loop through the image array
    image.forEach((img) => {
      //get the path of the image
      path = img.path;
    });
    //return the path of the image
    return path;
  }

  //function handle when user tap on link that navigate to google map with keyword search location near my location
  function handleGoLink() {
    props.location !== undefined
      ? Linking.openURL(
        `https://maps.google.com/?q=${props.location.split(',')[0].trim()}`,
      )
      : null;
  }
  return (
    //to display the organizatons
    <Card style={styles.cardsView}>
      <CardItem cardBody style={styles.border}>
        {/* image */}
        <Image
          source={
            imagePath !== undefined
              ? { uri: getImage(props.image) }
              : require('../../asserts/demoPic.png')
          }
          style={styles.cardImage}
          accessible
          accessibilityLabel="organization"
        />
      </CardItem>

      <CardItem style={styles.border}>
        <Body>
          {/* title */}
          <Text numberOfLines={1} style={styles.name}>
            {props.name !== undefined ? props.name : ''}
          </Text>

          {/* to display the rating of the organization */}
          <View
            style={[
              props.isIndigenous == true
                ? styles.ratingViewWithIcon
                : styles.ratingView,
            ]}>
            <AirbnbRating
              isDisabled={true}
              count={5}
              reviews={false}
              defaultRating={props.reviews ? getRating(props.reviews) : 0}
              size={15}
            />
          </View>

          {/* to display the website of the organization */}
          <View style={{ flexDirection: 'row', maxWidth: '70%' }}>
            <MaterialCommunityIcons
              name="earth"
              size={22}
              style={styles.earthIcon}
              color={themes.light.subduedTextColor}
            />
            <Hyperlink
              linkDefault={true}
              linkStyle={{ textDecorationLine: 'underline' }}>
              <Text numberOfLines={1} style={styles.website}>
                {props.website !== undefined
                  ? props.website.split('https://www.')
                  : ''}
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
            {/* to display the isIndigenous icon if the organization is an indigenous */}
            {props.isIndigenous == true ? (
              <Image
                style={styles.isIndigenousIcon}
                source={require('../../asserts/indigenousIcon.png')}
              />
            ) : null}
            {/* to display the category of orgainzation */}
            <Text
              style={[
                props.isIndigenous == true
                  ? styles.typeWithisIndigenousIcon
                  : styles.type,
              ]}>
              {props.type !== undefined ? props.type : null}
            </Text>

            {/* to display the location of orgainzation */}
            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
              <MaterialCommunityIcons
                name="map-marker"
                size={22}
                style={styles.markerIcon}
                color={themes.light.subduedTextColor}
              />
              <Text
                numberOfLines={1}
                style={styles.location}
                onPress={handleGoLink}>
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
}

export default OrganizationsCard;

const styles = StyleSheet.create({
  //Card Style
  cardsView: {
    marginBottom: spacing.small,
    borderRadius: spacing.small,
  },
  border: { borderRadius: typography.fs3 },
  cardImage: {
    height: 100,
    flex: spacing.hairline,
    borderTopLeftRadius: typography.fs3,
    borderTopRightRadius: typography.fs3,
  },
  typeAndLocationPosition: { marginTop: 18 },
  typeAndLocationPositionWithIcon: { marginTop: 0 },
  name: {
    width: '150%',
    color: themes.light.primaryColor,
    fontWeight: typography.fwMedium,
    marginBottom: spacing.smallest,
  },
  ratingView: { alignSelf: 'flex-start', bottom: 24, right: 2, height: 26 },
  ratingViewWithIcon: {
    alignSelf: 'flex-start',
    bottom: 24,
    right: 2,
    height: 29,
  },
  markerIcon: { color: colors.primary900, marginRight: 5 },
  earthIcon: { color: colors.primary900, marginRight: 5, bottom: 4 },
  website: { fontSize: typography.fs2 },
  location: {
    alignSelf: 'flex-end',
    fontSize: typography.fs2,
    paddingRight: 25,
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
