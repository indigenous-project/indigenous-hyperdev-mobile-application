//AskQuestionScreen.js

// import packages
import React, {useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {colors, themes, typography, spacing} from '../../styles';
import BackButtonHeaderLeft from '../../components/BackButtonHeaderLeft';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {messageAdd, messageGetList} from '../../api/messages/messages.api';
import {useEffect} from 'react/cjs/react.development';
import {useIsFocused} from '@react-navigation/core';

//function return
function AskQuestionScreen({navigation}) {
  const theme = themes.light;
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const isFocused = useIsFocused();

  const handleSend = (data) => {
    messageAdd(token, data)
      .then(() => setMessage(''))
      .catch(console.log);
  };
  console.log(listMessage);
  useEffect(() => {
    if (token && isFocused) {
      messageGetList(token, {
        senderId: currentUser._id,
        receiverId: '605030fddeae69a9ee1cc593',
      })
        .then(setListMessage)
        .catch(console.log);
    }
  }, [token, currentUser, isFocused]);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['right', 'top', 'left', 'bottom']}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <BackButtonHeaderLeft navigationProps={navigation} />
        <View style={styles.headerContainer}>
          <Image
            style={styles.topIcon}
            source={require('../../testImages/userIcon.png')}
          />
          <Text style={styles.heading}>Ask Question</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {listMessage
            ? listMessage.map((chat) =>
                chat.sender._id === currentUser._id ? (
                  <View key={chat._id} style={styles.myChat}>
                    <Text style={styles.myText}>
                      Hello! I would like to get more information about your
                      recent post related to scholarships.
                    </Text>
                  </View>
                ) : (
                  <View key={chat._id} style={styles.adminChat}>
                    <Text style={styles.adminText}>
                      Sounds good. You can get more information from the
                      following link: www.northbayschorships.ca{' '}
                    </Text>
                  </View>
                ),
              )
            : null}
          {/* <View style={styles.myChat}>
            <Text style={styles.myText}>
              Hello! I would like to get more information about your recent post
              related to scholarships.
            </Text>
          </View>
          <View style={styles.adminChat}>
            <Text style={styles.adminText}>
              Sounds good. You can get more information from the following link:
              www.northbayschorships.ca{' '}
            </Text>
          </View> */}
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.newInput}
              autoCapitalize="sentences"
              placeholder="Message"
              value={message}
              multiline
              numberOfLines={47}
              scrollEnabled={false}
              onChangeText={setMessage}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSend({text: message})}>
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
    backgroundColor: colors.white,
  },
  headerContainer: {
    height: 70,
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    backgroundColor: colors.white,
    shadowOffset: {width: 3, height: 6},
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
    alignSelf: 'center',
  },
  scrollView: {
    paddingVertical: spacing.base,
    width: '100%',
  },
  myChat: {
    width: '70%',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginVertical: spacing.smaller,
    backgroundColor: colors.primary900,
    marginHorizontal: spacing.smallest,
  },
  myText: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    color: colors.white,
    paddingTop: spacing.small,
  },
  adminChat: {
    width: '70%',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginVertical: spacing.smaller,
    backgroundColor: colors.primary50,
    marginHorizontal: spacing.smallest,
  },
  adminText: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    color: colors.gray900,
    paddingTop: spacing.small,
  },
  bottomContainer: {
    // marginBottom: spacing.hairline,
    width: '100%',
    paddingVertical: spacing.smallest,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    backgroundColor: colors.gray50,
  },
  inputContainer: {
    width: '85%',
    borderColor: colors.gray900,
    borderWidth: 0.2,
    borderRadius: 40 / 2,
    maxHeight: 300,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  newInput: {
    paddingVertical: spacing.smaller,
    paddingHorizontal: spacing.smaller,
    fontWeight: typography.fwMedium,
    fontSize: typography.sf3,
  },
  button: {
    width: '15%',
  },
  buttonText: {
    paddingVertical: spacing.small,
    paddingLeft: spacing.small,
    color: 'blue',
    fontSize: typography.fs3,
  },
});

export default AskQuestionScreen;
