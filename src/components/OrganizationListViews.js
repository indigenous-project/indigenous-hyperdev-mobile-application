//OrgnizationListView module

// import packages
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import OrganizationsCard from './OrganizationsCard';

export default function OrganizationListViews(props) {
  return (
    <ScrollView style={styles.scrollView}>
      <OrganizationsCard
        name={props.name}
        rating={props.rating}
        link={props.link}
        location={props.location}
        type={props.type}
        image={props.image}
      />
      <OrganizationsCard
        name={props.name}
        rating={props.rating}
        link={props.link}
        location={props.location}
        type={props.type}
        image={props.image}
      />
      <OrganizationsCard
        name={props.name}
        rating={props.rating}
        link={props.link}
        location={props.location}
        type={props.type}
        image={props.image}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
