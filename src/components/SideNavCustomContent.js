//SideNavStack module

// import packages
import React from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//function return
function SideNavCustomContent(props) {
  return (
    <DrawerContentScrollView {...props}>
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
      <DrawerItem
        label="Log out"
        onPress={() => props.navigation.navigate('')}
      />
    </DrawerContentScrollView>
  );
}

export default SideNavCustomContent;
