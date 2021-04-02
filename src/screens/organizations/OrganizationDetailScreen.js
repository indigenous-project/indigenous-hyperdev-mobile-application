//OrganizationDetail Screen

//import packages
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Linking} from 'react-native';
import {Button, Text, View} from 'native-base';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import OrganizationDetailCard from '../../components/OrganizationDetailCard';
import OrganizationDetailsTimeCard from '../../components/OrganizationDetailsTimeCard';
import OrganizationDetailsContactCard from '../../components/OrganizationDetailsContactCard';
import OrganizationShareHeader from '../../components/OrganizationShareHeader';
import {colors, spacing, typography} from '../../styles';

export default function OrganizationDetailScreen({navigation, route}) {
  const organization = route.params.organization;

  //function handle when user tap on number that invoke call option
  function handlePhone() {
    Linking.openURL(`tel:${organization.contact.phone}`);
  }

  //function handle when user tap on link that navigate to google map with keyword search location near my location
  function handleGoLink() {
    Linking.openURL(
      `https://maps.google.com/?q=${organization.contact.address
        .split(',')[0]
        .trim()}`,
    );
  }
  //useLayoutEffect to get title and share button
  useLayoutEffect(() => {
    organization
      ? navigation.setOptions({
          headerTitle: organization.name,
          headerRight: () => (
            <OrganizationShareHeader shareData={organization} />
          ),
        })
      : null;
  }, [navigation, organization]);
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <ScrollView>
        <View>
          {/* Detail card */}
          <OrganizationDetailCard
            title={organization.name}
            // reviews={organization.reviews}
            decs={organization.description}
            address={organization.contact.address}
            // image={organization.medias}
          />

          {/* timings */}
          <OrganizationDetailsTimeCard openHours={organization.openHours} />

          {/* contact details */}
          <OrganizationDetailsContactCard
            phone={organization.contact.phone}
            website={organization.contact.website}
            email={organization.contact.email}
            facebook={organization.contact.facebook}
          />
        </View>
        {/* buttons */}
        <View style={styles.buttonsView}>
          {/* call button */}
          <Button style={styles.callButton} onPress={handlePhone}>
            <Text style={styles.callButtonText}>Call</Text>
          </Button>
          {/* get direction button */}
          <Button style={styles.getDirButton} onPress={handleGoLink}>
            <Text style={styles.getDirButtonText}>Get Direction</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //styling on call and get direction button
  buttonsView: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginVertical: '25%',
    minHeight: '10%',
    marginTop: spacing.none,
  },
  callButton: {
    backgroundColor: colors.primary400,
    width: '36%',
    height: 35,
    paddingLeft: spacing.largest,
    marginLeft: 20,
    alignSelf: 'center',
  },
  getDirButton: {
    backgroundColor: colors.primary400,
    marginLeft: '15%',
    height: 35,
    alignSelf: 'center',
  },
  callButtonText: {fontWeight: typography.fwSemiBold},
  getDirButtonText: {fontWeight: typography.fwSemiBold},
});
