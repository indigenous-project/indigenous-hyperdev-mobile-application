//BottomTabScreen.js

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './home/HomeStack';
import DiscussionsStack from './discussions/DiscussionsStack';
import NewsStack from './news/NewsStack';
import ServicesStack from './services/ServicesStack';
import OrganizationsStack from './organizations/OrganizationsStack';

const Tab = createBottomTabNavigator();
function BottomTabScreen(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Discussions" component={DiscussionsStack} />
      <Tab.Screen name="News" component={NewsStack} />
      <Tab.Screen name="Services" component={ServicesStack} />
      <Tab.Screen name="Organizations" component={OrganizationsStack} />
    </Tab.Navigator>
  );
}

export default BottomTabScreen;
