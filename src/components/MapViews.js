//MapView module

// import packages
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {spacing} from '../styles';

export default function MapViews(props) {
  let organizations = props.organizationList;

  //to get the latitutde
  function getLat(data) {
    let latitude;
    data.forEach((organization) => {
      latitude = organization.coords.lat;
    });
    return latitude;
  }

  //to get the latitutde
  function getLong(data) {
    let longitude;
    data.forEach((organization) => {
      longitude = organization.coords.long;
    });
    return longitude;
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const aspectRatio = windowWidth / windowHeight;
  const latitudeDelta = 0.0922;
  const coordinates = {
    // call the getLat funnction to get the latitude
    lat: getLat(organizations),
    // call the getLong funnction to get the longitude
    long: getLong(organizations),
    desc: props.description,
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        // followsUserLocation={true}
        showsTraffic={true}
        loadingEnabled={true}
        region={{
          latitude: coordinates.lat,
          longitude: coordinates.long,
          latitudeDelta: latitudeDelta,
          longitudeDelta: latitudeDelta * aspectRatio,
        }}>
        {organizations.map((org) => (
          <Marker
            key={org._id}
            title={org.name}
            coordinate={{
              latitude: org.coords.lat,
              longitude: org.coords.long,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: spacing.hairline},
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 110,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
