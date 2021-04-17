//ServiceCard module

// import packages
import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { spacing, colors, themes, typography } from '../../styles';

//card to display service information
const ServicesCard = (props) => {
  return (
    <View style={styles.cardsContainer}>
      <View style={styles.content}>
        <View>
          <Text style={styles.cardTitle}>{props.title}</Text>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.cardText} numberOfLines={2}>
            - {props.position}
          </Text>
        </View>
        {props.isIndigenous == true ? (
          <Image
            style={styles.indigenousIcon}
            source={require('../../asserts/indigenousIcon.png')}
          />
        ) : null}
      </View>
    </View>
  );
};

export default ServicesCard;

const styles = StyleSheet.create({
  //service card style
  cardsContainer: {
    borderRadius: spacing.small,
    shadowColor: colors.shadowcolor,
    backgroundColor: colors.white,
    padding: spacing.base,
    marginVertical: spacing.smaller,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: typography.fwBold,
  },
  name: {
    marginVertical: spacing.smaller,
    color: colors.gray600,
  },
  indigenousIcon: {
    width: 30,
    height: 30,
  },
});
