//OrganizationsStack module

// import packages
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {themes} from '../../styles';
import HambugerMenuHeader from '../../components/HambugerMenuHeader';
import RightHeaderButton from '../../components/RightHeaderButton';
import SearchScreen from './SearchScreen';
import SearchResult from './SearchResult';

const theme = themes.light;
const Search = createStackNavigator();

//function return
function SearchStack({navigation}) {
  return (
    <Search.Navigator>
      <Search.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />

      <Search.Screen name="SearchResult" component={SearchResult} />
    </Search.Navigator>
  );
}

export default SearchStack;
