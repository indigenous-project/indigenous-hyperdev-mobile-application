//SwitchSelectors module

// import packages
import React from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import {spacing, themes, typography} from '../styles';
import SwitchSelector from 'react-native-switch-selector';

const SwitchSelectors = ({navigation}) => {
  // options for the switch selector
  const options = [
    {
      label: 'List',
      value: 'listView',
    },
    {label: 'Map', value: 'mapView'},
  ];
  return (
    <View style={styles.switchView}>
      <SwitchSelector
        style={styles.switch}
        options={options}
        initial={0}
        textColor={themes.light.primaryColor}
        bold={true}
        borderRadius={10}
        animationDuration={200}
        height={27}
        selectedColor={themes.light.inverseTextColor}
        buttonColor={themes.light.primaryColor}
        onPress={selectedView}
      />
    </View>
  );
};

const selectedView = (value) => {
  console.log(value);
  if (value === 'mapView') {
  }
};

export default SwitchSelectors;

const styles = StyleSheet.create({
  // Custom Switch Selectors Style
  switchView: {alignSelf: 'center'},
  switch: {
    width: '50%',
    height: typography.lh8,
    marginTop: spacing.large,
    marginBottom: spacing.smallest,
  },
});
