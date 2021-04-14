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
import ServicesCategoryButton from '../../components/ServiceComponent/ServicesCategoryButton';
import ServicesCard from '../../components/ServiceComponent/ServicesCard';
import { themes, spacing, typography, colors } from '../../styles';
import { serviceGetList } from '../../api/services/services.api';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { useCategoryGeneral } from '../../contexts/categoriesGeneralContext';
import { removeAsyncStorage, useAsyncStorage } from '../../hooks/useAsyncStorage';
import { useIsFocused } from '@react-navigation/core';

//function return
function ServiceScreen({ navigation }) {
  const [services, setServices] = useState(null);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [currentUser, token] = useCurrentUser();
  const [categories] = useCategoryGeneral();
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [storeLastOpen, setStoreLastOpen] = useAsyncStorage('lastOpen', []);

  // removeAsyncStorage('lastOpen');

  // handle lastOpen
  const handleLastOpen = (service) => {
    let arr = storeLastOpen;
    arr.unshift(service);
    // filter to get unique item
    let uniqueArr = arr.filter(
      (item1, index, a) =>
        a.findIndex((item2) => item1._id === item2._id) === index,
    );
    uniqueArr.length > 2 ? uniqueArr.pop() : null; // only get 2 item

    setStoreLastOpen(uniqueArr);
  };

  //get only categories those are listed as "general"
  const categoriesGeneral = categories.filter(
    (item) => item.type === 'general',
  );

  //useEffect to get the services from API
  useEffect(() => {
    serviceGetList(token)
      .then(setServices)
      .catch((err) =>
        Alert.alert(err.errors[0].title, err.errors[0].description),
      );
  }, [token]);

  //toggle between size of categories to show "more" or "less" categories
  if (categoriesExpanded == false) {
    categoriesGeneral.length = 6;
  }

  //renderItem to set each category in component
  function renderItem({ item }) {
    return categoriesGeneral ? (
      <View
        style={{
          width: '25%',
          marginHorizontal: spacing.base,
          marginVertical: spacing.smallest,
        }}>
        <Pressable
          onPress={() => {
            setSelectedServiceCategory(item);
            setModalVisible(true);
          }}>
          {/* ServicesCategoryButton Component */}
          <ServicesCategoryButton
            icon={item.icon}
            name={item.name}
            category={{ id: item._id, name: item.name }}
          />
        </Pressable>
      </View >
    ) : null;
  }

  if (!services) return null;
  //return Function
  return (
    <SafeAreaView edges={['right', 'left']} style={{ flex: 1 }}>
      <FocusedStatusBar barStyle="light-content" />

      {/* Services by category template */}
      <View style={styles.serviceContainer}>
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
        <FlatList
          data={categoriesGeneral}
          numColumns={3}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>

      {/* last opened template */}
      {storeLastOpen.length > 0 ?
        <View style={styles.lastOpenedcontainer}>
          <Text style={styles.heading}>Last Opened</Text>
          <ScrollView style={{ paddingHorizontal: spacing.smallest }}>
            {storeLastOpen.map((service) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Service Detail', {
                    name: service,
                    token: token,
                  })
                }
                key={service._id}>
                {/* ServicesCarrd Component */}
                <ServicesCard
                  title={service.name}
                  name={service.contact.providerName}
                  position={service.contact.position}
                  isIndigenous={service.isIndigenous}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        : null}

      {/* Modal to show services by selected category */}
      {selectedServiceCategory ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView} key={selectedServiceCategory._id}>
            <View style={styles.modalTitle}>
              <View>
                <Text style={styles.modalTitleText}>
                  {selectedServiceCategory.name}
                </Text>
              </View>

              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
                key={selectedServiceCategory._id}>
                <Text style={styles.buttonText}>x</Text>
              </Pressable>
            </View>

            <View style={{ padding: spacing.base }}>
              <Text style={styles.heading} >Services and Programs</Text>
              {services.filter((service) => {
                return service.category.name === selectedServiceCategory.name;
              }).map((service) => (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    handleLastOpen(service)
                    navigation.navigate('Service Detail', {
                      name: service,
                      token: token,
                    })
                  }}
                  key={service._id}>
                  {/* ServicesCard Component */}
                  <ServicesCard
                    title={service.name}
                    name={service.contact.providerName}
                    position={service.contact.position}
                    isIndigenous={service.isIndigenous}
                  />
                </TouchableOpacity>
              ))
              }
            </View>
          </View>
        </Modal>
      ) : null
      }
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  // Services by category styles
  serviceContainer: {
    paddingVertical: spacing.base,
    backgroundColor: colors.white,
    marginBottom: spacing.base,
  },
  lastOpenedcontainer: {
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
    width: '97%',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.small
  },

  //styling for modal container
  modalView: {
    marginTop: 50,
    backgroundColor: colors.white,
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
    borderBottomWidth: 0.3,
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
