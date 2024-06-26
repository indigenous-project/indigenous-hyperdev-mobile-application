//BottomItem.js

//Import field
import React, {useState} from 'react';
import {StyleSheet, Animated, Dimensions, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {themes, typography} from '../styles';
//////////////////////////////////////////

//Define BottomItem module
const BottomItem = ({iconName, isCurrent, size, color, index}) => {
  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / 5; //Calculate the width of each tab

  return (
    <>
      <Animated.View
        style={[
          isCurrent ? styles.slider : styles.sliderDisable,
          {
            transform: [{translateX: translateValue}],
            width: tabWidth - 20,
          },
        ]}
      />
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    </>
  );
};

export default BottomItem;
const styles = StyleSheet.create({
  icon: {
    marginVertical: 0,
    fontSize: typography.fs6,
  },
  sliderDisable: {
    height: 4,
    position: 'absolute',
    top: 0,
    left: 10,

    borderRadius: 10,
    width: 50,
  },

  slider: {
    height: 4,
    position: 'absolute',
    top: 0,
    left: 10,
    backgroundColor: themes.light.primaryColor,
    borderRadius: 10,
    width: 50,
  },
});
