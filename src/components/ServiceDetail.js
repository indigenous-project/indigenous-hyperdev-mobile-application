import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { colors, spacing, themes, typography } from '../styles';

const ServiceDetail = (props) => {
  //function handle when user tap on link that navigate to mail app
  const handleEmailLink = () => {
    Linking.openURL(`mailto:${props.contactEmail}`);
  };

  //function handle when user tap on link that navigate to phone app
  const handlePhoneLink = () => {
    Linking.openURL(`tel:${props.contactPhone}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Image
              style={styles.icon}
              source={require('../testImages/userIcon.png')}
            />
            <View>
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
            <Text>{props.contactEmail}</Text>
          </View>
          <View style={styles.contactCard}>
            <Text style={styles.label}>Phone:</Text>
            <Text>{props.contactPhone}</Text>
          </View>
        </View>

        <Text style={styles.description}>{props.description}</Text>
        <TouchableOpacity
          style={styles.imageButton}>
          <Text style={styles.imageButtonText}>See Brochure</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.buttonsGroup}>
        <TouchableOpacity onPress={handlePhoneLink}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEmailLink}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  container: {
    padding: spacing.base,
    backgroundColor: colors.white,
    height: '87%'
  },
  titleContainer: {
    flexDirection: 'row',
  },
  heading: {
    color: colors.primary900,
    marginVertical: spacing.smaller,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 100,
    marginRight: spacing.base,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactContainer: {
    marginVertical: spacing.base,
    borderBottomWidth: 0.2,

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
  indigenousIcon: {
    width: 40,
    height: 40,
  },
  //styling for bottom buttons group
  buttonsGroup: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  buttonContainer: {
    width: '40%',
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.primary500,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});
