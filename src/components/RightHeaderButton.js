import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {themes, typography} from '../styles';

const RightHeaderButton = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => props.navigationProps.navigate('SearchStack')}
        style={styles.headerButton}>
        <MaterialCommunityIcons
          name="magnify"
          size={typography.fs6}
          color={themes.light.primaryColor}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={console.log} style={styles.headerButton}>
        <MaterialCommunityIcons
          name="bell"
          size={typography.fs6}
          color={themes.light.primaryColor}
        />
      </TouchableOpacity>
    </View>
  );
};
export default RightHeaderButton;

const styles = StyleSheet.create({
  //styling for category button
  headerButton: {
    backgroundColor: themes.light.inverseTextColor,
    display: 'flex',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
