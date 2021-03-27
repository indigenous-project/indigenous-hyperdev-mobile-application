import React from 'react';
import {View, TouchableOpacity, Share, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {typography} from '../styles';

const ShareHeader = ({shareData}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Join the event ${shareData.title}.\nDate: ${shareData.date}`,
        url: shareData.medias[0].path,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('User dismissed the share');
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
          color="white"
          style={{marginRight: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ShareHeader;
