import { ServiceCatalog } from 'aws-sdk';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { serviceGetList } from '../../api/services/services.api';
import { spacing, colors, typography } from '../../styles';
import ServicesCard from '../../components/ServicesCard';

const ServiceCategoryScreen = ({ navigate, route }) => {
  // console.log(props)
  const token = route.params.token;
  const [services, setServices] = useState(null);
  const serviceId = route.params.name;
  const [filterServices, setFilteredServices] = useState(null);

  useEffect(() => {
    serviceGetList(token, serviceId)
      .then(setServices)
      .catch((err) =>
        Alert.alert(err.errors[0].title, err.errors[0].description),
      );
  }, [token, serviceId]);

  // sort the discussion list by most replies
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
    setFilteredServices(array); // set Filter discussion
  };

  // useEffect load  new discussion list
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

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>

      <View style={styles.container}>
        <Text style={styles.heading}>{serviceId}</Text>

        {filterServices
          ? filterServices.map((service) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Discussion Detail', {
                  serviceId: service._id,
                  token: token,
                })
              }
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
});
