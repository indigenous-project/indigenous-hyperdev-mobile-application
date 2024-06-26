// Survey Card Component

// Import Packages
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { colors, typography, spacing } from '../../styles';

//card to display New Survey Available
export default function SurveyCard(props) {
  //to call the function and store the return value using condition
  let imagePath = props.image !== undefined ? getImage(props.image) : undefined;

  //to get the image path of survey
  function getImage(image) {
    let path;
    path = image.path;
    //return the path of the image
    return path;
  }

  // Render element
  return (
    <View style={styles.newSurvey}>
      <Image
        style={styles.image}
        source={
          imagePath !== undefined
            ? { uri: imagePath }
            : require('../../asserts/demoPic.png')
        }
        accessible
        accessibilityLabel="survey"
      />
      <View style={styles.surveyTitle}>
        <Text numberOfLines={2} style={styles.surveyText}>
          {props.title}
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            Linking.openURL(props.link);
          }}>
          <Text style={styles.buttonText}>Start Survey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Stylesheet for JobCard
const styles = StyleSheet.create({
  //survey card style
  newSurvey: {
    flexDirection: 'row',
    borderRadius: 10,
    maxWidth: '100%',
    backgroundColor: colors.white,
    marginTop: spacing.small,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    borderRadius: 10,
    width: 110,
    height: 110,
    marginVertical: spacing.small,
    marginLeft: spacing.small,
  },
  surveyTitle: {
    display: 'flex',
    justifyContent: 'center',
    width: '70%',
    alignItems: 'center',
  },
  surveyText: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    fontWeight: typography.fwMedium,
    paddingBottom: spacing.small,
    paddingHorizontal: spacing.small,
    alignItems: 'flex-start',
  },
  buttonContainer: {
    minWidth: '50%',
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.primary400,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwMedium,
  },
});
