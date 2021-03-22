import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, typography, spacing} from '../styles';

//card to display category button
export default function CategoryButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.categoryButton}>
        <Image
          style={styles.categoryIcon}
          source={{
            uri: props.icon,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.categoryName}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  //styling for category button
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 120,
  },

  categoryButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 3, height: 6},
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    borderRadius: 100,
    backgroundColor: colors.primary50,
  },
  categoryIcon: {
    color: colors.primary900,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  categoryName: {
    color: colors.primary900,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: spacing.small,
    fontSize: typography.fs2,
    textAlign: 'center',
  },
});
