import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {themes, typography} from '../styles';

const BackButtonHeaderLeft = (props) => {
  const goBack = () => {
    props.navigationProps.goBack();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={goBack}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={typography.fs7}
          color={themes.light.primaryColor}
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default BackButtonHeaderLeft;
