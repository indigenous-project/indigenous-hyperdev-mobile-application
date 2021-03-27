//OrganizationScreen module

// import packages
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {spacing, themes} from '../../styles';
import OrganizationChips from '../../components/OrganizationChips';
import OrganizationListViews from '../../components/OrganizationListViews';
import MapViews from '../../components/MapViews';
import {View} from 'native-base';
import SwitchSelector from 'react-native-switch-selector';

import {organizationGetList} from '../../api/organizations/organizations.api';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {useIsFocused} from '@react-navigation/core';

//function return
function OrganizationScreen() {
  const [stateSelector, setStateSelector] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const [reloadData, setReloadData] = useState(reloadData);
  const isFocused = useIsFocused();
  const [organizationList, setOrganizationList] = useState();

  //options for switch selectors
  const options = [
    {label: 'List', value: 1},
    {label: 'Map', value: 2},
  ];

  //useEffect to load organization list
  useEffect(() => {
    organizationGetList(token)
      .then((response) => {
        stateSelector === null ? setStateSelector(1) : null; // set initial stateSelector = listView
        if (response) {
          setOrganizationList(response);
        }
      })
      .catch((err) => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, reloadData, stateSelector, isFocused]);

  //dynamic data
  const data = {
    name: 'North Bay Medical Care',
    rating: '5.0',
    link: 'nbmedicalcare.com',
    location: '5240Lakeshor Dr',
    type: 'Walk in Clinic',
    image:
      'https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80',
  };
  if (!organizationList) return null;

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
          options={options}
          initial={0}
          textColor={themes.light.primaryColor}
          bold={true}
          borderRadius={10}
          height={27}
          selectedColor={themes.light.inverseTextColor}
          buttonColor={themes.light.primaryColor}
          onPress={(value) => {
            switch (value) {
              case 1:
                // list view of the orgnizations;
                setStateSelector(1);
                break;

              case 2:
                // map view of the orgnizations;
                setStateSelector(2);
                break;
            }
          }}
        />
      </View>
      {stateSelector == 1 ? (
        // List View
        <OrganizationListViews organizationList={organizationList} />
      ) : stateSelector == 2 ? (
        //  Map View
        <MapViews
          organizationList={organizationList}
          // latitude={45.35611}
          // longitude={-75.757248}
          // description="My Location"
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
    // height:500,
    marginTop: 60,
  },
});
export default OrganizationScreen;
