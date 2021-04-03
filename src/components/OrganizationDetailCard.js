//OrganizationDetailCard module

//import packages
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text, View} from 'native-base';
import {typography, spacing, themes} from '../styles';
import {Rating} from 'react-native-ratings';
import {decodeHTML} from '../modules/decode.text';
import {WebView} from 'react-native-webview';

const OrganizationDetailCard = props => {
  let imagePath = props.image ? getImage(props.image) : undefined;
  //to get the ratings from the review
  function getRating(reviews) {
    let totalReviews = 0;
    //loop through the reviews
    reviews.forEach(rev => {
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
    image.forEach(img => {
      //get the path of the image
      path = img.path;
    });

    return path;
  }

  return (
    <View style={{backgroundColor: themes.light.inverseTextColor}}>
      <Image
        source={
          imagePath !== undefined
            ? {uri: getImage(props.image)}
            : require('../testImages/demoPic.png')
        }
        style={styles.image}
      />
      <View style={{padding: spacing.small}}>
        <Text style={styles.titleText}>
          {props.title !== undefined ? props.title : ' '}
        </Text>

        <Rating
          readonly ={true}
          style={styles.rating}
          imageSize={typography.fs2}
          fractions={3}
          startingValue={
            props.reviews == undefined ? 0 : getRating(props.reviews)
          }
        />
          <WebView
            style={styles.desc}
            originWhitelist={['*']}
            source={{
              html: `<section style="font-size:40">${decodeHTML(
                props.decs,
              )}</section>`,
            }}
          />
      </View>

      <View style={styles.addressView}>
        <Text style={styles.addressLabel}>Address:</Text>
        <Text style={styles.addressTextView}>
          {props.address !== undefined ? props.address : ''}
        </Text>
      </View>
    </View>
  );
};

export default OrganizationDetailCard;

const styles = StyleSheet.create({
  view: {
    shadowOpacity: spacing.none,
    marginBottom: spacing.none,
    paddingLeft: spacing.small,
  },
  image: {height: 150, width: null, flex: spacing.hairline},
  titleText: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwSemiBold,
    marginBottom: spacing.smallest,
  },
  rating: {alignSelf: 'flex-start'},
  desc: {
    fontWeight: typography.fwMedium,
    paddingBottom: spacing.smallest,
    marginTop: spacing.smallest,
    width: 300,
    lineHeight: typography.lh3,
    fontSize: typography.fs3,
    height: 100,
  },
  addressView: {
    flexDirection: 'row',
    padding: spacing.base,
  },
  addressLabel: {fontSize: typography.fs2},
  addressTextView: {
    marginLeft: spacing.smaller,
    width: '50%',
    fontSize: typography.fs2,
  },
});
