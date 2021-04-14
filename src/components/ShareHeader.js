import React from 'react';
import { View, TouchableOpacity, Share, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { eventShare } from '../api/events/events.api';
import { useCurrentUser } from '../contexts/currentUserContext';
import { formatDate, formatDateByTime } from '../modules/date.format';
import { typography, themes } from '../styles';

const ShareHeader = ({ shareData }) => {
  const [currentUser, token] = useCurrentUser();
  const shareCountHandle = () => {
    eventShare(token, shareData._id)
      .then((response) => {
        if (response) Alert.alert('The event is shared');
      })
      .catch((err) => console.log(err));
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Join the event ${shareData.title}.\nDate: ${formatDate(
          shareData.date,
        )}.\nTime: ${formatDateByTime(shareData.startTime)}.\nLocation: ${shareData.location
          }`,
        url: shareData.medias[0].path,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log(result.activityType);
          // shared with activity type of result.activityType
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
