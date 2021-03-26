//ServiceScreen module

// import packages
import { Container, View } from 'native-base';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import CategoryButton from '../../components/CategoryButton';
import ServicesCard from '../../components/ServicesCard';
import { themes, spacing, typography, colors } from '../../styles';
import CategoriesList from '../../components/CategoriesList';

//function return
function ServiceScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  return (
    <SafeAreaView edges={['right', 'left']}>
      <ScrollView >
        <FocusedStatusBar barStyle="light-content" />

        {/* Services by category template */}
        <View style={styles.container}>
          <View style={styles.titleBlock}>
            <Text style={styles.heading}>Services by Category</Text>
            <Text onPress={() => setModalVisible(true)} >
              See All(12)
          </Text>
          </View>

          {/* group1 */}
          <View style={styles.groupOfCatergories}>
            <Pressable

              onPress={() => navigation.navigate('Culture')}>
              <CategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/cultureIcon.png"
                name="Culture"
              />
            </Pressable>
            <Pressable

              onPress={() => navigation.navigate('Government/Legal')}>
              <CategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/legalIcon.png"
                name="Government/Legal" />
            </Pressable>
            <Pressable

              onPress={() => navigation.navigate('Mental Health/ Addiction')}>
              <CategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/hospitalIcon.png"
                name="Mental Health/ Addiction" />
            </Pressable>
          </View>

          {/* group2 */}
          <View style={styles.groupOfCatergories}>
            <Pressable
              onPress={() => navigation.navigate('Community')}>
              <CategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/communityIcon.png"
                name="Community" />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Employment and Housing')}>
              <CategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/employmentIcon.png"
                name="Employment & Housing" />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Emergency')}>
              <CategoryButton
                icon="https://indigenous-images.s3.amazonaws.com/emergencyIcon.png"
                name="Emergency" />
            </Pressable>
          </View>
        </View>

        {/* last opened template */}
        <View style={styles.container}>
          <Text style={styles.heading}>Last Opened</Text>
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
        <View style={styles.container}>
          <Text style={styles.heading}>Saved Services</Text>
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

  // Services by category styles
  container: {
    padding: spacing.base,
    backgroundColor: colors.white,
    marginBottom: spacing.small,
  },
  heading: {
    color: colors.primary900,
    paddingBottom: spacing.smallest,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },

  titleBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.base,
    width: '95%'
  },
  groupOfCatergories: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    shadowOpacity: 0.2,
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
