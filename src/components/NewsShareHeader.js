// NewsShareHeader Component

// Import Packages
import React from 'react';
import {View, TouchableOpacity, Share, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCurrentUser} from '../contexts/currentUserContext';
import {formatDate, formatDateByTime} from '../modules/date.format';
import {typography, themes} from '../styles';
import {postShare} from '../api/news/news.api';

//card to display JobShareHeader

// Method region
const ShareHeader = ({shareData}) => {
  const [currentUser, token] = useCurrentUser();
  const shareCountHandle = () => {
    postShare(token, shareData._id)
      .then(response => {
        console.log(response);
        if (response) Alert.alert('The news is shared');
      })
      .catch(err => console.log(err));
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${shareData.title}.\nDate: ${formatDate(
          shareData.lastModifiedDate,
        )}.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          shareCountHandle();
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
