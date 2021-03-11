//HomeScreen module

// import packages
import React, {useState, useEffect} from 'react';

import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {categoriesGetList} from '../../api/categories/categories.api';
import FocusedStatusBar from '../../components/FocusedStatusBar';

//function return
function HomeScreen(props) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    categoriesGetList(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ3YzY4NDkwZTc4MjAwMDdmZjg2ZTEiLCJpYXQiOjE2MTUzMTY2Mjh9.AOe0KoE5MRZN1xw2hMEI3Tq28QPeASkc8BAugpHEChc',
    )
      .then(setCategories)
      .catch(console.log);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'bottom', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <Text>{JSON.stringify(categories)}</Text>
    </SafeAreaView>
  );
}

export default HomeScreen;
