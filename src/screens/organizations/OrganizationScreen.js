//OrganizationScreen module

// import packages
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {colors, spacing} from '../../styles';
import OrganizationChips from '../../components/OrganizationChips';
import SwitchSelectors from '../../components/SwitchSelectors';
import OrganizationsCard from '../../components/OrganizationsCard';
import MapViews from '../../components/MapViews';

//function return
function OrganizationScreen(props) {
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
      <SwitchSelectors />

      {/* List Views */}
      <ScrollView style={styles.scrollView}>
        <OrganizationsCard
          name="North Bay Medical Care"
          rating="5.0"
          link="nbmedicalcare.com"
          location="5240Lakeshor Dr"
          type="Walk in Clinic"
          image="https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
        />
        <OrganizationsCard
          name="North Bay Medical Care"
          rating="5.0"
          link="nbmedicalcare.com"
          location="5240Lakeshor Dr"
          type="Walk in Clinic"
          image="https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
        />
        <OrganizationsCard
          name="North Bay Medical Care"
          rating="5.0"
          link="nbmedicalcare.com"
          location="5240Lakeshor Dr"
          type="Walk in Clinic"
          image="https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
        />
      </ScrollView>

      {/* Map View */}

      {/* <MapViews
        latitude={45.35611}
        longitude={-75.757248}
        description="My Location"
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: spacing.hairline},
});
export default OrganizationScreen;
