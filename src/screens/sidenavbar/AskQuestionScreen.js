//AskQuestionScreen.js

// import packages
import React, {useState, useEffect} from 'react';

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
  RefreshControl,
} from 'react-native';

import {colors, themes, typography, spacing} from '../../styles';
import BackButtonHeaderLeft from '../../components/BackButtonHeaderLeft';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {
  messageAdd,
  messageGetList,
  messageSeen,
} from '../../api/messages/messages.api';
import {useIsFocused} from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
///////////////////////////////////////////////////////////////////////////////////

//Define  AskQuestionscreen module
function AskQuestionScreen({navigation}) {
  //useState Field
  const theme = themes.light;
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const [isSent, setIsSent] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const isFocused = useIsFocused();
  const [listViewRef, setListViewRef] = useState();

  // Function handle user tap on Send button to send a message
  const handleSend = (data) => {
    if (data.text !== '')
      messageAdd(token, data) //Call API to send a messages
        .then(() => {
          setMessage(''); // Set value of input is empty when the message is sent
          setIsSent(!isSent);
        }) // Reload the list of message if there is a message was sent
        .catch(console.log);
  };

  // wait time for refresh
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  //handle on refresh
  const onRefresh = () => {
    setRefreshing(true); // enable refresh indicator
    setReloadData(!reloadData); // change the reloadData to re-render new Discussion
    wait(1500).then(() => setRefreshing(false)); // hide refresh indicator
  };

  // useEffect fetching list of messages
  useEffect(() => {
    if (token && isFocused) {
      messageGetList(token, {
        senderId: currentUser._id,
      })
        .then(setListMessage)
        .catch(console.log);
    }
  }, [reloadData, isSent, isFocused]); // Get a new list of messages when the screen is focused, a message was sent and refresh screen

  //useEffect fetching set meesage to "seen"
  useEffect(() => {
    if (token && listMessage) {
      const listMessageIds = listMessage.map((item) => {
        if ('receiver' in item) {
          return item._id;
        }
      });
      messageSeen(token, {messageIds: listMessageIds})
        .then()
        .catch(console.log);
    }
  }, [isFocused]); // When user go to the screen, all coming message is set to "Seen"

  //Render elements
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['right', 'top', 'left', 'bottom']}>
      <FocusedStatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={styles.headerContainer}>
          {/*Back button in header */}
          <BackButtonHeaderLeft
            navigationProp={navigation}
            color={theme.primaryColor}
          />
          <View style={styles.headingContainer}>
            <Image
              style={styles.topIcon}
              source={require('../../asserts/userIcon.png')}
            />
            <Text style={styles.heading}>Ask Question</Text>
          </View>
        </View>

        <ScrollView
          ref={(ref) => {
            setListViewRef(ref);
          }}
          showsVerticalScrollIndicator={false}
          // Auto scroll to bottom when the new message is coming
          onContentSizeChange={() => {
            listViewRef.scrollToEnd({animated: true});
          }}
          style={styles.scrollView}
          //Refresh to get a new messages from admin
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/*Render list of messages: amdin messages and user messages */}
          {listMessage
            ? listMessage.map((chat) =>
                chat.sender ? (
                  <View key={chat._id} style={styles.myChat}>
                    <Text style={styles.myText}>{chat.text}</Text>
                  </View>
                ) : (
                  <View key={chat._id} style={styles.adminChat}>
                    <Text style={styles.adminText}>{chat.text}</Text>
                  </View>
                ),
              )
            : null}
        </ScrollView>
        {/*Input message field */}
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
              onChangeText={setMessage} //update value of input
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSend({text: message})}>
            <MaterialCommunityIcons
              style={styles.buttonSend}
              name="send"
              color={colors.primary600}
              size={25}
            />
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
    flexDirection: 'row',
    width: '100%',
    shadowColor: colors.gray900,
    height: 70,
    marginTop: spacing.base,
    shadowOpacity: 0.2,
    backgroundColor: colors.white,
    shadowOffset: {width: 3, height: 6},
  },
  headingContainer: {
    width: '90%',
    paddingRight: spacing.largest,
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
    paddingVertical: spacing.smallest,
    width: '100%',
  },
  myChat: {
    maxWidth: '70%',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.smaller,
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
  },
  adminChat: {
    maxWidth: '70%',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.smaller,
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
  },
  bottomContainer: {
    width: '100%',
    paddingVertical: spacing.smallest,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    backgroundColor: colors.gray50,
  },
  inputContainer: {
    width: '85%',
    borderColor: colors.gray900,
    borderWidth: 0.3,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  newInput: {
    padding: spacing.smaller,
    paddingTop: spacing.smaller,
    paddingHorizontal: spacing.base,
    fontWeight: typography.fwMedium,
    fontSize: typography.fs3,
  },
  button: {
    width: '15%',
    alignSelf: 'center',
  },
  buttonSend: {
    paddingLeft: spacing.small,
  },
});

export default AskQuestionScreen;
