//OrgnizationListView module

// import packages
import React from 'react';
import {TouchableOpacity} from 'react-native';
import OrganizationsCard from './OrganizationsCard';

function OrganizationListViews(props) {
  const data = props.organizationList; //to store the data from Organization Screen
  const navigation = props.navigationProps;

  if (!data) return null;

  return (
    //to display the list of organizations
    // to get each array from organization using map function *
    data
      ? data.map((organization) => (
          <TouchableOpacity // navigate to organization detail screen
            onPress={() =>
              navigation.navigate('Organization Detail', {
                organization: organization,
                token: props.token,
              })
            }
            key={organization._id}>
            {/*organization card component */}
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
      : null
  );
}

export default OrganizationListViews;
