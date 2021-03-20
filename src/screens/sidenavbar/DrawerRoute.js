// Drawer module

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabScreen from '../BottomTabScreen';
import SideNavCustomContent from '../../components/SideNavCustomContent';

import AboutScreen from './AboutScreen';
import FontsizeScreen from './FontsizeScreen';
import IndigenousPeopleScreen from './IndigenousPeopleScreen';
import AskQuestionScreen from './AskQuestionScreen';
import DisclaimerScreen from './DisclaimerScreen';

const Drawer = createDrawerNavigator();

const DrawerRoute = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideNavCustomContent {...props} />}
      drawerPosition="left"
      backBehavior='history'
      drawerType="front"
      hideStatusBar={true}>
      <Drawer.Screen
        options={{ drawerLabel: 'Home' }}
        name="BottomTabScreen"
        component={BottomTabScreen}
      />
      <Drawer.Screen name="FontSizeScreen" component={FontsizeScreen} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
      <Drawer.Screen
        name="IndigenousPeopleScreen"
        component={IndigenousPeopleScreen}
      />
      <Drawer.Screen name="AskQuestionScreen" component={AskQuestionScreen} />
      <Drawer.Screen name="DisclaimerScreen" component={DisclaimerScreen} />
    </Drawer.Navigator>
  );
};
export default DrawerRoute;
