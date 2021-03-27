//OrganizationScreen module

// import packages
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {spacing, themes, typography} from '../../styles';
import OrganizationChips from '../../components/OrganizationChips';
import OrganizationListViews from '../../components/OrganizationListViews';
import MapViews from '../../components/MapViews';
import {View} from 'native-base';
import SwitchSelector from 'react-native-switch-selector';

//function return
function OrganizationScreen(props) {
  const [stateSelector, setStateSelector] = useState('listView');
  console.log(stateSelector);

  const viewOptions = [
    {
      label: 'List',
      value: 'listView',
    },
    {label: 'Map', value: 'mapView'},
  ];

  const selectedView = (value) => {
    switch (value) {
      case 'listView':
        // list view of the orgnizations;
        setStateSelector(value);
        return value;

      case 'mapView':
        // map view of the orgnizations;
        setStateSelector(value);
        return value;
    }
  };

  const data = {
    name: 'North Bay Medical Care',
    rating: '5.0',
    link: 'nbmedicalcare.com',
    location: '5240Lakeshor Dr',
    type: 'Walk in Clinic',
    image:
      'https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80',
  };
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      {/* Chips */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <OrganizationChips category="Categories" />
        <OrganizationChips category="Indigenous" />
        <OrganizationChips category="Top-Rated" />
        <OrganizationChips category="Distance" />
        <OrganizationChips category="Open-Now" />
      </ScrollView>

      {/* Custom Switch Selectors */}
      <View style={styles.switchView}>
        <SwitchSelector
          options={viewOptions}
          initial={0}
          textColor={themes.light.primaryColor}
          bold={true}
          borderRadius={10}
          animationDuration={200}
          height={27}
          selectedColor={themes.light.inverseTextColor}
          buttonColor={themes.light.primaryColor}
          onPress={selectedView}
        />
      </View>

      {stateSelector == 'listView' ? (
        // List View
        <OrganizationListViews listofData={data} />
      ) : stateSelector == 'mapView' ? (
        //  Map View 
        <MapViews
          latitude={45.35611}
          longitude={-75.757248}
          description="My Location"
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: spacing.hairline},
  // Custom Switch Selectors Style
  switchView: {
    width: '50%',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 60,
  },
});
export default OrganizationScreen;
