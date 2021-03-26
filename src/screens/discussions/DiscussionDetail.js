//Discussion Detail module

// import packages
import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';

import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import Chips from '../../components/Chips';
import ReplyCard from '../../components/ReplyCard';
import { colors, themes, typography, spacing } from '../../styles';
import { discussionGetDetail } from '../../api/discussions/discussions.api';
import { repliesAdd } from '../../api/replies/replies.api';

//function return

function DiscussionDetail({ navigate, route }) {
  const theme = themes.light;
  const [discussion, setDiscussion] = useState(null);
  const [replyInput, setReplyInput] = useState(null);
  const discussionId = route.params.discussionId;

  const token = route.params.token;

  const [modalVisible, setModalVisible] = useState(false);

  // function format date: Example Jan 30th, 2021
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
    const month = new Intl.DateTimeFormat('en', {
      month: 'short',
      timeZone: 'UTC',
    }).format(date);
    const day = new Intl.DateTimeFormat('en', {
      day: '2-digit',
      timeZone: 'UTC',
    }).format(date);

    return `${month} ${day}, ${year}`;
  };
  // useEffect to get discussion detail
  useEffect(() => {
    discussionGetDetail(token, discussionId)
      .then(setDiscussion)
      .catch((err) =>
        Alert.alert(err.errors[0].title, err.errors[0].description),
      );
  }, [token, discussionId, modalVisible]);

  //method handle user tap on Add Reply button
  const handleAddReplyButton = () => {
    if (replyInput && discussionId)
      repliesAdd(token, { text: replyInput.trim() }, discussionId)
        .then(() => {
          setModalVisible(!modalVisible);
        })
        .catch((err) => console.log(err));
  };

  if (!discussion) return null;
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>{discussion.title}</Text>
            <Text style={styles.datePosted}>
              {`${discussion.owner.firstName} ${discussion.owner.lastName
                } Posted ${formatDate(discussion.createdAt)}`}
            </Text>
          </View>
          {discussion.categories[0] ? (
            <Chips name={discussion.categories[0].name} />
          ) : null}

          <Text style={styles.description}>{discussion.description}</Text>
          {discussion.medias[0] ? (
            <Image
              style={styles.image}
              source={{ uri: discussion.medias[0].path }}
            />
          ) : null}
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Replies</Text>
          {discussion.replies.length > 0
            ? discussion.replies.map((reply) => (
              <ReplyCard
                name={`${reply.owner.firstName} ${reply.owner.lastName}`}
                reply={reply.text}
                key={reply._id}
              />
            ))
            : null}
        </View>
      </ScrollView>
      <View style={styles.buttonsGroup}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text onPress={() => setModalVisible(true)} style={styles.buttonText}>
            Reply to this Discussion
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '100%' }}>
          <View style={styles.modalView}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Reply</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButtonText}>x</Text>
              </Pressable>
            </View>
            <View style={{ height: 100 }}>
              <TextInput
                style={styles.modalInput}
                multiline={true}
                placeholder="Type here..."
                onChangeText={setReplyInput}
                value={replyInput}
              />
            </View>
            <TouchableOpacity
              style={styles.modalButtonContainer}
              onPress={() => handleAddReplyButton()}>
              <Text style={styles.buttonText}>Add Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //container style
  container: {
    alignItems: 'flex-start',
    padding: spacing.base,
    backgroundColor: colors.white,
    marginTop: spacing.hairline,
    marginBottom: spacing.smaller,
  },

  //styling for Discussion details
  image: {
    height: 160,
    width: '100%',
    marginVertical: spacing.smaller,
  },
  heading: {
    color: colors.primary900,
    marginBottom: spacing.smaller,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },
  datePosted: {
    marginBottom: spacing.smaller,
  },
  description: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
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
  //styling for modal container
  modalView: {
    marginVertical: '50%',
    marginHorizontal: '10%',
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  modalTitle: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  modalTitleText: {
    fontSize: typography.fs3,
    color: colors.primary900,
    fontWeight: typography.fwBold,
    paddingTop: spacing.smallest,
  },
  closeButton: {
    width: 25,
    height: 25,
    alignItems: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    borderRadius: 100,
    backgroundColor: colors.primary50,
  },
  closeButtonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
  modalInput: {
    borderRadius: 10,
    fontSize: typography.fs3,
    padding: spacing.base,
    marginHorizontal: spacing.small,
    lineHeight: typography.lh3,
    backgroundColor: colors.primary50,
    height: '95%',
  },
  modalButtonContainer: {
    borderRadius: 10,
    marginVertical: spacing.small,
    width: '40%',
    alignSelf: 'center',
    backgroundColor: colors.primary500,
    paddingVertical: spacing.small,
  },
});

export default DiscussionDetail;
