//NewsStack module

// import packages
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewsScreen from './NewsScreen';
import NewsDetailScreen from './NewsDetailScreen';
import JobDetailScreen from './JobDetailScreen';
import SurveysListScreen from './SurveysListScreen';
import JobListScreen from './JobListScreen';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';
import SearchStack from '../search/SearchStack';
import AskQuestionScreen from '../sidenavbar/AskQuestionScreen';

const News = createStackNavigator();
const theme = themes.light;

//function return
function NewsStack({navigation}) {
  return (
    /* Navigation logic and header styles for News Screen */
    <News.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.primaryColor}, //header background
        headerTintColor: theme.inverseTextColor, // text colors
        headerRight: () => (
          <RightHeaderButton navigationProps={navigation} section="News" />
        ), // implement right header buttons: search, notification
      }}
      initialRouteName="News">
      <News.Screen
        options={{
          headerLeft: () => <HambugerMenuHeader navigationProps={navigation} />,
        }}
        name="News"
        component={NewsScreen}
      />

      {/* Navigation logic and header styles for News Detail Screen */}
      <News.Screen
        name="News Article"
        component={NewsDetailScreen}
        options={{
          // title: true,
          headerRight: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: theme.primaryColor,
        }}
      />

      {/* Navigation logic and header styles for Job Detail Screen */}
      <News.Screen
        name="Job Detail"
        component={JobDetailScreen}
        options={{
          headerRight: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: theme.primaryColor,
        }}
      />

      {/* Navigation logic and header styles for Surveys List Screen */}
      <News.Screen
        name="Surveys"
        component={SurveysListScreen}
        options={{
          headerRight: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: theme.primaryColor,
        }}
      />

      {/* Navigation logic and header styles for Jobs List Screen */}
      <News.Screen
        name="Jobs List"
        component={JobListScreen}
        options={{
          headerRight: false,
          headerStyle: {backgroundColor: themes.light.inverseTextColor},
          headerTintColor: theme.primaryColor,
        }}
      />

      {/* Navigation logic and header styles for Search News  */}
      <News.Screen
        name="SearchStackNews"
        component={SearchStack}
        options={{headerShown: false}}
      />

      <News.Screen
        name="AskQuestion"
        component={AskQuestionScreen}
        options={{headerShown: false}}
      />
    </News.Navigator>
  );
}

export default NewsStack;
