//OrganizationDetailCard module

//import packages
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Card, CardItem, Text, Body, View} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, typography, spacing, themes} from '../styles';

const OrganizationDetailCard = (props) => {
  return (
    <Card style={styles.card}>
      <CardItem cardBody>
        <Image
          source={{
            uri: props.image,
          }}
          style={styles.image}
        />
      </CardItem>
      <CardItem>
        <Body>
          <Text style={styles.titleText}>{props.title}</Text>
          <Text style={styles.lineHeight}>
            {props.rating}
            <MaterialCommunityIcons
              style={styles.icon}
              name="star"
              size={typography.fs4}
              color={colors.ratingColor}
            />
          </Text>
          <Text style={styles.lineHeight}>{props.decs}</Text>
          <View style={styles.addressView}>
            <Text>Address:</Text>
            <Text style={styles.addressTextView}>{props.address}</Text>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export default OrganizationDetailCard;

const styles = StyleSheet.create({
  card: {shadowOpacity: spacing.none, marginBottom: spacing.none},
  image: {height: 150, width: null, flex: spacing.hairline},
  titleText: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwSemiBold,
    marginBottom: spacing.smallest,
  },
  lineHeight: {paddingBottom: spacing.smallest},
  addressView: {flexDirection: 'row'},
  addressTextView: {marginLeft: spacing.smaller, width: '50%'},
});
