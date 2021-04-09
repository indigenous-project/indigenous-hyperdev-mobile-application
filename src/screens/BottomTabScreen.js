//BottomTabScreen.js

//Import fields
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './home/HomeStack';
import DiscussionsStack from './discussions/DiscussionsStack';
import NewsStack from './news/NewsStack';
import ServicesStack from './services/ServicesStack';
import OrganizationStack from './organizations/OrganizationsStack';
import {themes, typography} from '../styles';
import {StyleSheet} from 'react-native';
import BottomItem from '../components/BottomItem';
//////////////////////////////////////////////////

//Define theme to use themes module light
const theme = themes.light;

//Define bottom tab navigator
const Tab = createBottomTabNavigator();

//Define BottomTabScreen Module
function BottomTabScreen(props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: theme.primaryColor, // Set active tab color
        inactiveTintColor: theme.subduedTextColor, // Set inactive tab color
      }}>
      {/*Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            /*Use custom tab */
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
      {/*Discussion Tab */}
      <Tab.Screen
        name="Discussions"
        component={DiscussionsStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            /*Use custom tab */
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
      {/*News Tab */}
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            /*Use custom tab */
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
      {/*Services Tab */}
      <Tab.Screen
        name="Services"
        component={ServicesStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            /*Use custom tab */
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
      {/*Organizations Tab */}
      <Tab.Screen
        name="Organizations"
        component={OrganizationStack}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            /*Use custom tab */
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
