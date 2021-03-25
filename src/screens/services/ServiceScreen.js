//ServiceScreen module

// import packages
import {Container, View} from 'native-base';
import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import Circles from '../../components/Circles';
import ServicesCard from '../../components/ServicesCard';
import {themes, spacing, typography, colors} from '../../styles';
import CategoriesList from '../../components/CategoriesList';

//function return
function ServiceScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <ScrollView>
        <FocusedStatusBar barStyle="light-content" />

        {/* Services by category template */}
        <View style={styles.serviceCategoryContainer}>
          <Text style={styles.serviceByCategory}>Services by Category</Text>
          <Text onPress={() => setModalVisible(true)} style={styles.seeAll}>
            See All(12)
          </Text>
        </View>

        {/* group1 */}
        <View style={styles.groupOfCatergories}>
          <Pressable
            style={styles.pressablebutton}
            onPress={() => navigation.navigate('Culture')}>
            <Circles categoryName="Culture" />
          </Pressable>
          <Pressable
            style={styles.pressablebutton}
            onPress={() => navigation.navigate('Government/Legal')}>
            <Circles categoryName="Government/Legal" />
          </Pressable>
          <Pressable
            style={styles.pressablebutton}
            onPress={() => navigation.navigate('Mental Health/ Addiction')}>
            <Circles categoryName="Mental Health/ Addiction" />
          </Pressable>
        </View>

        {/* group2 */}
        <View style={styles.groupOfCatergories}>
          <Pressable style={styles.pressablebutton}
            onPress={() => navigation.navigate('Community')}>
            <Circles categoryName="Community" />
          </Pressable>
          <Pressable style={styles.pressablebutton}
            onPress={() => navigation.navigate('Employment and Housing')}>
            <Circles categoryName="Employment & Housing" />
          </Pressable>
          <Pressable style={styles.pressablebutton}
            onPress={() => navigation.navigate('Emergency')}>
            <Circles categoryName="Emergency" />
          </Pressable>
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
  safeArea: {flex: 1},

  // Services by category styles
  serviceCategoryContainer: {
    flex: spacing.hairline,
    flexDirection: 'row',
    height: 60,
    backgroundColor: themes.light.inverseTextColor,
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
  pressablebutton: {width: 130},
  groupOfCatergories: {flexDirection: 'row'},

  //last opened style
  lastOpenedTextCardView: {
    marginVertical: spacing.base,
    marginTop: spacing.base,
    height: 280,
    backgroundColor: themes.light.inverseTextColor,
  },
  savedServicesTextCardView: {backgroundColor: themes.light.inverseTextColor},
  services: {
    color: themes.light.primaryColor,
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    marginTop: spacing.base,
    marginLeft: spacing.large,
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
    width: 30,
    height: 30,
    alignItems: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.gray900,
    shadowOpacity: 0.9,
    borderRadius: 20,
    backgroundColor: colors.primary50,
  },
  closeButtonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
});
export default ServiceScreen;
