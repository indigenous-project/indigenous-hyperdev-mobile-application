//OrganizationDetail Screen

//import packages
import React, { useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Alert,
  Text,
  View
} from 'react-native';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import OrganizationDetailCard from '../../components/OrganizationDetailCard';
import OrganizationDetailsTimeCard from '../../components/OrganizationDetailsTimeCard';
import OrganizationDetailsContactCard from '../../components/OrganizationDetailsContactCard';
import OrganizationShareHeader from '../../components/OrganizationShareHeader';
import { colors, spacing, typography } from '../../styles';
import { AirbnbRating } from 'react-native-ratings';
import { organizationReview } from '../../api/organizations/organizations.api';

export default function OrganizationDetailScreen({ navigation, route }) {
  //to get the organization detail
  const organization = route.params.organization;
  const organizationId = route.params.organization._id;
  const token = route.params.token;
  const [rating, setRating] = useState(null);
  //function to handle when user taps on number that invoke call option
  function handlePhone() {
    Linking.openURL(`tel:${organization.contact.phone}`);
  }

  //function to handle when user taps on link that navigate to google map with keyword search location near my location
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
        headerRight: () => (
          <OrganizationShareHeader shareData={organization} />
        ),
      })
      : null;
  }, [navigation, organization]);

  //to handle the rate button when the user clicks the button after rating
  const handleRate = () => {
    if (rating && organizationId) {
      //send request the ratings to the api
      organizationReview(token, { reviews: [{ score: rating }] }, organizationId)
        .then(() => {
          Alert.alert('Rating successfull');
        })
        .catch((err) => console.log(err));
    }
  };

  //function handle asking to confirm user want to rate the organization or not
  const handleRateButton = (rate) => {
    Alert.alert(
      `Ratings`,
      `You want to rate your experience by ${rate}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            handleRate()
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="dark-content" />

      <ScrollView>
        {/* Component of Organization Detail card */}
        <OrganizationDetailCard
          title={organization.name}
          reviews={organization.reviews}
          decs={organization.description}
          address={organization.contact.address}
          image={organization.medias}
        />

        {/* Component of Organization opening and closing details */}
        <OrganizationDetailsTimeCard openHours={organization.openHours} />

        {/* Component of Organization contact details */}
        <OrganizationDetailsContactCard
          phone={organization.contact.phone}
          website={organization.contact.website}
          email={organization.contact.email}
          facebook={organization.contact.facebook}
        />

        <View style={styles.container}>
          <Text style={styles.heading}>Rate your experience:</Text>
          <AirbnbRating
            count={5}
            size={25}
            defaultRating={0}
            onFinishRating={(rate) => {
              setRating(rate)
              handleRateButton(rate)
            }}
          />
        </View>

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
  container: {
    backgroundColor: colors.white,
    padding: spacing.base,
    marginBottom: spacing.base
  },
  heading: {
    color: colors.primary900,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    marginBottom: spacing.small
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
  rateButtonContainer: {
    width: '50%',
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
