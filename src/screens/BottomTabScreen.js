//BottomTabScreen.js

import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Javascript
import HomeStack from './home/HomeStack';
import DiscussionsStack from './discussions/DiscussionsStack';
import NewsStack from './news/NewsStack';
import ServicesStack from './services/ServicesStack';
import OrganizationStack from './organizations/OrganizationsStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, themes, typography} from '../styles';
import {StyleSheet, Animated, Dimensions} from 'react-native';
import BottomItem from '../components/BottomItem';
import SearchStack from './search/SearchStack';

const theme = themes.light;

const Tab = createBottomTabNavigator();
//const Tab = AnimatedTabBarNavigator();

function BottomTabScreen(props) {
  // fadeAnim will be used as the value for opacity. Initial Value: 0

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: theme.primaryColor,
        inactiveTintColor: theme.subduedTextColor,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <BottomItem
              isCurrent={focused}
              iconName="home"
              size={size}
              color={color}
              index={1}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Discussions"
        component={DiscussionsStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <BottomItem
              isCurrent={focused}
              iconName="card-bulleted-outline"
              size={size}
              color={color}
              index={2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <BottomItem
              isCurrent={focused}
              iconName="newspaper-variant-outline"
              size={size}
              color={color}
              index={3}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <BottomItem
              isCurrent={focused}
              iconName="calendar-outline"
              size={size}
              color={color}
              index={4}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Organizations"
        component={OrganizationStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <BottomItem
              isCurrent={focused}
              iconName="home-city-outline"
              size={size}
              color={color}
              index={5}
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
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
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
    marginVertical: 0,
    fontSize: typography.fs6,
  },
  slider: {
    height: 4,
    position: 'absolute',
    top: 0,
    left: 10,
    backgroundColor: themes.light.primaryColor,
    borderRadius: 10,
    width: 50,
  },
});
