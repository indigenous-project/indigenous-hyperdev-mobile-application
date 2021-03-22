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
  Keyboard,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {colors, themes, typography, spacing} from '../styles';
import {discussionAdd} from '../api/discussions/discussions.api';
import {useCurrentUser} from '../contexts/currentUserContext';
import Loader from './Loader';
import MessageModal from './MessageModal';
import {s3Storage} from '../api/aws/s3Strorage';
import {Chip} from 'react-native-paper';
import {mediaAddImage} from '../api/medias/media.api';

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
  const [imageInfo, setImageInfo] = useState(null);

  // function handle when user tap Post discsussion button
  const handlePostDiscussion = () => {
    // prevent empty input
    !discussionTitle
      ? Alert.alert('Create New Discussion', 'Please fill the topic')
      : !discussionDescription
      ? Alert.alert('Create New Discussion', 'Please fill the description')
      : null;

    setLoading(true); // enable loader

    if (imageInfo) {
      s3Storage(imageInfo.base64) // store image in S3 aws: base64
        .then((response) => {
          // return a imageData object
          return {
            path: response.Location,
            extension: `.${imageInfo.type.substring(
              imageInfo.type.indexOf('/') + 1,
              imageInfo.type.length,
            )}`,
            type: `${imageInfo.type.substring(0, imageInfo.type.indexOf('/'))}`,
          };
        })
        .then((imageData) => mediaAddImage(token, imageData)) // add media: image in database
        .then((media) => {
          return {
            // return discussion data object
            title: discussionTitle.trim(),
            description: discussionDescription.trim(),
            medias: [media._id],
          };
        })
        .then((discussionData) => {
          discussionAdd(token, discussionData); // add a discussion in database
        })
        .then((response) => {
          setLoading(false); // hide loader
          setShowing(true); // show Message
          setTimeout(() => {
            props.posted(false); // hide modal
          }, 1500);
        })
        .catch((err) => {
          setLoading(false); // hide loader
          console.log(err);
          Alert.alert(err.errors[0].title, err.errors[0].description);
        });
    } else {
      const discussionObject = {
        title: discussionTitle.trim(),
        description: discussionDescription.trim(),
      };
      discussionAdd(token, discussionObject)
        .then((response) => {
          setLoading(false); // hide loader
          setShowing(true); // show Message
          setTimeout(() => {
            props.posted(false); // hide modal
          }, 1500);
        })
        .catch((err) => {
          setLoading(false); // hide loader
          console.log(err);
          Alert.alert(err.errors[0].title, err.errors[0].description);
        });
    }
  };

  // function access to Photo Library

  const getPicturesFromGallery = () => {
    // set initial configuration
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
          // handle if user cancel library
          console.log('User cancelled image picker');
        } else if (response.error) {
          // handle if user get error library
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          //handle if user tap any buttons
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // handle if use pick an image successfully
          setImageInfo(response);
        }
      },
    );
  };

  return (
    <View style={styles.baseModal}>
      <Loader loading={loading} />
      <MessageModal showing={showing} message="Discussion Posted" />
      <ScrollView>
        <View>
          <View style={styles.discussionTopic}>
            <Text style={styles.cardTitle}>Discussion Topic</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Give Your post a name"
              value={discussionTitle}
              onChangeText={setDiscussionTitle}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
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
              blurOnSubmit={false}
            />
            <TouchableHighlight
              style={styles.imageButton}
              onPress={() => getPicturesFromGallery()}>
              <Text style={styles.imageButtonText}>Attach Picture</Text>
            </TouchableHighlight>
            {imageInfo ? (
              <Chip
                style={styles.attachmentChip}
                mode="flat"
                icon="image-multiple-outline"
                closeIconAccessibilityLabel="Close"
                onClose={() => setImageInfo(null)}>
                <Text
                  numberOfLines={1}
                  style={{flex: 1, textDecorationLine: 'underline'}}>
                  {imageInfo.fileName}
                </Text>
              </Chip>
            ) : null}
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
  attachmentChip: {
    flexDirection: 'row',
    width: '50%',
    paddingRight: 50,
    backgroundColor: 'white',
  },
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
    alignItems: 'flex-start',
    padding: spacing.base,
    backgroundColor: colors.white,
    marginBottom: spacing.small,
    paddingBottom: spacing.small,
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
