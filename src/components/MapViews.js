//MapView module

// import packages
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {spacing} from '../styles';

export default function MapViews(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const aspectRatio = windowWidth / windowHeight;
  const latitudeDelta = 0.0922;
  const coordinates = {
    lat: props.latitude,
    long: props.longitude,
    desc: props.description,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        //   followsUserLocation={true}
        showsTraffic={true}
        loadingEnabled={true}
        region={{
          latitude: coordinates.lat,
          longitude: coordinates.long,
          latitudeDelta: latitudeDelta,
          longitudeDelta: latitudeDelta * aspectRatio,
        }}>
        <Marker
          key={props.id}
          coordinate={{
            latitude: coordinates.lat,
            longitude: coordinates.long,
          }}
          title={props.title}
          description={coordinates.desc}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: spacing.hairline},
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
