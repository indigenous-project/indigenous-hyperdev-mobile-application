//ServiceScreen module

// import packages
import {Container} from 'native-base';
import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import Circles from '../../components/Circles';
import ServicesCard from '../../components/ServicesCard';
import {themes, spacing, typography} from '../../styles';

//function return
function ServiceScreen(props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <ScrollView>
        <FocusedStatusBar barStyle="light-content" />

        {/* Services by category template */}
        <Container style={styles.serviceCategoryContainer}>
          <Text style={styles.serviceByCategory}>Services by Category</Text>
          <Text style={styles.seeAll}>See All(12)</Text>
        </Container>

        {/* group1 */}
        <Container style={styles.groupOfCatergories}>
          <Circles categoryName="Culture" />
          <Circles categoryName="Government/Legal" />
          <Circles categoryName="Mental Health/ Addiction" />
        </Container>

        {/* group2 */}
        <Container style={styles.groupOfCatergories2}>
          <Circles categoryName="Community" />
          <Circles categoryName="Employment & Housing" />
          <Circles categoryName="Emergency" />
        </Container>

        {/* last opened template */}
        <Container style={styles.lastOpenedTextCardContainer}>
          <Text style={styles.services}>Last Opened</Text>
          <ServicesCard
            title="A place to Gather"
            name="Donny Sutherlan"
            description="A place to Gather (Enjamonjading) Worker"
          />
          <ServicesCard
            title="A place to Gather"
            name="Donny Sutherlan"
            description="A place to Gather (Enjamonjading) Worker"
          />
        </Container>

        {/* saved Services template */}
        <Container>
          <Text style={styles.services}>Saved Services</Text>
          <ServicesCard
            title="A place to Gather"
            name="Donny Sutherlan"
            description="A place to Gather (Enjamonjading) Worker"
          />
          <ServicesCard
            title="A place to Gather"
            name="Donny Sutherlan"
            description="A place to Gather (Enjamonjading) Worker"
          />
          <ServicesCard
            title="A place to Gather"
            name="Donny Sutherlan"
            description="A place to Gather (Enjamonjading) Worker"
          />
          <ServicesCard
            title="A place to Gather"
            name="Donny Sutherlan"
            description="A place to Gather (Enjamonjading) Worker"
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {flex: 1},

  // Services by category styles
  serviceCategoryContainer: {
    flex: spacing.hairline,
    flexDirection: 'row',
    height: 60,
  },
  serviceByCategory: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    marginTop: spacing.largest,
    marginLeft: spacing.large,
  },
  seeAll: {
    marginTop: 34,
    marginLeft: 100,
    color: themes.light.subduedTextColor,
  },
  groupOfCatergories: {flexDirection: 'row', height: 90},
  groupOfCatergories2: {
    flexDirection: 'row',
    marginVertical: 100,
    height: spacing.none,
  },

  //last opened style
  lastOpenedTextCardContainer: {
    marginVertical: 200,
    marginTop: 150,
    height: 300,
  },
  services: {
    color: themes.light.primaryColor,
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    marginTop: spacing.base,
    marginLeft: spacing.large,
  },
});
export default ServiceScreen;
