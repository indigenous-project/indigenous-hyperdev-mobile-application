//OrganizationShareHeader module

//import packages
import React from 'react';
import {View, TouchableOpacity, Share, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {typography, themes} from '../styles';

const ShareHeader = ({shareData}) => {

  //function to share content to the reciver when the user clicks on the share button
  const onShare = async () => {
    try {
      const result = await Share.share({
        // to add message to the sharing content
        message: `Know more about the ${shareData.name} ? Please click here.`,
        // to add url to the sharing content
        url:
          shareData.contact.website !== undefined
            ? shareData.contact.website
            : null,
      });
      // alert the user if the sharing was sucessfull
      if (result.action === Share.sharedAction) {
        Alert.alert('The orgainzation is shared');
      }
    } catch (error) { //catch the error and alert the user if sharing was unsuccessfull
      Alert.alert(error.message);
    }
  };

  return (
    // display the share icon button in the header
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onShare}>
        <MaterialCommunityIcons
          name="export-variant"
          size={typography.fs7}
          color={themes.light.primaryColor}
          style={{marginRight: 10}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ShareHeader;
