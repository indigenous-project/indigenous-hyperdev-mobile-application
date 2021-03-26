import { ServiceCatalog } from 'aws-sdk';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { serviceGetList } from '../../api/services/services.api';
import { spacing, colors, typography } from '../../styles';
import ServicesCard from '../../components/ServicesCard';
import ServiceDetail from '../../components/ServiceDetail'

const ServiceCategoryScreen = ({ navigate, route }) => {
  // console.log(props)
  const token = route.params.token;
  const [services, setServices] = useState(null);
  const [selectedService, setSelctedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const serviceId = route.params.name;
  const [filterServices, setFilteredServices] = useState(null);

  // useEffect(() => {
  //   console.log(selectedService)
  // });

  useEffect(() => {
    serviceGetList(token, serviceId)
      .then(setServices)
      .catch((err) =>
        Alert.alert(err.errors[0].title, err.errors[0].description),
      );
  }, [token, serviceId]);

  const filterServiceByCategory = (data) => {
    const array = data
      .sort((item1, item2) => {
        return (
          parseInt(Date.parse(item2.updatedAt), [10]) -
          parseInt(Date.parse(item1.updatedAt), [10])
        );
      })
      .filter((item) => {
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

  if (!filterServices) return null;
  // console.log(filterServices)
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>

      <View style={styles.container}>
        <Text style={styles.heading}>{serviceId}</Text>

        {filterServices
          ? filterServices.map((service) => (

            <TouchableOpacity
              onPress={() => setSelctedService(service._id) & setModalVisible(true)}
              key={service._id}>
              <ServicesCard
                title={service.name}
                name={service.contact.email}
                description={service.contact.phone}
              />
            </TouchableOpacity>
          ))
          : null}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {filterServices.filter(function (service) {
          return service._id === selectedService;
        }).map((service) => (
          <View style={styles.modalView}>
            <View style={styles.modalTitle}>

              <View>
                <Text style={styles.modalTitleText}>{service.name}</Text>
              </View>

              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonText}>x</Text>
              </Pressable>
            </View>
            <ServiceDetail
              serviceProviderName={"Service Provider"}
              serviceProviderPosition={"Service Provider Position"}
              contactEmail={service.contact.email}
              contactPhone={service.contact.phone}
              description={service.description}
              media={service.media}
            />
          </View>
        ))}
      </Modal>
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
    height: '100%'
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
    borderBottomWidth: 0.2
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
