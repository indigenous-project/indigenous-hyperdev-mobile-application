//DiscussionScreen module

// import packages
import React, { useEffect, useState } from 'react';

import { Text, StyleSheet, View, ScrollView, RefreshControl, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import DiscussionCard from '../../components/DiscussionCard';
import CreateDiscussion from '../../components/CreateDiscussion';
import SwitchSelector from 'react-native-switch-selector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, themes, typography, spacing } from '../../styles';

import { discussionGetList } from '../../api/discussions/discussions.api';
import { useSecureStorage } from '../../hooks/useSecureStorage';

//switch-selector options
const options = [
  { label: 'Recent', value: 'Recent' },
  { label: 'Most Discussed', value: 'Most Discussed' },
  { label: 'My Discussions', value: 'My Discussions' },
];

//function return
function DiscussionScreen(props) {
  const theme = themes.light;
  const [token, setToken] = useSecureStorage('userToken', '');
  const [discussions, setDiscussions] = useState(null);
  const [filterDiscussion, setFilterDiscussion] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(reloadData);

  useEffect(() => {
    discussionGetList(token)
      .then((response) => {
        setDiscussions(response);
        sortDate(response);
      })
      .catch((err) => { });
  }, [token, reloadData]);

  const [modalVisible, setModalVisible] = useState(false);

  // function format date Jan 30th, 2021
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${month} ${day}, ${year}`;
  };

  // sort the discussion list by updated Date
  const sortDate = (data) => {
    const array = data.sort((item1, item2) => {
      return Date.parse(item2.updatedAt) - Date.parse(item1.updatedAt);
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

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <Pressable
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={22}
          style={{ textAlignVertical: 'center' }}
        />
        <Text style={styles.createNewButton}>Create a new discussion</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>Create New Discussion</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>x</Text>
            </Pressable>
          </View>
          <CreateDiscussion />
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
            case 'Recent':
              sortDate(discussions);
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
          horizontal={false}
          contentInset={{ bottom: 150 }}
          contentInsetAdjustmentBehavior="automatic">
          {filterDiscussion
            ? filterDiscussion.map((discussion) => (
              <DiscussionCard
                key={discussion._id}
                title={discussion.title}
                nameAndDate={`${discussion.owner.firstName} ${discussion.owner.lastName
                  } Posed ${formatDate(discussion.createdAt)}`}
                description={discussion.description}
                categories={discussion.categories}
                replies={discussion.replies}
              />
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
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    flexDirection: "row",
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
    fontWeight: typography.fwMedium
  },
});
