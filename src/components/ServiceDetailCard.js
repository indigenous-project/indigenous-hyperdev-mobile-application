import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, themes, typography } from '../styles';

const ServiceDetailCard = (props) => {
  const [showImage, setShowImage] = useState(false);

  const handleShowImage = () => {
    setShowImage(!showImage)
  }

  return (
    <View >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.mainHeading}>{props.name}</Text>
            <Text style={styles.heading}>{props.serviceProviderName}</Text>
            <Text>- {props.serviceProviderPosition}</Text>
          </View>
        </View>
        {props.isIndigenous == true ?
          <Image
            style={styles.indigenousIcon}
            source={require('../testImages/indigenousIcon.png')}
          />
          : null}
      </View>

      <View style={styles.contactContainer}>
        <View style={styles.contactCard}>
          <Text style={styles.label}>Email:</Text>
          <Text>  {props.contactEmail}</Text>
        </View>
        <View style={styles.contactCard}>
          <Text style={styles.label}>Phone:</Text>
          <Text>{props.contactPhone}</Text>
        </View>
      </View>

      <Text style={styles.description}>{props.description}</Text>

      {props.media.length > 0 & showImage == false ?
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleShowImage} >
          <Text style={styles.imageButtonText}>See Brochure</Text>
        </TouchableOpacity>
        : null}
      {props.media.length > 0 & showImage == true ?
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleShowImage} >
          <Text style={styles.imageButtonText}>Hide Brochure</Text>
        </TouchableOpacity>
        : null}
      <View>
        {showImage == true ?
          <Image
            style={styles.image}
            source={{ uri: props.media[0].path }}
          /> : null}
      </View>

    </View>
  );
};

export default ServiceDetailCard;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
  mainHeading: {
    color: colors.primary900,
    marginVertical: spacing.smaller,
    fontWeight: typography.fwBold,
    fontSize: typography.fs4,
  },
  heading: {
    marginVertical: spacing.smaller,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactContainer: {
    marginVertical: spacing.base,
    borderBottomWidth: 0.3,
    borderColor: colors.gray900
  },
  contactCard: {
    flexDirection: 'row',
    paddingBottom: spacing.small
  },
  label: {
    fontWeight: typography.fwSemiBold,
    paddingRight: spacing.smaller
  },
  description: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
  },
  imageButton: {
    width: '40%',
    borderRadius: 10,
    marginTop: spacing.base,
    alignSelf: 'center',
    backgroundColor: colors.primary50,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  imageButtonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.primary900,
    fontWeight: typography.fwMedium,
  },
  image: {
    minHeight: 600,
    width: '100%',
    marginVertical: spacing.smaller,
  },
  indigenousIcon: {
    marginTop: spacing.smallest,
    width: 40,
    height: 40,
  },
});
