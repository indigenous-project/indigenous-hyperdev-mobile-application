// JobShareHeader Component

// Import Packages
import React from 'react';
import { View, TouchableOpacity, Share, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { typography, themes } from '../../styles';

//card to display JobShareHeader

// Method region
const ShareHeader = ({ shareData }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${shareData.title}.\nPost: ${shareData.subTitle}.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('User dismissed the share');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  // End method region

  // Render element
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={onShare}>
        <MaterialCommunityIcons
          name="export-variant"
          size={typography.fs7}
          color={themes.light.primaryColor}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ShareHeader;
