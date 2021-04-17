//Custom Back button in header

import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {typography} from '../styles';

const BackButtonHeaderLeft = (props) => {
  const goBack = () => {
    props.navigationProp.goBack();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={goBack}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={typography.fs7}
          color={props.color}
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default BackButtonHeaderLeft;
