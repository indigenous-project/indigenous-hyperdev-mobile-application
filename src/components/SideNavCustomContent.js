//SideNavStack module

// import packages
import React from 'react';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {userLogout} from '../api/auth/auth.api';
import {removeAsyncStorage, useAsyncStorage} from '../hooks/useAsyncStorage';
import Loader from './Loader';
import {useState} from 'react/cjs/react.development';
import {deleteItemAsync} from 'expo-secure-store';
import {useSecureStorage} from '../hooks/useSecureStorage';
import {Alert} from 'react-native';

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
        if (response.data.logout) {
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
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('BottomTabScreen')}
      />
      <DrawerItem
        label="Font Size"
        onPress={() => props.navigation.navigate('FontSizeScreen')}
      />
      <DrawerItem
        label="About us"
        onPress={() => props.navigation.navigate('AboutScreen')}
      />
      <DrawerItem
        label="Indigenous People"
        onPress={() => props.navigation.navigate('IndigenousPeopleScreen')}
      />
      <DrawerItem
        label="Ask Question"
        onPress={() => props.navigation.navigate('AskQuestionScreen')}
      />
      <DrawerItem
        label="Saved Items"
        onPress={() => props.navigation.navigate('SavedItemsScreen')}
      />
      <DrawerItem label="Log out" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}

export default SideNavCustomContent;
