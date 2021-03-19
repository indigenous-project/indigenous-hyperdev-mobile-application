//OrgnizationListView module

// import packages
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import OrganizationsCard from './OrganizationsCard';

export default function OrganizationListViews() {
  return (
    <ScrollView style={styles.scrollView}>
      <OrganizationsCard
        name="North Bay Medical Care"
        rating="5.0"
        link="nbmedicalcare.com"
        location="5240Lakeshor Dr"
        type="Walk in Clinic"
        image="https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
      />
      <OrganizationsCard
        name="North Bay Medical Care"
        rating="5.0"
        link="nbmedicalcare.com"
        location="5240Lakeshor Dr"
        type="Walk in Clinic"
        image="https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
      />
      <OrganizationsCard
        name="North Bay Medical Care"
        rating="5.0"
        link="nbmedicalcare.com"
        location="5240Lakeshor Dr"
        type="Walk in Clinic"
        image="https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
