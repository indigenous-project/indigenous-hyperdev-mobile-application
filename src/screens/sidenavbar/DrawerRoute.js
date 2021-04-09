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

import {DiscussionProvider} from '../../contexts/discussionContext';
import {EventProvider} from '../../contexts/eventContext';
import {JobProvider} from '../../contexts/jobContext';
import {NewsProvider} from '../../contexts/newsContext';
import {ServiceProvider} from '../../contexts/serviceContext';
import {OrganizationProvider} from '../../contexts/organizationContext';
//////////////////////////////////////////////////////////////////////////////////

//Define a drawer navigator
const Drawer = createDrawerNavigator();

//Define DrawerRoute module
const DrawerRoute = () => {
  //Render elements
  return (
    /*Use current user provider */

    <CurrentUserProvider>
      {/* Apply Discussion provider */}
      <DiscussionProvider>
        {/* Apply Event provider */}
        <EventProvider>
          {/* Apply Job provider */}
          <JobProvider>
            {/* Apply News provider */}
            <NewsProvider>
              {/* Apply Service provider */}
              <ServiceProvider>
                {/* Apply Organization provider */}
                <OrganizationProvider>
                  {/*Use category provider */}
                  <CategoriesGeneralProvider>
                    <Drawer.Navigator
                      drawerContent={(props) => (
                        <SideNavCustomContent {...props} />
                      )} // Use custom Side nav bar
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
                      <Drawer.Screen
                        name="AboutScreen"
                        component={AboutScreen}
                      />
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
                      <Drawer.Screen
                        name="DisclaimerScreen"
                        component={DisclaimerScreen}
                      />
                      {/*DisclaimerReviewScreen component */}
                      <Drawer.Screen
                        name="DisclaimerReviewScreen"
                        component={DisclaimerReviewScreen}
                      />
                    </Drawer.Navigator>
                  </CategoriesGeneralProvider>
                </OrganizationProvider>
              </ServiceProvider>
            </NewsProvider>
          </JobProvider>
        </EventProvider>
      </DiscussionProvider>
    </CurrentUserProvider>
  );
};
export default DrawerRoute;
