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
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import DiscussionCard from '../../components/DiscussionCard';
import CreateDiscussion from '../../components/CreateDiscussion';
import SwitchSelector from 'react-native-switch-selector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, themes, typography, spacing } from '../../styles';

import { discussionGetList } from '../../api/discussions/discussions.api';
import { useSecureStorage } from '../../hooks/useSecureStorage';
import { useCurrentUser } from '../../contexts/currentUserContext';

//switch-selector options
const options = [
  { label: 'Recent', value: 1 },
  { label: 'Most Discussed', value: 2 },
  { label: 'My Discussions', value: 3 },
];

//function return
function DiscussionScreen({ navigation }) {
  const theme = themes.light;

  const [discussions, setDiscussions] = useState(null);
  const [filterDiscussion, setFilterDiscussion] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(reloadData);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateSelector, setStateSelector] = useState(null);
  const [currentUser, token] = useCurrentUser();

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
    let array = data.sort(
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
        return Date.parse(item2.updatedAt) - Date.parse(item1.updatedAt);
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
  const onRefresh = React.useCallback(() => {
    setRefreshing(true); // enable refresh indicator
    setReloadData(!reloadData); // change the reloadData to re-render new Discussion
    wait(1000).then(() => setRefreshing(false)); // hide refresh indicator
  }, [reloadData]);

  useEffect(() => {
    if (discussions) {
      switch (stateSelector) {
        case 1:
          sortDate(discussions);
          break;
        case 2:
          sortMostDiscussed(discussions);
          break;
        case 3:
          sortMyDiscussion(discussions);
          break;
      }
    }
  }, [stateSelector]);

  // useEffect load discussion list
  useEffect(() => {
    if (token)
      discussionGetList(token)
        .then((response) => {
          setDiscussions(response);
          stateSelector === null ? setStateSelector(1) : null; // set initial stateSelector = 1
        })
        .catch((err) => {
          Alert.alert(err.errors[0].title, err.errors[0].description);
        });
  }, [token, reloadData, filterDiscussion]);

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
          <CreateDiscussion posted={(value) => setModalVisible(value)} />
        </View>
      </Modal>

      <SwitchSelector
        style={{
          paddingHorizontal: 10,
        }}
        textColor={colors.primary900}
        fontSize={typography.fs2}
        buttonColor={colors.primary500}
        options={options}
        initial={0}
        onPress={(value) => {
          switch (value) {
            case 1:
              setStateSelector(1);
              // sortDate(discussions);
              break;
            case 2:
              setStateSelector(2);
              //sortMostDiscussed(discussions);
              break;
            case 3:
              setStateSelector(3);
              // sortMyDiscussion(discussions);
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
          {filterDiscussion
            ? filterDiscussion.map((discussion) => (
              <TouchableOpacity onPress={() => navigation.navigate('Discussion Detail')}>
                <DiscussionCard
                  key={discussion._id}
                  title={discussion.title}
                  nameAndDate={`${discussion.owner.firstName} ${discussion.owner.lastName
                    } Posted ${formatDate(discussion.createdAt)}`}
                  description={discussion.description}
                  categories={discussion.categories}
                  replies={discussion.replies}
                />
              </TouchableOpacity>
            ))
            : null}
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
    shadowOpacity: 0.5,
    borderRadius: 100,
    backgroundColor: colors.primary50,
  },
  buttonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
});
