//OrgnizationListView module

// import packages
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import OrganizationsCard from './OrganizationsCard';

export default function OrganizationListViews(props) {
  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary900}
        />
      }
      >
      {data
        ? data.map((organization) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Organization Detail', {
                  organizationId: organization._id,
                })
              }
              key={organization._id}>
              <OrganizationsCard
                id={organization._id}
                name={organization.name}
                reviews={organization.reviews}
                website={organization.contact.website}
                location={organization.contact.address}
                type={organization.category.name}
                isIndigenous={organization.isIndigenous}
                image={organization.medias}
              />
            </TouchableOpacity>
          ))
        : null}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollView: {paddingVertical:0},
});

