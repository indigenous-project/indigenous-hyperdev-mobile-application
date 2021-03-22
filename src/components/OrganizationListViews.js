//OrgnizationListView module

// import packages
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import OrganizationsCard from './OrganizationsCard';

export default function OrganizationListViews(props) {
  return (
    <ScrollView style={styles.scrollView}>
      <OrganizationsCard
        name={props.listofData.name}
        rating={props.listofData.rating}
        link={props.listofData.link}
        location={props.location}
        type={props.listofData.type}
        image={props.listofData.image}
      />
      <OrganizationsCard
        name={props.listofData.name}
        rating={props.listofData.rating}
        link={props.listofData.link}
        location={props.location}
        type={props.listofData.type}
        image={props.listofData.image}
      />
      <OrganizationsCard
        name={props.listofData.name}
        rating={props.listofData.rating}
        link={props.listofData.link}
        location={props.location}
        type={props.listofData.type}
        image={props.listofData.image}
      />
      <OrganizationsCard
        name={props.listofData.name}
        rating={props.listofData.rating}
        link={props.listofData.link}
        location={props.location}
        type={props.listofData.type}
        image={props.listofData.image}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
