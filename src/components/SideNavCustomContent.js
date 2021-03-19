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
import { Alert, Image, View, Text } from 'react-native';
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
    <DrawerContentScrollView {...props}>
      <Loader loading={loading} />
      <View
        style={{
          backgroundColor: colors.primary400,
          height: 100,
          alignItems: 'center',
          paddingLeft: spacing.large,
          flexDirection: 'row'
        }}
      >
        <Image
          style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 100, marginRight: 10 }}
          source={require('../testImages/userIcon.png')} />
        <View>
          <Text style={{ color: 'white', fontSize: typography.fs3, fontWeight: typography.fwBold, marginBottom: spacing.smaller }}>FirstName LastName</Text>
          <Text style={{ color: 'white', fontSize: typography.fs2 }}>Edit Profile</Text>
        </View>
      </View>
      <DrawerItem style={{ borderBottomColor: colors.gray900, borderBottomWidth: 0.2, width: '100%' }}
        label="Font Size"
        onPress={() => props.navigation.navigate('FontSizeScreen')}
        labelStyle={{ color: colors.gray900, fontWeight: typography.fwMedium }}
        icon={() =>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../testImages/fontSizeIcon.png')} />}
      />
      <DrawerItem style={{ borderBottomColor: colors.gray900, borderBottomWidth: 0.2, width: '100%' }}
        label="About us"
        onPress={() => props.navigation.navigate('AboutScreen')}
        labelStyle={{ color: colors.gray900, fontWeight: typography.fwMedium }}
        icon={() =>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../testImages/aboutIcon.png')} />}
      />
      <DrawerItem style={{ borderBottomColor: colors.gray900, borderBottomWidth: 0.2, width: '100%' }}
        label="Indigenous People"
        onPress={() => props.navigation.navigate('IndigenousPeopleScreen')}
        labelStyle={{ color: colors.gray900, fontWeight: typography.fwMedium }}
        icon={() =>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../testImages/indigenousIcon.png')} />}
      />
      <DrawerItem style={{ borderBottomColor: colors.gray900, borderBottomWidth: 0.2, width: '100%' }}
        label="Ask Question"
        onPress={() => props.navigation.navigate('AskQuestionScreen')}
        labelStyle={{ color: colors.gray900, fontWeight: typography.fwMedium }}
        icon={() =>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../testImages/askQueIcon.png')} />}
      />
      <DrawerItem style={{ borderBottomColor: colors.gray900, borderBottomWidth: 0.2, width: '100%' }}
        label="Discussion Desclaimer"
        onPress={() => props.navigation.navigate('SavedItemsScreen')}
        labelStyle={{ color: colors.gray900, fontWeight: typography.fwMedium }}
        icon={() =>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../testImages/infoIcon.png')} />}
      />
      <DrawerItem style={{ borderBottomColor: colors.gray900, borderBottomWidth: 0.2, width: '100%' }}
        label="Log out" onPress={handleLogout}
        labelStyle={{ color: colors.gray900, fontWeight: typography.fwMedium }}
        icon={() =>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../testImages/logoutIcon.png')} />}
      />
    </DrawerContentScrollView>
  );
}

export default SideNavCustomContent;
