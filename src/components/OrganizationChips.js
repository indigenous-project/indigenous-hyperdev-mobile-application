//OrganizationChips module

// import packages
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {colors, spacing, themes, typography} from '../styles';

const OrganizationChips = (props) => {
  //to change the style after selection
  const [selected, setSelected] = useState(false);
  const [textColor, setTextColor] = useState();
  const [style, setStyle] = useState();

  //to load the styles for the chips
  useEffect(() => {
    if (selected) {
      //set the text color of the chip if selected
      setTextColor(colors.white);
      //set the style of the chip if selected
      setStyle({
        backgroundColor: themes.light.primaryColor,
      });
    } else {
      //set the text of the chip
      setTextColor(themes.light.primaryColor);

      //set the style of the chip
      setStyle({
        backgroundColor: themes.light.inverseTextColor,
        borderColor: themes.light.primaryColor,
        borderWidth: 1,
      });
    }
  }, [selected]);

  // when the chip is selected this method is invoked.
  const chipsSelected = () => {
    setSelected(!selected);
  };

  return (
    //display the chips
    <View style={styles.chipsView}>
      <Chip
        style={style}
        mode="outlined"
        selected={selected}
        textStyle={styles.textStyle}
        selectedColor={textColor}
        onPress={() => chipsSelected()}>
        {props.category}
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  // Chips Style
  chipsView: {
    marginRight: spacing.small,
  },
  textStyle: {
    fontSize: typography.fs2,
    fontWeight: typography.fwMedium,
  },
});

export default OrganizationChips;
