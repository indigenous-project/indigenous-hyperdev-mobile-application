//DiscussionScreen module

// import packages
import React from 'react';

import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import SwitchSelector from 'react-native-switch-selector';
import { colors, themes } from '../../styles';

//switch-selector options
const options = [
  { label: 'Recent', value: 'Recent' },
  { label: 'Most Discussed', value: 'Most Discussed' },
  { label: 'My Discussions', value: 'My Discussions' }
];

//function return
function DiscussionScreen(props) {
  const theme = themes.light;

  //custome chips for displaying categories
  const Chips = (props) => {
    return (
      <View style={styles.chip}>
        <Text style={styles.chipText}>{props.name}</Text>
      </View>
    )
  }

  //card to display Discussion
  const DiscussionCard = (props) => {
    return (
      <View style={styles.discussionCard}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <Text style={styles.cardDetail}>{props.nameAndDate}</Text>
        <View style={styles.chipContainer}>
          <Chips name="Category 1"></Chips>
          <Chips name="Category 2"></Chips>
        </View>
        <Text style={styles.cardSubTitle}>{props.description}</Text>
        <View style={styles.actionContainer}>
          <Text>Replies</Text>
          <Text>Save</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.createNewButton}>Create New Discussion</Text>
      </View>

      <SwitchSelector
        style={{
          paddingHorizontal: 10,
        }}
        textColor={colors.primary900}
        fontSize={14}
        buttonColor={colors.primary500}
        options={options}
        initial={0}
        onPress={value => console.log(`${value}`)} />

      <ScrollView
        horizontal={false}>
        <DiscussionCard
          title="Discussion Title"
          nameAndDate="User Name and Date posted"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" ></DiscussionCard>
      </ScrollView>

    </SafeAreaView>
  );
}

export default DiscussionScreen;

const styles = StyleSheet.create({
  //container style
  container: {
    padding: 10,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    margin: 10,
    borderRadius: 50
  },

  //create New Discussion style
  createNewButton: {
    minHeight: 25,
    padding: 3,
    fontWeight: "500",
    fontSize: 16,
    color: colors.gray700,
    width: "100%",
  },

  //Discussion Card styles
  discussionCard: {
    minHeight: "25%",
    padding: 15,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10
  },
  cardTitle: {
    fontSize: 16,
    color: colors.primary900,
    fontWeight: "700",
    paddingBottom: 8,
  },
  cardSubTitle: {
    fontSize: 14,
    lineHeight: 25,
    paddingBottom: 8
  },
  cardDetail: {
    fontWeight: "300",
    paddingBottom: 8
  },

  //chips styling
  chipContainer: {
    flexDirection: "row"
  },
  chip: {
    borderColor: colors.primary500,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 8,
    borderWidth: 2
  },
  chipText: {
    fontSize: 13,
    padding: 5,
    color: colors.primary900,
    fontWeight: "600"
  },

  //Actions styling (Relies and Save)
  actionContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: "90%",
    marginHorizontal: 10
  },
})