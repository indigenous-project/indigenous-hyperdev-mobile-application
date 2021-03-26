import { ServiceCatalog } from 'aws-sdk';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { spacing } from '../../styles';
import ServiceCategoryCard from '../../components/ServiceCategoryCard';

const ServiceCategoryScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <View style={{ paddingTop: spacing.small }}>
        <ServiceCategoryCard
          category="Services And Programs"
          title="Title"
          name="Name"
          description="Description"
        />
      </View>
    </SafeAreaView>
  );
};

export default ServiceCategoryScreen;

const styles = StyleSheet.create({});
