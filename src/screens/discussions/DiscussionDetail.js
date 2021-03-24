//Discussion Detail module

// import packages
import React, {useState, useEffect} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Chips from '../../components/Chips';
import ReplyCard from '../../components/ReplyCard';
import {colors, themes, typography, spacing} from '../../styles';

//function return
function DiscussionDetail({navigate, route}) {
  const theme = themes.light;
  const discussion = route.params.discussion;
  console.log(discussion.replies);

  // function format date: Example Jan 30th, 2021
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);

    return `${month} ${day}, ${year}`;
  };
  if (!discussion) return null;
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>{discussion.title}</Text>
            <Text style={styles.datePosted}>
              {`${discussion.owner.firstName} ${
                discussion.owner.lastName
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
              source={{uri: discussion.medias[0].path}}
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
          <Text style={styles.buttonText}>Reply to this Discussion</Text>
        </TouchableOpacity>
      </View>
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
});

export default DiscussionDetail;
