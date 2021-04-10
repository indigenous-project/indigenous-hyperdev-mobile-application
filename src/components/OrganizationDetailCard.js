//OrganizationDetailCard module

//import packages
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text, View} from 'native-base';
import {typography, spacing, themes, colors} from '../styles';
import {AirbnbRating} from 'react-native-ratings';
import {decodeHTML} from '../modules/decode.text';
import {WebView} from 'react-native-webview';

const OrganizationDetailCard = (props) => {
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

  //to get the image path of the organization
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

  return (
    <View style={styles.viewContainer}>
      {/* to display the image of the organization */}
      <Image
        source={
          imagePath !== undefined
            ? {uri: getImage(props.image)}
            : require('../asserts/demoPic.png')
        }
        style={styles.image}
        accessible
        accessibilityLabel="organization"
      />

      {/* to display the title of the organization */}
      <View style={styles.viewContent}>
        <Text style={styles.titleText}>
          {props.title !== undefined ? props.title : ' '}
        </Text>

        {/* to display the rating of the organization */}
        <View style={{alignSelf: 'flex-start', bottom: 25, right: 2}}>
          <AirbnbRating
            isDisabled={true}
            count={5}
            reviews={false}
            defaultRating={props.reviews ? getRating(props.reviews) : 0}
            size={15}
          />
        </View>

        {/* to display the description of the organization in WebView */}
        {props.decs ? (
          <WebView
            style={styles.desc}
            originWhitelist={['*']}
            source={{
              html: `<section style="font-size:40">${decodeHTML(
                props.decs,
              )}</section>`,
            }}
          />
        ) : null}

        {/* to display the address of the organization */}
        <View style={styles.addressView}>
          <Text style={styles.addressLabel}>Address:</Text>
          <Text style={styles.addressTextView}>
            {props.address !== undefined ? props.address : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrganizationDetailCard;

const styles = StyleSheet.create({
  //styling on detail view
  viewContainer: {
    backgroundColor: themes.light.inverseTextColor,
    marginBottom: spacing.hairline,
  },
  image: {
    height: 150,
  },
  viewContent: {
    padding: spacing.small,
  },
  titleText: {
    color: colors.primary900,
    fontWeight: typography.fwSemiBold,
  },
  ratingView: {
    alignSelf: 'flex-start',
    paddingBottom: spacing.small,
  },
  desc: {
    fontWeight: typography.fwMedium,
    marginTop: spacing.smallest,
    minHeight: 100,
  },
  addressView: {
    flexDirection: 'row',
    marginTop: spacing.smaller,
  },
  addressLabel: {fontSize: typography.fs2},
  addressTextView: {
    marginLeft: spacing.smaller,
    width: '40%',
    fontSize: typography.fs2,
  },
});
