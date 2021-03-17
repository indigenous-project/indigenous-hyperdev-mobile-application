//BottomTabScreen.js

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './home/HomeStack';
import DiscussionsStack from './discussions/DiscussionsStack';
import NewsStack from './news/NewsStack';
import ServicesStack from './services/ServicesStack';
import OrganizationsStack from './organizations/OrganizationsStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {themes} from '../styles';

const theme = themes.light;

const Tab = createBottomTabNavigator();
function BottomTabScreen(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.primaryColor,
        inactiveTintColor: theme.subduedTextColor,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discussions"
        component={DiscussionsStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons
              name="card-bulleted-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons
              name="newspaper"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Organizations"
        component={OrganizationsStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons
              name="home-city-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabScreen;
