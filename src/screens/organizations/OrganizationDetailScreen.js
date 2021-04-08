//OrganizationDetail Screen

//import packages
import React, {useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {Text, View} from 'native-base';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import OrganizationDetailCard from '../../components/OrganizationDetailCard';
import OrganizationDetailsTimeCard from '../../components/OrganizationDetailsTimeCard';
import OrganizationDetailsContactCard from '../../components/OrganizationDetailsContactCard';
import OrganizationShareHeader from '../../components/OrganizationShareHeader';
import {colors, spacing, typography} from '../../styles';
import {AirbnbRating} from 'react-native-ratings';
import {organizationReview} from '../../api/organizations/organizations.api';

export default function OrganizationDetailScreen({navigation, route}) {
  //to get the organization detail
  const organization = route.params.organization;
  const organizationId = route.params.organization._id;
  const token = route.params.token;
  const [modalVisible, setModalVisible] = useState(false);
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
  const handleRateButton = () => {
    if (rating && organizationId) {
      //send request the ratings to the api
      organizationReview(token, {reviews: [{score: rating}]}, organizationId)
        .then(() => {
          setModalVisible(!modalVisible);
          Alert.alert('Rating successfull');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

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
        {/*Organization Rating Button*/}
        <View style={styles.buttonsGroup}>
          <TouchableOpacity
            style={styles.rateButtonContainer}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Give Rating</Text>
          </TouchableOpacity>
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
      
      {/* modal to rate the organization */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', height: '100%'}}>
          <View style={styles.modalView}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Rate</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButtonText}>x</Text>
              </Pressable>
            </View>
            <View style={{height: 100}}>
              <AirbnbRating
                count={5}
                size={20}
                defaultRating={0}
                onFinishRating={(rate) => {
                  setRating(rate);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.modalButtonContainer}
              onPress={() => handleRateButton()}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  //styling for rating modal container
  modalView: {
    marginVertical: '50%',
    marginHorizontal: '10%',
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  modalTitle: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  modalTitleText: {
    fontSize: typography.fs4,
    color: colors.primary900,
    fontWeight: typography.fwBold,
    paddingTop: spacing.smallest,
  },
  closeButton: {
    width: 25,
    height: 25,
    alignItems: 'center',
    shadowOffset: {width: 3, height: 3},
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    borderRadius: 100,
    backgroundColor: colors.primary50,
  },
  closeButtonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
  modalButtonContainer: {
    borderRadius: 10,
    marginVertical: spacing.small,
    width: '40%',
    alignSelf: 'center',
    backgroundColor: colors.primary400,
    paddingVertical: spacing.small,
  },
});
