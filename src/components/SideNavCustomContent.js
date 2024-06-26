//SideNavStack module

// import packages
import React, {useState, useEffect} from 'react';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {userLogout} from '../api/auth/auth.api';
import {removeAsyncStorage, useAsyncStorage} from '../hooks/useAsyncStorage';
import Loader from './Loader';

import {deleteItemAsync} from 'expo-secure-store';

import {
  Alert,
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {colors, spacing, themes, typography} from '../styles';
import {useCurrentUser} from '../contexts/currentUserContext';
import {Badge} from 'react-native-paper';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {messageUnread} from '../api/messages/messages.api';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {s3Storage} from '../api/aws/s3Strorage';
import {mediaAddImage} from '../api/medias/media.api';

//function return
function SideNavCustomContent(props) {
  const [loading, setLoading] = useState(false);
  const [unreadMessage, setUnreadMessage] = useState(0);
  const [avatar, setAvatar] = useAsyncStorage('userAvatar', null);
  const [loadImage, setLoadImage] = useState(false);

  const [currentUser, token] = useCurrentUser();
  const isOpen = useIsDrawerOpen();

  useEffect(() => {
    if (isOpen) {
      //do stuff

      messageUnread(token, {senderId: currentUser._id})
        .then(setUnreadMessage)
        .catch(console.log);
    }
  }, [isOpen]);

  // Function handle when tap logout
  const handleLogout = () => {
    // show Loader
    if (currentUser) {
      setLoading(true);
      userLogout(token) // call API
        .then((response) => {
          props.navigation.toggleDrawer();
          setLoading(false); // hide Loader
          if (response.logout) {
            // check if logout successfull
            deleteItemAsync('userToken'); // remove token from storage when logout
            removeAsyncStorage('isRead'); // remove isRead disclaimer from Async storage when logout
            props.navigation.replace('Auth'); // navaigate to authentication screen
          }
        })
        .catch((err) => {
          setLoading(false); // hide Loader
          Alert.alert(err.errors[0].title, err.errors[0].description);
        });
    } else {
      props.navigation.replace('Auth');
    }
  };

  // function handle change avatar

  const changeAvartar = () => {
    // set initial configuration
    launchImageLibrary(
      // get image from library
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
          setLoadImage(true);
          s3Storage(response.base64) // store image in S3 aws: base64
            .then((data) => {
              // return a imageData object
              return {
                path: data.Location,
                extension: `.${response.type.substring(
                  response.type.indexOf('/') + 1,
                  response.type.length,
                )}`,
                type: `${response.type.substring(
                  0,
                  response.type.indexOf('/'),
                )}`,
              };
            })
            .then((imageData) => mediaAddImage(token, imageData))
            .then((res) => {
              setAvatar(res.path);
              setLoadImage(false);
            })
            .catch((err) => {
              console.log(err);
              setLoadImage(false);
            });
        }
      },
    );
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}} {...props}>
      <Loader loading={loading} />
      <View style={styles.drawerHeaderContainer}>
        <View style={styles.drawerHeaderContent}>
          <TouchableOpacity onPress={() => changeAvartar()}>
            <ImageBackground
              style={styles.headerIcon}
              source={
                !avatar ? require('../asserts/userIcon.png') : {uri: avatar}
              }>
              {loadImage ? (
                <ActivityIndicator
                  style={styles.headerIcon}
                  animating={true}
                  color={themes.light.primaryColor}
                  size="small"
                />
              ) : null}
            </ImageBackground>
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>
              {currentUser
                ? `${currentUser.firstName} ${currentUser.lastName}`
                : 'FirstName LastName'}
            </Text>
            <Text style={styles.headerButton}>Edit Profile</Text>
          </View>
        </View>
      </View>
      <DrawerItem
        style={styles.drawerItem}
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={styles.image}
            source={require('../asserts/homeIcon.png')}
          />
        )}
      />

      <DrawerItem
        style={styles.drawerItem}
        label="About us"
        onPress={() => props.navigation.navigate('AboutScreen')}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={styles.image}
            source={require('../asserts/aboutIcon.png')}
          />
        )}
      />
      <DrawerItem
        style={styles.drawerItem}
        label="Indigenous Peoples"
        onPress={() => props.navigation.navigate('IndigenousPeopleScreen')}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={styles.image}
            source={require('../asserts/indigenousIcon.png')}
          />
        )}
      />

      <DrawerItem
        style={styles.drawerItem}
        label={() => (
          <View style={styles.row}>
            <Text>Ask Question</Text>
            {unreadMessage > 0 ? (
              <Badge style={styles.badge} size={20}>
                {unreadMessage}
              </Badge>
            ) : null}
          </View>
        )}
        onPress={() => {
          props.navigation.navigate('AskQuestionScreen');
          setUnreadMessage(0);
        }}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={styles.image}
            source={require('../asserts/askQueIcon.png')}
          />
        )}
      />

      <DrawerItem
        style={styles.drawerItem}
        label="Discussion Desclaimer"
        onPress={() => props.navigation.navigate('DisclaimerReviewScreen')}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={styles.image}
            source={require('../asserts/infoIcon.png')}
          />
        )}
      />
      <DrawerItem
        style={styles.drawerItem}
        label="Log out"
        onPress={handleLogout}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={styles.image}
            source={require('../asserts/logoutIcon.png')}
          />
        )}
      />
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  //drawer header styles
  drawerHeaderContainer: {
    backgroundColor: colors.primary400,
    height: 130,
    paddingTop: spacing.largest,
  },
  drawerHeaderContent: {
    flexDirection: 'row',
    marginTop: spacing.larger,
    alignItems: 'center',
    paddingLeft: spacing.large,
  },
  headerIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50 / 2,
    marginRight: spacing.base,
    overflow: 'hidden',
  },
  headerTitle: {
    color: 'white',
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    marginBottom: spacing.smaller,
  },
  headerButton: {
    color: 'white',
    fontSize: typography.fs2,
  },

  //drawer items styles
  drawerItem: {
    borderBottomColor: colors.gray900,
    borderBottomWidth: 0.3,
    width: '100%',
  },
  labelStyle: {
    color: colors.gray900,
    fontWeight: typography.fwMedium,
  },
  image: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    position: 'absolute',
    right: 0,
  },
});

export default SideNavCustomContent;
