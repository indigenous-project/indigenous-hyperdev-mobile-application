//ServiceScreen module

// import packages
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import ServicesCategoryButton from '../../components/ServicesCategoryButton';
import ServicesCard from '../../components/ServicesCard';
import { themes, spacing, typography, colors } from '../../styles';
import { serviceGetList } from '../../api/services/services.api';
import { useCurrentUser } from '../../contexts/currentUserContext';
import ServiceDetail from '../../components/ServiceDetail';
import { useCategoryGeneral } from '../../contexts/categoriesGeneralContext';
import { removeAsyncStorage, useAsyncStorage } from '../../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/core';

//function return
function ServiceScreen({ navigation }) {
  const [services, setServices] = useState(null);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [currentUser, token] = useCurrentUser();
  const [categories] = useCategoryGeneral();
  const [lastOpen, setLastOpen] = useAsyncStorage('lastOpen', []);
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  const [storedValue, setStoredValue] = useState();
  useEffect(() => {
    AsyncStorage.getItem('lastOpen')
      .then((value) => {
        if (value === null) return [];
        return JSON.parse(value);
      })
      .then(setStoredValue)
      .catch(Alert.alert);
  }, [isFocused]);

  const categoriesGeneral = categories.filter(
    (item) => item.type === 'general',
  );

  useEffect(() => {
    serviceGetList(token)
      .then(setServices)
      .catch((err) =>
        Alert.alert(err.errors[0].title, err.errors[0].description),
      );
  }, [token]);

  if (categoriesExpanded == false) {
    categoriesGeneral.length = 6;
  }

  if (!services) return null;
  function renderItem({ item }) {
    return categoriesGeneral ? (
      <View
        style={{
          width: '25%',
          marginHorizontal: spacing.base,
          marginVertical: spacing.smallest,
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate('Services and Programs', {
              name: item.name,
              token: token,
            })
          }>
          <ServicesCategoryButton
            icon={item.icon}
            name={item.name}
            category={{ id: item._id, name: item.name }}
          />
        </Pressable>
      </View>
    ) : null;
  }
  return (
    <SafeAreaView edges={['right', 'left']} style={{ flex: 1 }}>
      <View>
        <FocusedStatusBar barStyle="light-content" />

        {/* Services by category template */}
        <View style={styles.container}>
          <View style={styles.titleBlock}>
            <Text style={styles.heading}>Services by Category</Text>
            {categoriesExpanded == true ? (
              <Text onPress={() => setCategoriesExpanded(!categoriesExpanded)}>
                See Less
              </Text>
            ) : (
              <Text onPress={() => setCategoriesExpanded(!categoriesExpanded)}>
                See All
              </Text>
            )}
          </View>
        </View>
        <FlatList
          style={{
            backgroundColor: colors.white,
            marginBottom: spacing.base,
            paddingVertical: spacing.smaller,
          }}
          data={categoriesGeneral}
          numColumns={3}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />

        {/* last opened template */}
        <View style={styles.container}>
          <Text style={styles.heading}>Last Opened</Text>
          <ScrollView>
            {storedValue.length > 0
              ? storedValue.map((service) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedService(service);
                    setModalVisible(true);
                  }}
                  key={service._id}>
                  <ServicesCard
                    key={service._id}
                    title={service.name}
                    isIndigenous={service.isIndigenous}
                    name={
                      service.contact.providerName
                        ? service.contact.providerName
                        : '_'
                    }
                    position={service.contact.position}
                  />
                </TouchableOpacity>
              ))
              : null}
          </ScrollView>
        </View>

        {modalVisible ?
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView} key={selectedService._id}>
              <View style={styles.modalTitle}>
                <View>
                  <Text style={styles.modalTitleText}>{selectedService.name}</Text>
                </View>

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}
                  key={selectedService._id}>
                  <Text style={styles.buttonText}>x</Text>
                </Pressable>
              </View>
              <ServiceDetail
                serviceProviderName={selectedService.contact.providerName}
                serviceProviderPosition={selectedService.contact.position}
                contactEmail={selectedService.contact.email}
                contactPhone={selectedService.contact.phone}
                description={selectedService.description}
                isIndigenous={selectedService.isIndigenous}
                media={selectedService.medias}
              />
            </View>
          </Modal> : null}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // Services by category styles
  container: {
    padding: spacing.base,
    backgroundColor: colors.white,
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
    width: '95%',
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
    height: '100%',
  },
  modalTitle: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomColor: colors.gray900,
    borderBottomWidth: 0.2,
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
    shadowOffset: { width: 3, height: 3 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    borderRadius: 100,
    backgroundColor: colors.primary50,
  },
  buttonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
});
export default ServiceScreen;
