//Disclaimer module

// import packages
import React, {useState, useEffect} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, themes, typography, spacing} from '../../styles';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';

//function return
function DisclaimerScreen(props) {
  const [readDisclaimer, setReadDisclaimer] = useAsyncStorage('isRead', false); // Remember if user read the disclaimer already
  const [buttonState, setButtonState] = useState(true); // state of button

  //function handle when scroll view go bottom
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    if (readDisclaimer)
      // If user read the disclaimer, navigate to Discussion Screen
      props.navigation.navigate('Discussions', {
        isRead: readDisclaimer,
      });
    setButtonState(true); //enable the button when user go to the bottom of the disclaimer
  }, [props.navigation, readDisclaimer]);

  //Render elements
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.white}}
      edges={['right', 'top', 'left']}>
      <View
        style={{
          height: 50,
          shadowColor: colors.gray900,
          shadowOpacity: 0.2,
          backgroundColor: colors.white,
          shadowOffset: {width: 3, height: 6},
          justifyContent: 'center',
        }}>
        <Text style={styles.heading}>Discussion Disclaimer & Privacy</Text>
      </View>
      <View>
        <Text style={styles.title}>
          How Discussions work and what you should know.
        </Text>
      </View>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setButtonState(false); // enable the button if user go to the bottom of the disclaimer
          }
        }}
        scrollEventThrottle={400}>
        <View>
          <Text style={styles.description}>
            The opinions expressed on these discussion boards are the views of
            the poster and do not, necessarily, reflect the views of the NBIFC.
            By posting your original content on our publicly accessible
            discussion boards, you grant the NBIFC license to use, distribute,
            reproduce, modify, adapt, publicly perform, and publicly display
            discussion board posts. You can read or post on any of the
            Discussion Boards made available on the Indigenous Bridge and of
            course, you may print the posts or email them to someone you think
            may be interested in the subject. But don’t post information known
            to be false or libelous. The NBIFC cannot be held responsible for
            visitors who violate any of our policies. We can however ban any
            violators as they are made know to us via email or directly on the
            discussion boards We log your IP address and reserve the right to
            ban users abuse our discussion board for any reason. Users may
            provide links to external sites. We are not responsible if these
            links change, or for the privacy practices or the content of such
            Web sites. Please note, all information disclosed here becomes
            public information. You should exercise caution when deciding to
            disclose your personal information. The NBIFC respects your right to
            privacy. Information provided during registration, where required,
            is not shared with third parties. The NBIFC assumes no liability or
            responsibility for errors or omissions in this section or on this
            disclaimer page. The NBIFC cannot be held liable for any damages you
            suffer because of posts made by or about you. This includes “direct,
            incidental, consequential, indirect, or punitive damages” arising
            out of your access to, or use of, these discussion boards. Without
            limiting the foregoing, everything on the NBIFC Indigenous Bridge
            discussion boards is provided to you: “AS IS”, “WITHOUT WARRANTY OF
            ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO,
            THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, OR NON-INFRINGEMENT.” If you have any questions about this
            Discussion Board Legal Disclaimer, the practices of this App or your
            dealings with this App, you can contact the NBIFC directly at
            705-472-2811 .
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <TouchableOpacity
          disabled={buttonState} // disable the button if user dont go to the bottom
          style={
            buttonState ? styles.disableButtonContainer : styles.buttonContainer
          }
          onPress={() => {
            setReadDisclaimer(true); // Remembe if user read the disclaimer
          }}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  heading: {
    color: colors.primary900,
    paddingLeft: spacing.base,
    marginTop: spacing.base,
    fontWeight: typography.fwBold,
    fontSize: typography.fs4,
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    color: colors.primary900,
    textAlign: 'center',
    width: '70%',
    alignSelf: 'center',
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    paddingVertical: spacing.base,
  },

  description: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    padding: spacing.small,
  },

  //button styling
  bottomButton: {
    paddingBottom: spacing.large,
    paddingTop: spacing.base,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '50%',
    marginBottom: spacing.small,
    backgroundColor: colors.primary400,
    borderRadius: spacing.small,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  disableButtonContainer: {
    width: '50%',
    marginBottom: spacing.small,
    backgroundColor: colors.gray300,
    borderRadius: spacing.small,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonText: {
    fontSize: typography.fs2,
    color: colors.white,
    alignSelf: 'center',
    fontWeight: typography.fwBold,
  },
});

export default DisclaimerScreen;
