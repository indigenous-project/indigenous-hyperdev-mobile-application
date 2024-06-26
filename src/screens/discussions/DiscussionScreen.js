//DiscussionScreen module

// import packages
import React, { useEffect, useState } from 'react';

import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import DiscussionCard from '../../components/DiscussionComponent/DiscussionCard';
import CreateDiscussion from '../../components/DiscussionComponent/CreateDiscussion';
import SwitchSelector from 'react-native-switch-selector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, themes, typography, spacing } from '../../styles';

import { discussionGetList } from '../../api/discussions/discussions.api';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { useIsFocused } from '@react-navigation/core';
import { useDiscussion } from '../../contexts/discussionContext';

//switch-selector options
const options = [
  { label: 'Recent', value: 1 },
  { label: 'Most Discussed', value: 2 },
  { label: 'My Discussions', value: 3 },
];

//Define function disccusion screen:
//User can view a list of discussions
//All dicussions are sorting by recent, most discussed and my discussion
//User can refresh scroll view list to get new data.
// User can create a dicussion: tap on create discussion field to show up a modal.

function DiscussionScreen({ navigation }) {
  const theme = themes.light;
  const isFocused = useIsFocused();
  const [filterDiscussion, setFilterDiscussion] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(reloadData);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateSelector, setStateSelector] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const [discussions, setDiscussions] = useDiscussion(); //use discussion context

  // function format date: Example Jan 30th, 2021
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${month} ${day}, ${year}`;
  };

  // sort the discussion list by updated Date
  const sortDate = (data) => {
    let array = data.sort(
      (item1, item2) =>
        parseInt(Date.parse(item2.updatedAt), [10]) -
        parseInt(Date.parse(item1.updatedAt), [10]),
    );

    setFilterDiscussion(array); // set Filter discussion
  };

  // sort the discussion list by most replies
  const sortMostDiscussed = (data) => {
    let array = data
      .sort(
        (item1, item2) =>
          parseInt(Date.parse(item2.updatedAt), [10]) -
          parseInt(Date.parse(item1.updatedAt), [10]),
      )
      .sort(
        (item1, item2) =>
          parseInt(item2.replies.length, [10]) -
          parseInt(item1.replies.length, [10]),
      );

    setFilterDiscussion(array); // set Filter discussion
  };

  // sort the discussion list by most replies
  const sortMyDiscussion = (data) => {
    const array = data
      .sort((item1, item2) => {
        return (
          parseInt(Date.parse(item2.updatedAt), [10]) -
          parseInt(Date.parse(item1.updatedAt), [10])
        );
      })
      .filter((item) => {
        return item.owner.email === currentUser.email;
      });
    setFilterDiscussion(array); // set Filter discussion
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

  // useEffect load  new discussion list
  useEffect(() => {
    if (token && isFocused)
      discussionGetList(token)
        .then((response) => {
          stateSelector === null ? setStateSelector(1) : null; // set initial stateSelector = 1
          setDiscussions(response); // set new discussion context
          if (response) {
            switch (
            stateSelector // checking state of Selector
            ) {
              case 1:
                sortDate(response); // filter by date
                break;
              case 2:
                sortMostDiscussed(response); // filter by mostdiscussed
                break;
              case 3:
                sortMyDiscussion(response); // filter by my discussion
                break;
            }
          }
        })

        .catch((err) => {
          Alert.alert(err.errors[0].title, err.errors[0].description);
        });
  }, [token, reloadData, stateSelector, isFocused]);

  // RETURN COMPONENTS
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={22}
          style={{ textAlignVertical: 'center' }}
          color={theme.subduedTextColor}
        />
        <Text style={styles.createNewButton}>Create a new discussion</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>Create New Discussion</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>x</Text>
            </Pressable>
          </View>
          <CreateDiscussion
            posted={(value) => {
              setModalVisible(value);
              setReloadData(!reloadData);
            }}
            visibleModal={setModalVisible}
          />
        </View>
      </Modal>

      <SwitchSelector
        style={{
          paddingHorizontal: 10,
        }}
        textColor={colors.primary900}
        fontSize={typography.fs2}
        buttonColor={colors.primary400}
        options={options}
        initial={0}
        onPress={(value) => {
          switch (value) {
            case 1:
              setStateSelector(1);

              break;
            case 2:
              setStateSelector(2);

              break;
            case 3:
              setStateSelector(3);

              break;
          }
        }}
      />

      <View style={styles.containerBody}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary900}
            />
          }
          horizontal={false}>
          {filterDiscussion.length > 0 ? (
            filterDiscussion.map((discussion) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Discussion Detail', {
                    discussionId: discussion._id,
                    token: token,
                  })
                }
                key={discussion._id}>
                <DiscussionCard
                  title={discussion.title}
                  nameAndDate={`${discussion.owner.firstName} ${discussion.owner.lastName
                    } Posted ${formatDate(discussion.createdAt)}`}
                  description={discussion.description}
                  categories={discussion.categories}
                  replies={discussion.replies}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: Dimensions.get('window').width,
              }}>
              <Text style={{ marginTop: 10, textAlign: 'center' }}>
                There is no Discussion
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default DiscussionScreen;

const styles = StyleSheet.create({
  //container style
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: 50,
    padding: spacing.small,
    backgroundColor: colors.white,
    margin: spacing.small,
    textAlignVertical: 'center',
  },

  containerBody: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: 50,
    margin: spacing.small,
    textAlignVertical: 'center',
  },

  contentContainer: {
    maxHeight: '100%',
    paddingBottom: 50,
  },
  scrollView: {},

  //create New Discussion style
  createNewButton: {
    height: 25,
    width: '100%',
    padding: spacing.smallest,
    fontWeight: typography.fwMedium,
    fontSize: typography.sf3,
    color: colors.gray500,
  },

  //styling for modal container
  modalView: {
    marginTop: 50,
    backgroundColor: colors.primary50,
    borderRadius: 20,
    height: '100%',
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
  buttonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
});
