// Drawer module

//Import field
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabScreen from '../BottomTabScreen';
import SideNavCustomContent from '../../components/SideNavCustomContent';

import AboutScreen from './AboutScreen';
import IndigenousPeopleScreen from './IndigenousPeopleScreen';
import AskQuestionScreen from './AskQuestionScreen';

import {CurrentUserProvider} from '../../contexts/currentUserContext';
import DisclaimerScreen from './DisclaimerScreen';
import DisclaimerReviewScreen from './DisclaimerReviewScreen';
import {CategoriesGeneralProvider} from '../../contexts/categoriesGeneralContext';
//////////////////////////////////////////////////////////////////////////////////

//Define a drawer navigator
const Drawer = createDrawerNavigator();

//Define DrawerRoute module
const DrawerRoute = () => {
  //Render elements
  return (
    /*Use current user provider */
    <CurrentUserProvider>
      {/*Use category provider */}
      <CategoriesGeneralProvider>
        <Drawer.Navigator
          drawerContent={(props) => <SideNavCustomContent {...props} />} // Use custom Side nav bar
          drawerPosition="left"
          backBehavior="history"
          drawerType="front"
          hideStatusBar={true}
          initialRouteName="BottomTabScreen">
          {/*BottomTabScreen component */}
          <Drawer.Screen
            options={{drawerLabel: 'Home'}}
            name="BottomTabScreen"
            component={BottomTabScreen}
          />
          {/*About Screen component */}
          <Drawer.Screen name="AboutScreen" component={AboutScreen} />
          {/*Indigenous People Screen component */}
          <Drawer.Screen
            name="IndigenousPeopleScreen"
            component={IndigenousPeopleScreen}
          />
          {/*Ask question Screen component */}
          <Drawer.Screen
            name="AskQuestionScreen"
            component={AskQuestionScreen}
          />
          {/*DisclaimerScreen component */}
          <Drawer.Screen name="DisclaimerScreen" component={DisclaimerScreen} />
          {/*DisclaimerReviewScreen component */}
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
