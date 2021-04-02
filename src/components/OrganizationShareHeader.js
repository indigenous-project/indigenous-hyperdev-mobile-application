import React from 'react';
import {View, TouchableOpacity, Share, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {typography, themes} from '../styles';

const ShareHeader = ({shareData}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Know more about the ${shareData.name} ? Please click here.`,
        url:
          shareData.contact.website !== undefined
            ? `https://${shareData.contact.website}`
            : null,
      });
      if (result.action === Share.sharedAction) {
        Alert.alert('The orgainzation is shared');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
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
