//Create Discussion module

// import packages
import React, {useEffect, useState} from 'react';

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  Image,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {colors, themes, typography, spacing} from '../styles';
import {discussionAdd} from '../api/discussions/discussions.api';
import {useCurrentUser} from '../contexts/currentUserContext';
import Loader from './Loader';
import MessageModal from './MessageModal';
import s3Storage from '../api/aws/s3Strorage';

//function return
function CreateDiscussion(props) {
  const theme = themes.light;
  //const [token, setToken] = useSecureStorage('userToken', '');
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [discussionDescription, setDiscussionDescription] = useState('');
  const [category, setCategory] = useState('');
  const [currentUser, token] = useCurrentUser();
  const [discussions, setDiscussions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showing, setShowing] = useState(false);
  const [imageUri, setImageUri] = useState('');

  // function handle when user tap Post discsussion button
  const handlePostDiscussion = () => {
    // prevent empty input
    !discussionTitle
      ? Alert.alert('Create New Discussion', 'Please fill the topic')
      : !discussionDescription
      ? Alert.alert('Create New Discussion', 'Please fill the description')
      : null;

    // get data body
    const data = {
      title: discussionTitle,
      description: discussionDescription,
    };

    setLoading(true);
    discussionAdd(token, data)
      .then((response) => {
        setLoading(false);
        setShowing(true);
        setTimeout(() => {
          props.posted(false);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  };

  //getCameraRoll

  const getPicturesFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 640,
        maxHeight: 480,
        quality: 0.8,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log(response);
          setImageUri(response.base64);
          s3Storage(response.base64);
        }
      },
    );
  };

  return (
    <View style={styles.baseModal}>
      <Loader loading={loading} />
      <MessageModal showing={showing} message="Discussion Posted" />
      {/* <Image
        style={{height: 100}}
        source={
          1
            ? {
                uri:
                  'https://indigenous-images.s3.amazonaws.com/abbuseIcon.png',
              }
            : require('../testImages/demoPic.png')
        }
      /> */}
      <ScrollView>
        <View>
          <View style={styles.discussionTopic}>
            <Text style={styles.cardTitle}>Discussion Topic</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Give Your post a name"
              value={discussionTitle}
              onChangeText={setDiscussionTitle}
            />
          </View>
          <View style={styles.discussionDescription}>
            <Text style={styles.cardTitle}>Description</Text>
            <TextInput
              style={styles.descriptionInput}
              multiline={true}
              placeholder="Type the Post body here"
              value={discussionDescription}
              onChangeText={setDiscussionDescription}
            />
            <TouchableHighlight
              style={styles.imageButton}
              onPress={() => getPicturesFromGallery()}>
              <Text style={styles.imageButtonText}>Attach Picture</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.discussionCategory}>
            <Text style={styles.cardTitle}>Category (Optional)</Text>
            <TextInput
              style={styles.categoryDopdown}
              placeholder="None Selected"
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsGroup}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handlePostDiscussion()}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CreateDiscussion;

const styles = StyleSheet.create({
  baseModal: {
    height: 700,
    paddingTop: spacing.small,
  },

  //styling for discussion Topic container
  discussionTopic: {
    height: '18%',
    alignItems: 'flex-start',
    padding: spacing.base,
    backgroundColor: colors.white,
    marginBottom: spacing.small,
  },

  cardTitle: {
    fontSize: typography.fs3,
    color: colors.primary900,
    fontWeight: typography.fwBold,
    paddingBottom: spacing.smaller,
  },
  titleInput: {
    borderBottomColor: colors.gray900,
    borderBottomWidth: 0.2,
    width: '100%',
    height: 40,
    paddingHorizontal: spacing.hairline,
  },

  //styling for discussion Description container
  discussionDescription: {
    height: '60%',
    alignItems: 'flex-start',
    padding: spacing.base,
    backgroundColor: colors.white,
    marginBottom: spacing.small,
  },
  descriptionInput: {
    width: '100%',
    height: 280,
    paddingHorizontal: spacing.hairline,
    lineHeight: typography.lh4,
  },

  //styling for choosing categories container
  discussionCategory: {
    height: '18%',
    alignItems: 'flex-start',
    padding: spacing.base,
    backgroundColor: colors.white,
    marginBottom: spacing.small,
  },
  categoryDopdown: {
    borderColor: colors.gray900,
    borderWidth: 0.2,
    width: '100%',
    height: 40,
    marginTop: spacing.smallest,
    padding: spacing.small,
    borderRadius: 5,
  },

  //styling for bottom buttons group
  buttonsGroup: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  buttonContainer: {
    width: '40%',
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.primary500,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },

  imageButton: {
    width: '40%',
    borderRadius: 10,
    marginBottom: spacing.small,
    alignSelf: 'flex-end',
    backgroundColor: colors.primary50,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  imageButtonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.primary900,
    fontWeight: typography.fwNormal,
  },
});
