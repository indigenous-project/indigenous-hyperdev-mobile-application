//AskQuestionScreen.js

// import packages
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { colors, themes, typography, spacing } from '../../styles';

//function return
function AskQuestionScreen(props) {
  const theme = themes.light;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['right', 'top', 'left', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View
          style={styles.headerContainer}>
          <Image
            style={styles.topIcon}
            source={require('../../testImages/userIcon.png')}
          />
          <Text style={styles.heading}>Ask Question</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.myChat}>
            <Text style={styles.myText}>Hello! I would like to get more information about your recent post related to scholarships.</Text>
          </View>
          <View style={styles.adminChat}>
            <Text style={styles.adminText}>Sounds good. You can get more information from the following link: www.northbayschorships.ca </Text>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.newInput} placeholder="Message" />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white
  },
  headerContainer: {
    height: 70,
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    backgroundColor: colors.white,
    shadowOffset: { width: 3, height: 6 },
    justifyContent: 'center',
  },
  heading: {
    color: colors.primary900,
    marginTop: spacing.smallest,
    fontWeight: typography.fwMedium,
    fontSize: typography.fs3,
    justifyContent: 'center',
    textAlign: 'center',
  },
  topIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 100,
    alignSelf: 'center'
  },
  scrollView: {
    paddingVertical: spacing.base,
    width: '100%'
  },
  myChat: {
    width: '70%',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginVertical: spacing.smaller,
    backgroundColor: colors.primary900,
    marginHorizontal: spacing.smallest
  },
  myText: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    color: colors.white,
    paddingTop: spacing.small
  },
  adminChat: {
    width: '70%',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginVertical: spacing.smaller,
    backgroundColor: colors.primary50,
    marginHorizontal: spacing.smallest
  },
  adminText: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    color: colors.gray900,
    paddingTop: spacing.small
  },
  bottomContainer: {
    // marginBottom: spacing.hairline,
    width: '100%',
    paddingVertical: spacing.smallest,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    backgroundColor: colors.gray50
  },
  inputContainer: {
    width: '85%',
    borderColor: colors.gray900,
    borderWidth: 0.2,
    borderRadius: 100,
    height: 40,
    backgroundColor: colors.white
  },
  newInput: {
    height: 25,
    padding: spacing.large,
    fontWeight: typography.fwMedium,
    fontSize: typography.sf3,
  },
  button: {
    width: '15%'
  },
  buttonText: {
    paddingVertical: spacing.small,
    paddingLeft: spacing.small,
    color: 'blue',
    fontSize: typography.fs3
  }
});


export default AskQuestionScreen;
