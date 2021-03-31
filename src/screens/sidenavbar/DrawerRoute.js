// Drawer module

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabScreen from '../BottomTabScreen';
import SideNavCustomContent from '../../components/SideNavCustomContent';

import AboutScreen from './AboutScreen';
import FontsizeScreen from './FontsizeScreen';
import IndigenousPeopleScreen from './IndigenousPeopleScreen';
import AskQuestionScreen from './AskQuestionScreen';
// import SavedItemsScreen from './SavedItemsScreen';
import {CurrentUserProvider} from '../../contexts/currentUserContext';
import DisclaimerScreen from './DisclaimerScreen';
import DisclaimerReviewScreen from './DisclaimerReviewScreen';
import {CategoriesGeneralProvider} from '../../contexts/categoriesGeneralContext';

const Drawer = createDrawerNavigator();

const DrawerRoute = () => {
  return (
    <CurrentUserProvider>
      <CategoriesGeneralProvider>
        <Drawer.Navigator
          drawerContent={(props) => <SideNavCustomContent {...props} />}
          drawerPosition="left"
          backBehavior="history"
          drawerType="front"
          hideStatusBar={true}
          initialRouteName="BottomTabScreen">
          <Drawer.Screen
            options={{drawerLabel: 'Home'}}
            name="BottomTabScreen"
            component={BottomTabScreen}
          />
          <Drawer.Screen name="FontSizeScreen" component={FontsizeScreen} />
          <Drawer.Screen name="AboutScreen" component={AboutScreen} />
          <Drawer.Screen
            name="IndigenousPeopleScreen"
            component={IndigenousPeopleScreen}
          />
          <Drawer.Screen
            name="AskQuestionScreen"
            component={AskQuestionScreen}
          />
          <Drawer.Screen name="DisclaimerScreen" component={DisclaimerScreen} />
          <Drawer.Screen
            name="DisclaimerReviewScreen"
            component={DisclaimerReviewScreen}
          />
        </Drawer.Navigator>
      </CategoriesGeneralProvider>
    </CurrentUserProvider>
  );
};
export default DrawerRoute;
