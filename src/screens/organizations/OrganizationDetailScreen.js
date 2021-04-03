//OrganizationDetail Screen

//import packages
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Button, Text, View } from 'native-base';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import OrganizationDetailCard from '../../components/OrganizationDetailCard';
import OrganizationDetailsTimeCard from '../../components/OrganizationDetailsTimeCard';
import OrganizationDetailsContactCard from '../../components/OrganizationDetailsContactCard';
import OrganizationShareHeader from '../../components/OrganizationShareHeader';
import { colors, spacing, typography } from '../../styles';

export default function OrganizationDetailScreen({ navigation, route }) {
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
      </ScrollView>

      {/* buttons */}
      <View style={styles.buttonsGroup}>
        {/* call button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePhone}>
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        {/* get direction button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleGoLink}>
          <Text style={styles.buttonText}>Get Direction</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //styling on call and get direction button
  safeArea: {
    flex: 1,
  },
  buttonsGroup: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  buttonContainer: {
    width: '40%',
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.primary400,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});
