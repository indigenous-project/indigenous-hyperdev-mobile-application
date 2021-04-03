import {SecretsManager, ServiceCatalog} from 'aws-sdk';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {serviceGetList} from '../../api/services/services.api';
import {spacing, colors, typography} from '../../styles';
import ServicesCard from '../../components/ServicesCard';
import ServiceDetail from '../../components/ServiceDetail';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';

const ServiceCategoryScreen = ({navigate, route}) => {
  // console.log(props)
  const token = route.params.token;
  const serviceId = route.params.name;
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterServices, setFilteredServices] = useState(null);
  const [storeLastOpen, setStoreLastOpen] = useAsyncStorage('lastOpen', []);

  const filterServiceByCategory = (data) => {
    const array = data.filter((item) => {
      return item.category.name === serviceId;
    });
    setFilteredServices(array);
  };

  // useEffect load  new services list
  useEffect(() => {
    serviceGetList(token)
      .then((response) => {
        if (response) {
          filterServiceByCategory(response);
        }
      })

      .catch((err) => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token]);

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

  if (!filterServices) return null;
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <View style={styles.container}>
        <Text style={styles.heading}>{serviceId}</Text>

        {filterServices.length > 0
          ? filterServices.map((service) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedService(service);
                  setModalVisible(true);
                  handleLastOpen(service);
                }}
                key={service._id}>
                <ServicesCard
                  title={service.name}
                  name={service.contact.providerName}
                  position={service.contact.position}
                  isIndigenous={service.isIndigenous}
                />
              </TouchableOpacity>
            ))
          : null}
      </View>

      {modalVisible ? (
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
                <Text style={styles.modalTitleText}>
                  {selectedService.name}
                </Text>
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
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};

export default ServiceCategoryScreen;

const styles = StyleSheet.create({
  // Services by category styles
  container: {
    padding: spacing.base,
    backgroundColor: colors.white,
    marginBottom: spacing.small,
    height: '100%',
  },
  heading: {
    color: colors.primary900,
    paddingBottom: spacing.smallest,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
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
    shadowOffset: {width: 3, height: 3},
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
