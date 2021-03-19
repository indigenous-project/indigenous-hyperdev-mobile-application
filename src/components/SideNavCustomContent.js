//SideNavStack module

// import packages
import React from 'react';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { userLogout } from '../api/auth/auth.api';
import { removeAsyncStorage, useAsyncStorage } from '../hooks/useAsyncStorage';
import Loader from './Loader';
import { useState } from 'react/cjs/react.development';
import { deleteItemAsync } from 'expo-secure-store';
import { useSecureStorage } from '../hooks/useSecureStorage';
import { Alert, Image, View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles';

//function return
function SideNavCustomContent(props) {
  const [token, setToken] = useSecureStorage('userToken', null);
  const [loading, setLoading] = useState(false);

  // Function handle when tap logout
  const handleLogout = () => {
    setLoading(true); // show Loader
    userLogout(token) // call API
      .then((response) => {
        props.navigation.toggleDrawer();
        setLoading(false); // hide Loader
        if (response.logout) {
          // check if logout successfull
          deleteItemAsync('userToken'); // remove token from storage when logout
          //removeAsyncStorage('userName');
          props.navigation.replace('Auth'); // navaigate to authentication screen
        }
      })
      .catch((err) => {
        setLoading(false); // hide Loader
        Alert.alert(err.errors[0].description);
      });
  };
  return (
    <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0, }}
      {...props}>
      <Loader loading={loading} />
      <View style={styles.drawerHeaderContainer} >
        <View style={styles.drawerHeaderContent}>
          <Image
            style={styles.headerIcon}
            source={require('../testImages/userIcon.png')} />
          <View>
            <Text style={styles.headerTitle}>FirstName LastName</Text>
            <Text style={styles.headerButton}>Edit Profile</Text>
          </View>
        </View>
      </View>
      <DrawerItem style={styles.drawerItem}
        label="Font Size"
        onPress={() => props.navigation.navigate('FontSizeScreen')}
        labelStyle={styles.labelStyle}
        icon={() =>
          <Image
            style={styles.image}
            source={require('../testImages/fontSizeIcon.png')} />}
      />
      <DrawerItem style={styles.drawerItem}
        label="About us"
        onPress={() => props.navigation.navigate('AboutScreen')}
        labelStyle={styles.labelStyle}
        icon={() =>
          <Image
            style={styles.image}
            source={require('../testImages/aboutIcon.png')} />}
      />
      <DrawerItem style={styles.drawerItem}
        label="Indigenous People"
        onPress={() => props.navigation.navigate('IndigenousPeopleScreen')}
        labelStyle={styles.labelStyle}
        icon={() =>
          <Image
            style={styles.image}
            source={require('../testImages/indigenousIcon.png')} />}
      />
      <DrawerItem style={styles.drawerItem}
        label="Ask Question"
        onPress={() => props.navigation.navigate('AskQuestionScreen')}
        labelStyle={styles.labelStyle}
        icon={() =>
          <Image
            style={styles.image}
            source={require('../testImages/askQueIcon.png')} />}
      />
      <DrawerItem style={styles.drawerItem}
        label="Discussion Desclaimer"
        onPress={() => props.navigation.navigate('SavedItemsScreen')}
        labelStyle={styles.labelStyle}
        icon={() =>
          <Image
            style={styles.image}
            source={require('../testImages/infoIcon.png')} />}
      />
      <DrawerItem style={styles.drawerItem}
        label="Log out" onPress={handleLogout}
        labelStyle={styles.labelStyle}
        icon={() =>
          <Image
            style={styles.image}
            source={require('../testImages/logoutIcon.png')} />}
      />
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({

  //drawer header styles
  drawerHeaderContainer: {
    backgroundColor: colors.primary400,
    height: 130,
    paddingTop: spacing.largest
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
    borderRadius: 100,
    marginRight: spacing.base
  },
  headerTitle: {
    color: 'white',
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    marginBottom: spacing.smaller
  },
  headerButton: {
    color: 'white',
    fontSize: typography.fs2
  },

  //drawer items styles
  drawerItem: {
    borderBottomColor: colors.gray900,
    borderBottomWidth: 0.2,
    width: '100%'
  },
  labelStyle: {
    color: colors.gray900,
    fontWeight: typography.fwMedium
  },
  image: {
    width: 30,
    height: 30
  }
})

export default SideNavCustomContent;
