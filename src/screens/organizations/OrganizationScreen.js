//OrganizationScreen module

// import packages and files
import React, {useEffect, useState} from 'react';
import {Alert, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, spacing, themes} from '../../styles';
import {View} from 'native-base';
import {useIsFocused} from '@react-navigation/core';
import SwitchSelector from 'react-native-switch-selector';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import OrganizationListViews from '../../components/OrganizationComponent/OrganizationListViews';
import OrganizationChips from '../../components/OrganizationComponent/OrganizationChips';
import MapViews from '../../components/OrganizationComponent/MapViews';
import {organizationGetList} from '../../api/organizations/organizations.api';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {useOrganization} from '../../contexts/organizationContext';

//function return
function OrganizationScreen({navigation}) {
  const [stateSelector, setStateSelector] = useState(null); // to set the value for the view in swtich selector
  const [currentUser, token] = useCurrentUser(); // to get the token of the user
  const [organizations, setOrganizations] = useOrganization(); // to get the organization data from the database
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(reloadData);

  //options for switch selectors
  const options = [
    {label: 'List', value: 1},
    {label: 'Map', value: 2},
  ];

  //handle on refresh
  const onRefresh = () => {
    setRefreshing(true); // enable refresh indicator
    setReloadData(!reloadData); // change the reloadData to re-render new organization
    wait(1500).then(() => setRefreshing(false)); // hide refresh indicator
  };

  // wait time for refresh
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

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
  }, [token, isFocused, reloadData, stateSelector, setOrganizations]);

  if (!organizations) return null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      {/* Chips */}
      <View style={{paddingTop: 10}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {/* OrgainzationChips component */}
          <OrganizationChips category="Categories" />
          <OrganizationChips category="Indigenous" />
          <OrganizationChips category="Top-Rated" />
          <OrganizationChips category="Distance" />
          <OrganizationChips category="Open-Now" />
        </ScrollView>
      </View>

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

      {/*Display the oraganizations in list view/map view */}
      {stateSelector == 1 ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary900}
            />
          }>
          {/*ListView component */}
          <OrganizationListViews
            organizationList={organizations}
            navigationProps={navigation}
            token={token}
          />
        </ScrollView>
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
    marginVertical: 20,
  },
});
export default OrganizationScreen;
