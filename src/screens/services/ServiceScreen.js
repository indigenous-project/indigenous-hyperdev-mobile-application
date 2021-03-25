//ServiceScreen module

// import packages
import { Container, View } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import CategoryButton from '../../components/CategoryButton'
import ServicesCard from '../../components/ServicesCard';
import { themes, spacing, typography, colors } from '../../styles';
import CategoriesList from '../../components/CategoriesList';

//function return
function ServiceScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <ScrollView>
        <FocusedStatusBar barStyle="light-content" />

        {/* Services by category template */}
        <View style={styles.serviceCategoryContainer}>
          <View style={styles.servicesTitle}>
            <Text style={styles.serviceByCategory}>Services by Category</Text>
            <Text onPress={() => setModalVisible(true)}>
              See All(12)
          </Text>
          </View>

          <View style={styles.servicesGroup}>
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/cultureIcon.png"
              name="Culture"
            />
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/legalIcon.png"
              name="Government/ Legal"
            />
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/hospitalIcon.png"
              name="Mental Health/ Addiction"
            />
          </View>
          <View style={styles.servicesGroup}>
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/communityIcon.png"
              name="Community"
            />
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/employmentIcon.png"
              name="Employment & Housing"
            />
            <CategoryButton
              icon="https://indigenous-images.s3.amazonaws.com/emergencyIcon.png"
              name="Emergency"
            />
          </View>
        </View>

        {/* last opened template */}
        <View style={styles.lastOpenedTextCardView}>
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
        </View>

        {/* saved Services template */}
        <View style={styles.savedServicesTextCardView}>
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
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Categories</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButtonText}>x</Text>
              </Pressable>
            </View>
            <CategoriesList
              selected={setCategory}
              visibleModal={setModalVisible}
            />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  // Services by category styles
  serviceCategoryContainer: {
    backgroundColor: themes.light.inverseTextColor,
    paddingBottom: spacing.base
  },
  servicesTitle: {
    flexDirection: 'row',
    marginHorizontal: spacing.base,
    marginTop: spacing.base,
    justifyContent: 'space-between'
  },
  serviceByCategory: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },

  //last opened style
  lastOpenedTextCardView: {
    marginVertical: spacing.base,
    height: 280,
    backgroundColor: themes.light.inverseTextColor
  },
  savedServicesTextCardView: {
    backgroundColor: themes.light.inverseTextColor,
    paddingBottom: spacing.base
  },
  services: {
    color: themes.light.primaryColor,
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    marginTop: spacing.base,
    marginLeft: spacing.large,
  },
  //styling for service categories
  servicesGroup: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: spacing.small,
    backgroundColor: colors.white,
  },
  //styling for modal container
  modalView: {
    marginTop: 50,
    backgroundColor: colors.primary50,
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
    borderBottomColor: colors.gray400,
    borderBottomWidth: 0.2,
  },
  modalTitleText: {
    fontSize: typography.fs3,
    color: colors.primary900,
    fontWeight: typography.fwBold,
    paddingTop: spacing.smallest,
  },
  closeButton: {
    width: 25,
    height: 25,
    alignItems: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.5,
    borderRadius: 100,
    backgroundColor: colors.primary50,
  },
  closeButtonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
});
export default ServiceScreen;