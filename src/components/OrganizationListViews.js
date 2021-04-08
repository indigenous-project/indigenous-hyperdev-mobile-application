//OrgnizationListView module

// import packages
import React, {useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../styles';
import OrganizationsCard from './OrganizationsCard';

export default function OrganizationListViews(props) {
  const data = props.organizationList; //to store the data from Organization Screen
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(reloadData);
  const navigation = props.navigationProps;

  //handle on refresh
  const onRefresh = () => {
    setRefreshing(true); // enable refresh indicator
    setReloadData(!reloadData); // change the reloadData to re-render new organization
    wait(1500).then(() => setRefreshing(false)); // hide refresh indicator
  };

  // wait time for refresh
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  return (
    //to display the list of organizations
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary900}
        />
      }>
      {/* to get each array from organization using map function  */}
      {data
        ? data.map((organization) => (
            <TouchableOpacity // navigate to organization detail screen 
              onPress={() =>
                navigation.navigate('Organization Detail', {
                  organization: organization,
                  token: props.token
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
        : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  //styling for the scrollView
  scrollView: {marginTop: 50},
});
