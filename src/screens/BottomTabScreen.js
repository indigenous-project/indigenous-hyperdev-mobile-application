//BottomTabScreen.js

import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Javascript
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import HomeStack from './home/HomeStack';
import DiscussionsStack from './discussions/DiscussionsStack';
import NewsStack from './news/NewsStack';
import ServicesStack from './services/ServicesStack';
import OrganizationsStack from './organizations/OrganizationsStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, themes} from '../styles';
import {View, StyleSheet, Animated} from 'react-native';


const theme = themes.light;

//const Tab = createBottomTabNavigator();
const Tab = AnimatedTabBarNavigator();

function BottomTabScreen(props, navigation) {
  // fadeAnim will be used as the value for opacity. Initial Value: 0

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.white,
        inactiveTintColor: theme.subduedTextColor,
      }}
      appearance={{
        activeTabBackgrounds: [
          colors.primary300,
          colors.primary300,
          colors.primary300,
          colors.primary300,
          colors.primary300,
        ],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              style={styles.icon}
              name="home"
              size={size}
              color={color}
            />
          ),
          // tabBarVisible: !props.route.state?.routes[0]?.state?.index
        }}
      />
      <Tab.Screen
        name="Discussions"
        component={DiscussionsStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              style={styles.icon}
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
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              style={styles.icon}
              name="newspaper-variant-outline"
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
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              style={styles.icon}
              name="calendar-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Organizations"
        component={OrganizationsStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              style={styles.icon}
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
const styles = StyleSheet.create({
  //container style
  tabBarFocused: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderTopWidth: 2,
    borderTopColor: theme.primaryColor,
    paddingHorizontal: 15,
  },
  tabBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderTopWidth: 2,
    paddingHorizontal: 15,
    borderTopColor: 'white',
  },
  icon: {
    marginVertical: 5,
  },
});
