import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {typography} from '../styles';

const HambugerMenuHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <MaterialCommunityIcons
          name="menu"
          size={typography.fs7}
          color="white"
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HambugerMenuHeader;
