//List of Categories module

// import packages
import React, {useState} from 'react';
import CategoryButton from '../components/CategoryButton';
import {StyleSheet, View, FlatList} from 'react-native';

import {colors, themes, spacing} from '../styles';
import {useCategoryGeneral} from '../contexts/categoriesGeneralContext';

//function return
function CategoriesList(props) {
  const theme = themes.light;
  const [categories] = useCategoryGeneral();

  const categoriesGeneral = categories.filter(
    (item) => item.type === 'general',
  );
  function renderItem({item}) {
    return categoriesGeneral ? (
      <CategoryButton
        icon={item.icon}
        name={item.name}
        category={{id: item._id, name: item.name}}
        selected={props.selected}
        visibleModal={props.visibleModal}
      />
    ) : null;
  }
  return (
    <View style={styles.baseModal}>
      <FlatList
        data={categoriesGeneral}
        numColumns={3}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

export default CategoriesList;

const styles = StyleSheet.create({
  baseModal: {
    height: 700,
    paddingTop: spacing.small,
    backgroundColor: colors.white,
  },

  //styling for service categories
  services: {
    margin: 50,
    backgroundColor: colors.white,
  },
});
