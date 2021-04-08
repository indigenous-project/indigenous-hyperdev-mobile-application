//OrganizationScreen module

// import packages and files
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {spacing, themes} from '../../styles';
import {View} from 'native-base';
import {useIsFocused} from '@react-navigation/core';
import SwitchSelector from 'react-native-switch-selector';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import OrganizationListViews from '../../components/OrganizationListViews';
import OrganizationChips from '../../components/OrganizationChips';
import MapViews from '../../components/MapViews';
import {organizationGetList} from '../../api/organizations/organizations.api';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {useOrganization} from '../../contexts/organizationContext';

//function return
function OrganizationScreen({navigation}) {
  const [stateSelector, setStateSelector] = useState(null); // to set the value for the view in swtich selector
  const [currentUser, token] = useCurrentUser(); // to get the token of the user
  const [organizations, setOrganizations] = useOrganization(); // to get the organization data from the database
  const isFocused = useIsFocused();

  //options for switch selectors
  const options = [
    {label: 'List', value: 1},
    {label: 'Map', value: 2},
  ];

  //useEffect to load organization list
  useEffect(() => {
    if (token && isFocused)
      organizationGetList(token)
        .then((response) => {
          stateSelector === null ? setStateSelector(1) : null; // set initial stateSelector = listView
          if (response) {
            setOrganizations(response);
          }
        })
        .catch((err) => {
          Alert.alert(err.errors[0].title, err.errors[0].description);
        });
  }, [token, isFocused, stateSelector, setOrganizations]);

  if (!organizations) return null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      {/* Chips */}
      <ScrollView
        style={{paddingVertical: 10}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {/* OrgainzationChips component */}
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
        {/*Display the oraganizations in list view/map view */}
      </View>
      {stateSelector == 1 ? (
        // ListView component
        <OrganizationListViews
          organizationList={organizations}
          navigationProps={navigation}
        />
      ) : stateSelector == 2 ? (
        // MapView component
        <MapViews organizationList={organizations} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: spacing.hairline, paddingHorizontal: spacing.base},
  // Custom Switch Selectors Style
  switchView: {
    width: '50%',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 60,
  },
});
export default OrganizationScreen;
